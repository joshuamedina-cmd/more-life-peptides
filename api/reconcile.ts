// GET /api/reconcile — scheduled sweep: re-sync every open or recently paid MoreLife invoice from Square.
// Called by Vercel Cron with Authorization: Bearer $CRON_SECRET.
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "./_lib/db.js";
import { syncInvoice } from "./_lib/ledger.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.authorization !== `Bearer ${secret}`) return res.status(401).json({ error: "Unauthorized" });
  const rows = (await sql()`
    SELECT invoice_number FROM ml_invoices
    WHERE square_invoice_id IS NOT NULL
      AND (status IN ('sent','partially_paid') OR (status IN ('paid','partially_refunded') AND updated_at > now() - interval '60 days'))
    ORDER BY created_at DESC LIMIT 200`) as any[];
  const results: Record<string, string> = {};
  for (const r of rows) {
    try { results[r.invoice_number] = (await syncInvoice(r.invoice_number, "reconcile")).status; }
    catch (e: any) { results[r.invoice_number] = "error: " + String(e?.message || e).slice(0, 120); }
  }
  return res.status(200).json({ checked: rows.length, results });
}
