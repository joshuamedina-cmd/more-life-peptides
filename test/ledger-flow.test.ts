// End-to-end ledger test against a Neon TEST branch with Square simulated (no real Square calls).
import assert from "node:assert/strict";
const LOC = "LTEST";
const realFetch = globalThis.fetch;
const sq: any = { customers: [], orders: {}, invoices: {}, payments: {}, refunds: {} };
let n = 0; const id = (p: string) => `${p}_${++n}`;
globalThis.fetch = (async (url: any, init: any = {}) => {
  const u = String(url);
  if (!u.includes("squareup")) return realFetch(url, init);
  const path = new URL(u).pathname, body = init.body ? JSON.parse(init.body) : {};
  const ok = (o: any) => new Response(JSON.stringify(o), { status: 200 });
  if (path === "/v2/customers/search") return ok({ customers: sq.customers.filter((c: any) => c.email_address === body.query.filter.email_address.exact) });
  if (path === "/v2/customers") { const c = { id: id("CUST"), ...body }; sq.customers.push(c); return ok({ customer: c }); }
  if (path === "/v2/orders") { const o = { id: id("ORD"), ...body.order, tenders: [] }; sq.orders[o.id] = o; return ok({ order: o }); }
  if (path.startsWith("/v2/orders/")) return ok({ order: sq.orders[path.split("/")[3]] });
  if (path === "/v2/invoices") { const i = { id: id("INV"), version: 0, status: "DRAFT", ...body.invoice }; sq.invoices[i.id] = i; return ok({ invoice: i }); }
  if (path.endsWith("/publish")) { const i = sq.invoices[path.split("/")[3]]; i.status = "UNPAID"; i.public_url = "https://squareup.test/pay/" + i.id; return ok({ invoice: i }); }
  if (path.startsWith("/v2/invoices/")) return ok({ invoice: sq.invoices[path.split("/")[3]] });
  if (path.startsWith("/v2/payments/")) return ok({ payment: sq.payments[path.split("/")[3]] });
  if (path.startsWith("/v2/refunds/")) return ok({ refund: sq.refunds[path.split("/")[3]] });
  return new Response(JSON.stringify({ errors: [{ detail: "unmocked " + path }] }), { status: 404 });
}) as any;

process.env.SQUARE_ACCESS_TOKEN = "test"; process.env.SQUARE_LOCATION_ID = LOC; process.env.SQUARE_ENV = "sandbox";
const { default: createInvoice } = await import("../api/create-invoice");
const { syncInvoice } = await import("../api/_lib/ledger");
const { sql } = await import("../api/_lib/db");

function call(handler: any, body: any) {
  return new Promise<{ status: number; json: any }>((resolve) => {
    const res: any = { code: 200, status(c: number) { this.code = c; return this; }, json(j: any) { resolve({ status: this.code, json: j }); return this; }, setHeader() {} };
    handler({ method: "POST", body, query: {}, headers: {} }, res);
  });
}
const customer = { firstName: "Test", lastName: "Researcher", email: "test.researcher@example.com",
  address: { addressLine1: "1 Lab Way", city: "Azusa", state: "ca", zip: "91702", country: "US" } };

// 1. sold-out SKU rejected, browser price ignored, bad qty rejected
let r = await call(createInvoice, { customer, lines: [{ id: "RT-30", qty: 1 }], ageVerified: true, researchUseAccepted: true });
assert.equal(r.status, 400); assert.match(r.json.error, /sold out/);
r = await call(createInvoice, { customer, lines: [{ id: "GHK-50", qty: 101 }], ageVerified: true, researchUseAccepted: true });
assert.equal(r.status, 400);

// 2. valid invoice: 2 × TIRZ-30 ($46) + 3 × GHK-50 ($22) + $10 shipping = $168
r = await call(createInvoice, { customer, lines: [{ id: "TIRZ-30", qty: 2, priceCents: 1 }, { id: "GHK-50", qty: 3 }], ageVerified: true, researchUseAccepted: true });
assert.equal(r.status, 200, JSON.stringify(r.json));
const num = r.json.invoiceNumber;
assert.match(num, /^MLP-\d{8}-[0-9A-F]{4}$/); assert.equal(r.json.totalCents, 16800);
const sqInv: any = Object.values(sq.invoices)[0];
assert.equal(sqInv.invoice_number, num, "Square invoice_number must be the MoreLife invoice number");
const sqOrder = sq.orders[sqInv.order_id];
assert.equal(sqOrder.line_items.length, 1); assert.equal(sqOrder.line_items[0].name, `Invoice ${num}`);
assert.equal(sqOrder.line_items[0].base_price_money.amount, 16800);
let inv: any = ((await sql()`SELECT * FROM ml_invoices WHERE invoice_number = ${num}`) as any[])[0];
assert.equal(inv.status, "sent"); assert.equal(inv.square_invoice_id, sqInv.id);
const lines = (await sql()`SELECT sku, vials, unit_price_cents, line_total_cents FROM ml_invoice_lines WHERE invoice_number = ${num} ORDER BY sku`) as any[];
assert.deepEqual(lines.map((l) => [l.sku, l.vials, l.unit_price_cents, l.line_total_cents]), [["GHK-50", 3, 2200, 6600], ["TIRZ-30", 2, 4600, 9200]]);

// 3. customer pays $168
sq.payments.PAY1 = { id: "PAY1", location_id: LOC, order_id: sqOrder.id, status: "COMPLETED", amount_money: { amount: 16800, currency: "USD" }, source_type: "CARD", card_details: { card: { card_brand: "VISA", last_4: "1111" } }, refund_ids: [] };
sqOrder.tenders.push({ id: "T1", payment_id: "PAY1" }); sqInv.status = "PAID";
inv = await syncInvoice(num); assert.equal(inv.status, "paid"); assert.equal(inv.amount_paid_cents, 16800);
inv = await syncInvoice(num); // repeat sync must not duplicate
let tx = (await sql()`SELECT kind, amount_cents FROM ml_transactions WHERE invoice_number = ${num} ORDER BY id`) as any[];
assert.equal(tx.length, 1);

// 4. $50 refund = separate linked row, original payment untouched
sq.refunds.REF1 = { id: "REF1", location_id: LOC, payment_id: "PAY1", status: "COMPLETED", amount_money: { amount: 5000, currency: "USD" } };
sq.payments.PAY1.refund_ids = ["REF1"];
inv = await syncInvoice(num);
tx = (await sql()`SELECT kind, amount_cents, square_payment_id FROM ml_transactions WHERE invoice_number = ${num} ORDER BY id`) as any[];
assert.deepEqual(tx.map((t) => [t.kind, t.amount_cents, t.square_payment_id]), [["payment", 16800, "PAY1"], ["refund", 5000, "PAY1"]]);
assert.equal(inv.status, "partially_refunded"); assert.equal(inv.amount_refunded_cents, 5000);

// 5. a payment from another Square location is never booked
sq.payments.PAY2 = { id: "PAY2", location_id: "OTHER", order_id: sqOrder.id, status: "COMPLETED", amount_money: { amount: 999, currency: "USD" }, refund_ids: [] };
sqOrder.tenders.push({ id: "T2", payment_id: "PAY2" });
await syncInvoice(num);
tx = (await sql()`SELECT 1 FROM ml_transactions WHERE square_id = 'PAY2'`) as any[];
assert.equal(tx.length, 0);
const ev = (await sql()`SELECT event_type FROM ml_events WHERE invoice_number = ${num} ORDER BY id`) as any[];
console.log("events:", ev.map((e) => e.event_type).join(", "));
console.log("ALL LEDGER TESTS PASSED for", num);
