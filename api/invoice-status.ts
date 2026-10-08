// GET /api/invoice-status?n=MLP-YYYYMMDD-XXXX — refreshes one invoice from Square and returns its public status.
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { syncInvoice, publicView } from "./_lib/ledger.js";
import { sql } from "./_lib/db.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const n = String(req.query.n || "").trim().toUpperCase();
  if (!/^MLP-\d{8}-[0-9A-F]{4}$/.test(n)) return res.status(400).json({ error: "Invalid invoice number" });
  try {
    let inv: any;
    try { inv = await syncInvoice(n, "status_check"); }
    catch (e: any) {
      if (e?.message === "Invoice not found") return res.status(404).json({ error: "Invoice not found" });
      console.error("[invoice-status] sync failed", e?.body || e);
      inv = ((await sql()`SELECT * FROM ml_invoices WHERE invoice_number = ${n}`) as any[])[0];
      if (!inv) return res.status(404).json({ error: "Invoice not found" });
    }
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json(publicView(inv));
  } catch (e: any) {
    console.error("[invoice-status] error", e);
    return res.status(500).json({ error: "Could not load invoice status" });
  }
}
