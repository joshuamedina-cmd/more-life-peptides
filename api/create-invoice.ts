// Vercel serverless function: POST /api/create-invoice
//
// MoreLife invoice-first flow (MoreLife books only):
//   1. Validate the cart, customer, and research-use acknowledgments
//   2. Re-price every line server-side from shared/catalog.ts (browser prices are never trusted)
//   3. Create the MoreLife invoice number MLP-YYYYMMDD-XXXX and write the invoice + lines to the ledger FIRST
//   4. Square: find/create customer → order with ONE line "Invoice MLP-…" → invoice whose
//      invoice_number IS the MoreLife invoice number → publish (Square emails the pay link)
//   5. Store Square's internal IDs behind the invoice number; return the pay link
//   6. Optional fulfillment copy to Google Sheet + email
//
// Env vars: SQUARE_ACCESS_TOKEN, SQUARE_LOCATION_ID, SQUARE_ENV, MORELIFE_DATABASE_URL
// Optional: GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT, FULFILLMENT_EMAIL_FROM, FULFILLMENT_EMAIL_TO, RESEND_API_KEY

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { findById, SHIPPING_FLAT_CENTS, MAX_QTY_PER_LINE, RUO_NOTICE, formatUsd } from "../shared/catalog.js";
import { randomUUID, randomBytes } from "crypto";
import { sql, logEvent } from "./_lib/db.js";
import { squareFetch } from "./_lib/square.js";

type ReqBody = {
  customer: {
    firstName: string; lastName: string; email: string; phone?: string;
    address: { addressLine1: string; addressLine2?: string; city: string; state: string; zip: string; country: string };
  };
  lines: { id: string; qty: number }[];
  ageVerified: boolean;
  researchUseAccepted: boolean;
};

function generateInvoiceNumber(): string {
  const now = new Date();
  const ymd = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, "0")}${String(now.getUTCDate()).padStart(2, "0")}`;
  return `MLP-${ymd}-${randomBytes(2).toString("hex").toUpperCase()}`;
}

// ---------- Google Sheets: append one row via service account ----------
// Uses Google's REST API directly + JWT auth (no Google client library needed).
async function getGoogleAccessToken(sa: any): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claims = {
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };
  const b64url = (obj: any) =>
    Buffer.from(JSON.stringify(obj)).toString("base64")
      .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const unsigned = `${b64url(header)}.${b64url(claims)}`;
  const { createSign } = await import("crypto");
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  const sig = signer.sign(sa.private_key)
    .toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const jwt = `${unsigned}.${sig}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`Google token error: ${JSON.stringify(data)}`);
  return data.access_token as string;
}

async function appendToSheet(row: (string | number)[]): Promise<void> {
  const saJson = process.env.GOOGLE_SERVICE_ACCOUNT;
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!saJson || !sheetId) {
    console.log("[fulfillment] Sheets not configured — skipping row append");
    return;
  }
  const sa = JSON.parse(saJson);
  const token = await getGoogleAccessToken(sa);
  const range = "Orders!A:Z"; // Sheet must have a tab called "Orders"
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ values: [row] }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Sheets append failed: ${res.status} ${t}`);
  }
}

// ---------- Fulfillment email via Resend ----------
async function sendFulfillmentEmail(subject: string, htmlBody: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FULFILLMENT_EMAIL_FROM;
  const to = process.env.FULFILLMENT_EMAIL_TO;
  if (!apiKey || !from || !to) {
    console.log("[fulfillment] Email not configured — skipping notification");
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html: htmlBody }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Email send failed: ${res.status} ${t}`);
  }
}

// ---------- main handler ----------
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  let invoiceNumber: string | null = null;
  try {
    const body = req.body as ReqBody;
    const cust = body?.customer;
    const addr = cust?.address;

    // ---- validate ----
    if (!cust?.email || !cust.firstName || !cust.lastName) return res.status(400).json({ error: "Missing customer name or email" });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cust.email.trim())) return res.status(400).json({ error: "Enter a valid email address" });
    if (!addr?.addressLine1 || !addr.city || !addr.state || !addr.zip) return res.status(400).json({ error: "Missing shipping address" });
    if (!body.ageVerified || !body.researchUseAccepted) return res.status(400).json({ error: "You must confirm both acknowledgments." });
    if (!Array.isArray(body.lines) || body.lines.length === 0) return res.status(400).json({ error: "Cart is empty" });

    // ---- re-price against the locked catalog (1 unit = 1 vial) ----
    const seen = new Set<string>();
    const validated = body.lines.map((l) => {
      const item = findById(l.id);
      if (!item) throw Object.assign(new Error(`Unknown SKU: ${l.id}`), { http: 400 });
      if (seen.has(item.id)) throw Object.assign(new Error(`Duplicate SKU: ${item.id}`), { http: 400 });
      seen.add(item.id);
      if (!item.inStock) throw Object.assign(new Error(`${item.name} ${item.dose} is sold out`), { http: 400 });
      const qty = Math.floor(Number(l.qty));
      if (!Number.isSafeInteger(qty) || qty < 1 || qty > MAX_QTY_PER_LINE) {
        throw Object.assign(new Error(`Quantity for ${item.id} must be 1–${MAX_QTY_PER_LINE} vials`), { http: 400 });
      }
      return { item, qty, lineCents: item.priceCents * qty };
    });
    const subtotalCents = validated.reduce((s, v) => s + v.lineCents, 0);
    const shippingCents = SHIPPING_FLAT_CENTS;
    const totalCents = subtotalCents + shippingCents;

    const locationId = process.env.SQUARE_LOCATION_ID;
    if (!process.env.SQUARE_ACCESS_TOKEN || !locationId || !process.env.MORELIFE_DATABASE_URL) {
      return res.status(503).json({ error: "Checkout is not configured in this environment." });
    }

    // ---- 1. MoreLife invoice first (ledger) ----
    const email = cust.email.trim().toLowerCase();
    const shipTo = {
      name: `${cust.firstName} ${cust.lastName}`, phone: cust.phone || null,
      addressLine1: addr.addressLine1, addressLine2: addr.addressLine2 || null,
      city: addr.city, state: addr.state.toUpperCase(), zip: addr.zip, country: addr.country || "US",
    };
    const custRow = ((await sql()`
      INSERT INTO ml_customers (email, first_name, last_name, phone)
      VALUES (${email}, ${cust.firstName}, ${cust.lastName}, ${cust.phone || null})
      ON CONFLICT (email) DO UPDATE SET first_name = EXCLUDED.first_name, last_name = EXCLUDED.last_name,
        phone = COALESCE(EXCLUDED.phone, ml_customers.phone), updated_at = now()
      RETURNING id`) as any[])[0];

    for (let attempt = 0; attempt < 5 && !invoiceNumber; attempt++) {
      const candidate = generateInvoiceNumber();
      const ins = (await sql()`
        INSERT INTO ml_invoices (invoice_number, customer_id, subtotal_cents, shipping_cents, total_cents, ship_to, square_location_id)
        VALUES (${candidate}, ${custRow.id}, ${subtotalCents}, ${shippingCents}, ${totalCents}, ${JSON.stringify(shipTo)}::jsonb, ${locationId})
        ON CONFLICT (invoice_number) DO NOTHING RETURNING invoice_number`) as any[];
      if (ins.length) invoiceNumber = candidate;
    }
    if (!invoiceNumber) throw new Error("Could not allocate an invoice number");
    const n = invoiceNumber;
    await sql().transaction(validated.map((v) => sql()`
      INSERT INTO ml_invoice_lines (invoice_number, sku, product_name, amount_per_vial, vials, unit_price_cents, line_total_cents)
      VALUES (${n}, ${v.item.id}, ${v.item.name}, ${v.item.dose}, ${v.qty}, ${v.item.priceCents}, ${v.lineCents})`));
    await logEvent(n, "checkout", "invoice_created", { total_cents: totalCents, lines: validated.map((v) => ({ sku: v.item.id, vials: v.qty })) });

    // ---- 2. Square customer ----
    let customerId: string | undefined;
    const searchResp = await squareFetch("/v2/customers/search", {
      method: "POST",
      body: JSON.stringify({ query: { filter: { email_address: { exact: email } } } }),
    });
    if (searchResp?.customers?.length > 0) customerId = searchResp.customers[0].id;
    else {
      const createResp = await squareFetch("/v2/customers", {
        method: "POST",
        body: JSON.stringify({
          idempotency_key: randomUUID(), given_name: cust.firstName, family_name: cust.lastName, email_address: email,
          phone_number: cust.phone || undefined,
          address: {
            address_line_1: addr.addressLine1, address_line_2: addr.addressLine2 || undefined, locality: addr.city,
            administrative_district_level_1: addr.state.toUpperCase(), postal_code: addr.zip, country: addr.country || "US",
          },
        }),
      });
      customerId = createResp?.customer?.id;
    }
    if (!customerId) throw new Error("Could not create or find Square customer");

    // ---- 3. Square order: one line, the invoice number only ----
    const orderResp = await squareFetch("/v2/orders", {
      method: "POST",
      body: JSON.stringify({
        idempotency_key: `ml-order-${n}`,
        order: {
          location_id: locationId, customer_id: customerId, reference_id: n,
          line_items: [{ name: `Invoice ${n}`, quantity: "1", base_price_money: { amount: totalCents, currency: "USD" } }],
        },
      }),
    });
    const orderId = orderResp?.order?.id;
    if (!orderId) throw new Error("Could not create Square order");

    // ---- 4. Square invoice: invoice_number = MoreLife invoice number ----
    const invoiceResp = await squareFetch("/v2/invoices", {
      method: "POST",
      body: JSON.stringify({
        idempotency_key: `ml-invoice-${n}`,
        invoice: {
          location_id: locationId, order_id: orderId, invoice_number: n,
          primary_recipient: { customer_id: customerId }, delivery_method: "EMAIL",
          title: `Invoice ${n}`,
          accepted_payment_methods: { card: true, square_gift_card: false, bank_account: false, buy_now_pay_later: false, cash_app_pay: true },
          payment_requests: [{
            request_type: "BALANCE",
            due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
            tipping_enabled: false, automatic_payment_source: "NONE",
          }],
          description: RUO_NOTICE,
        },
      }),
    });
    const sqInvoice = invoiceResp?.invoice;
    if (!sqInvoice?.id) throw new Error("Could not create Square invoice");
    await sql()`UPDATE ml_invoices SET square_customer_id = ${customerId}, square_order_id = ${orderId},
      square_invoice_id = ${sqInvoice.id}, square_invoice_status = ${sqInvoice.status}, updated_at = now()
      WHERE invoice_number = ${n}`;
    await sql()`UPDATE ml_customers SET square_customer_id = ${customerId} WHERE id = ${custRow.id}`;

    const publishResp = await squareFetch(`/v2/invoices/${sqInvoice.id}/publish`, {
      method: "POST",
      body: JSON.stringify({ version: sqInvoice.version, idempotency_key: `ml-publish-${n}` }),
    });
    const published = publishResp?.invoice;
    const publicUrl: string | null = published?.public_url || null;
    if (published?.invoice_number && published.invoice_number !== n) {
      await logEvent(n, "checkout", "invoice_number_mismatch", { square_invoice_number: published.invoice_number });
    }
    await sql()`UPDATE ml_invoices SET status = 'sent', public_url = ${publicUrl}, square_invoice_status = ${published?.status ?? null},
      sent_at = now(), updated_at = now() WHERE invoice_number = ${n}`;
    await logEvent(n, "checkout", "invoice_sent", { square_status: published?.status, has_pay_link: Boolean(publicUrl) });

    // ---- 5. fulfillment copies (non-blocking) ----
    const skuSummary = validated.map((v) => `${v.item.id} × ${v.qty} vial(s) (${formatUsd(v.lineCents)})`).join(" · ");
    const oneLineAddress = `${addr.addressLine1}${addr.addressLine2 ? ", " + addr.addressLine2 : ""}, ${addr.city}, ${addr.state.toUpperCase()} ${addr.zip}`;
    try {
      await appendToSheet([new Date().toISOString(), n, `${cust.firstName} ${cust.lastName}`, email, cust.phone || "", oneLineAddress,
        skuSummary, (subtotalCents / 100).toFixed(2), (shippingCents / 100).toFixed(2), (totalCents / 100).toFixed(2), publicUrl || "", "Awaiting Payment"]);
    } catch (e: any) { console.error("[fulfillment] Sheet append failed", e?.message); }
    try {
      const rowsHtml = validated.map((v) => `<tr><td style="padding:8px;font-family:monospace;font-weight:bold">${v.item.id}</td><td style="padding:8px">${v.item.name} ${v.item.dose}</td><td style="padding:8px;text-align:center">${v.qty}</td><td style="padding:8px;text-align:right">${formatUsd(v.lineCents)}</td></tr>`).join("");
      await sendFulfillmentEmail(`[MoreLife] Invoice ${n} sent — ${formatUsd(totalCents)}`,
        `<div style="font-family:Arial,sans-serif;max-width:600px;color:#0f172a"><h2 style="margin:0 0 8px">Invoice ${n} — awaiting payment</h2>
        <p>${cust.firstName} ${cust.lastName} · ${email}${cust.phone ? " · " + cust.phone : ""}<br>${oneLineAddress}</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px"><tr><th align="left">SKU</th><th align="left">Product</th><th>Vials</th><th align="right">Line</th></tr>${rowsHtml}
        <tr><td colspan="3" align="right">Subtotal</td><td align="right">${formatUsd(subtotalCents)}</td></tr>
        <tr><td colspan="3" align="right">Shipping</td><td align="right">${formatUsd(shippingCents)}</td></tr>
        <tr><td colspan="3" align="right"><b>Total</b></td><td align="right"><b>${formatUsd(totalCents)}</b></td></tr></table>
        <p style="font-size:12px;color:#64748b">Fulfill only after the invoice shows paid. ${RUO_NOTICE}</p></div>`);
    } catch (e: any) { console.error("[fulfillment] Email send failed", e?.message); }

    return res.status(200).json({ invoiceNumber: n, publicUrl, totalCents, currency: "USD" });
  } catch (err: any) {
    console.error("[create-invoice] error", err?.body || err);
    if (invoiceNumber) {
      try {
        await sql()`UPDATE ml_invoices SET status = 'failed', last_error = ${String(err?.message || err).slice(0, 500)}, updated_at = now()
          WHERE invoice_number = ${invoiceNumber} AND status = 'created'`;
        await logEvent(invoiceNumber, "checkout", "invoice_failed", { error: String(err?.message || err) });
      } catch {}
    }
    return res.status(err?.http || 500).json({ error: err?.http ? err.message : "We could not create your invoice. Please try again or contact us." });
  }
}
