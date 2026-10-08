// Pull the current Square state for one MoreLife invoice and record every payment/refund as its own row.
// Only money on the MoreLife Square location is ever written to the MoreLife books.
import { sql, logEvent } from "./db.js";
import { squareFetch } from "./square.js";

export type InvoiceStatus = "created" | "sent" | "partially_paid" | "paid" | "partially_refunded" | "refunded" | "canceled" | "failed";

async function upsertTxn(invoiceNumber: string, kind: "payment" | "refund", o: any, paymentId: string | null) {
  await sql()`
    INSERT INTO ml_transactions (invoice_number, kind, square_id, square_payment_id, amount_cents, currency, status,
      source_type, card_brand, card_last4, occurred_at, raw)
    VALUES (${invoiceNumber}, ${kind}, ${o.id}, ${paymentId}, ${Number(o.amount_money?.amount || 0)},
      ${o.amount_money?.currency || "USD"}, ${o.status || "UNKNOWN"}, ${o.source_type ?? null},
      ${o.card_details?.card?.card_brand ?? null}, ${o.card_details?.card?.last_4 ?? null},
      ${o.created_at ?? null}, ${JSON.stringify(o)}::jsonb)
    ON CONFLICT (kind, square_id) DO UPDATE SET status = EXCLUDED.status, amount_cents = EXCLUDED.amount_cents,
      raw = EXCLUDED.raw, updated_at = now()`;
}

export async function syncInvoice(invoiceNumber: string, source = "sync") {
  const rows = (await sql()`SELECT * FROM ml_invoices WHERE invoice_number = ${invoiceNumber}`) as any[];
  const inv = rows[0];
  if (!inv) throw new Error("Invoice not found");
  if (!inv.square_invoice_id) return inv;

  const sqInv = (await squareFetch(`/v2/invoices/${inv.square_invoice_id}`)).invoice;
  if (sqInv.location_id !== inv.square_location_id || sqInv.invoice_number !== invoiceNumber) {
    throw new Error("Square invoice does not match the MoreLife ledger record");
  }
  const order = (await squareFetch(`/v2/orders/${inv.square_order_id}`)).order;
  const paymentIds: string[] = (order?.tenders || []).map((t: any) => t.payment_id || t.id).filter(Boolean);

  for (const pid of paymentIds) {
    const p = (await squareFetch(`/v2/payments/${pid}`)).payment;
    if (!p || p.location_id !== inv.square_location_id) continue;
    await upsertTxn(invoiceNumber, "payment", p, p.id);
    for (const rid of p.refund_ids || []) {
      const r = (await squareFetch(`/v2/refunds/${rid}`)).refund;
      if (r && r.location_id === inv.square_location_id) await upsertTxn(invoiceNumber, "refund", r, p.id);
    }
  }

  const sums = ((await sql()`
    SELECT
      COALESCE(SUM(amount_cents) FILTER (WHERE kind = 'payment' AND status = 'COMPLETED'), 0)::int AS paid,
      COALESCE(SUM(amount_cents) FILTER (WHERE kind = 'refund' AND status = 'COMPLETED'), 0)::int AS refunded
    FROM ml_transactions WHERE invoice_number = ${invoiceNumber}`) as any[])[0];

  let status: InvoiceStatus;
  if (sums.refunded > 0 && sums.refunded >= sums.paid) status = "refunded";
  else if (sums.refunded > 0) status = "partially_refunded";
  else if (sums.paid >= inv.total_cents && sums.paid > 0) status = "paid";
  else if (sums.paid > 0) status = "partially_paid";
  else if (sqInv.status === "CANCELED") status = "canceled";
  else if (sqInv.status === "FAILED") status = "failed";
  else status = "sent";

  const updated = ((await sql()`
    UPDATE ml_invoices SET status = ${status}, amount_paid_cents = ${sums.paid}, amount_refunded_cents = ${sums.refunded},
      square_invoice_status = ${sqInv.status}, public_url = COALESCE(${sqInv.public_url ?? null}, public_url),
      paid_at = CASE WHEN ${status} = 'paid' AND paid_at IS NULL THEN now() ELSE paid_at END, updated_at = now()
    WHERE invoice_number = ${invoiceNumber} RETURNING *`) as any[])[0];

  if (status !== inv.status || sums.paid !== inv.amount_paid_cents || sums.refunded !== inv.amount_refunded_cents) {
    await logEvent(invoiceNumber, source, "status_changed", {
      from: inv.status, to: status, paid_cents: sums.paid, refunded_cents: sums.refunded, square_status: sqInv.status,
    });
  }
  return updated;
}

export function publicView(inv: any) {
  return {
    invoiceNumber: inv.invoice_number,
    status: inv.status as InvoiceStatus,
    totalCents: inv.total_cents,
    amountPaidCents: inv.amount_paid_cents,
    amountRefundedCents: inv.amount_refunded_cents,
    balanceCents: Math.max(0, inv.total_cents - inv.amount_paid_cents),
    publicUrl: inv.public_url,
  };
}
