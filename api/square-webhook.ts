// POST /api/square-webhook — Square event notifications for the MoreLife location.
// Inert until SQUARE_WEBHOOK_SIGNATURE_KEY and SQUARE_WEBHOOK_URL are set. Every event is signature-checked,
// de-duplicated by Square event_id, matched to a MoreLife invoice, then re-synced from Square (never trusted blindly).
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createHmac, timingSafeEqual } from "crypto";
import { sql, logEvent } from "./_lib/db.js";
import { syncInvoice } from "./_lib/ledger.js";

export const config = { api: { bodyParser: false } };

async function rawBody(req: VercelRequest): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const c of req as any) chunks.push(typeof c === "string" ? Buffer.from(c) : c);
  return Buffer.concat(chunks).toString("utf8");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const key = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY, url = process.env.SQUARE_WEBHOOK_URL;
  if (!key || !url) return res.status(503).json({ error: "Webhook not configured" });

  const body = await rawBody(req);
  const given = String(req.headers["x-square-hmacsha256-signature"] || "");
  const expected = createHmac("sha256", key).update(url + body).digest("base64");
  const a = Buffer.from(given), b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return res.status(401).json({ error: "Bad signature" });

  let evt: any;
  try { evt = JSON.parse(body); } catch { return res.status(400).json({ error: "Bad JSON" }); }
  const obj = evt?.data?.object || {};
  const locationId = process.env.SQUARE_LOCATION_ID;
  const loc = obj.invoice?.location_id || obj.payment?.location_id || obj.refund?.location_id;
  if (loc && loc !== locationId) return res.status(200).json({ ignored: "other location" });

  let invoiceNumber: string | null = null;
  if (obj.invoice?.invoice_number) invoiceNumber = obj.invoice.invoice_number;
  const orderId = obj.payment?.order_id || obj.refund?.order_id;
  if (!invoiceNumber && orderId) {
    const r = (await sql()`SELECT invoice_number FROM ml_invoices WHERE square_order_id = ${orderId}`) as any[];
    invoiceNumber = r[0]?.invoice_number || null;
  }
  if (!invoiceNumber) return res.status(200).json({ ignored: "not a MoreLife invoice" });
  const known = (await sql()`SELECT 1 FROM ml_invoices WHERE invoice_number = ${invoiceNumber}`) as any[];
  if (!known.length) return res.status(200).json({ ignored: "not a MoreLife invoice" });

  const fresh = await logEvent(invoiceNumber, "square_webhook", String(evt.type || "unknown"), { event_id: evt.event_id }, evt.event_id);
  if (!fresh) return res.status(200).json({ duplicate: true });
  try {
    await syncInvoice(invoiceNumber, "square_webhook");
    return res.status(200).json({ ok: true });
  } catch (e: any) {
    await logEvent(invoiceNumber, "square_webhook", "sync_failed", { error: String(e?.message || e) });
    return res.status(500).json({ error: "Sync failed" }); // Square retries
  }
}
