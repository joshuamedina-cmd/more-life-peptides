import { Link } from "wouter";
import { PageShell } from "@/components/Layout";
import { CheckCircle2, Mail, CreditCard, Copy, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { formatUsd, RUO_NOTICE } from "@shared/catalog";

type Status = { invoiceNumber: string; status: string; totalCents: number; amountPaidCents: number; balanceCents: number; publicUrl: string | null };

const LABEL: Record<string, string> = {
  created: "Preparing", sent: "Awaiting payment", partially_paid: "Partially paid", paid: "Paid",
  partially_refunded: "Partially refunded", refunded: "Refunded", canceled: "Canceled", failed: "Needs attention",
};

export default function OrderConfirmation() {
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.hash.split("?")[1] || "" : "");
  const invoiceNumber = params.get("invoice") || "";
  const [status, setStatus] = useState<Status | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!invoiceNumber) return;
    let stop = false;
    const load = async () => {
      try {
        const r = await fetch(`/api/invoice-status?n=${encodeURIComponent(invoiceNumber)}`);
        if (r.ok && !stop) setStatus(await r.json());
      } catch {}
    };
    load();
    const t = setInterval(() => { if (document.visibilityState === "visible") load(); }, 15000);
    return () => { stop = true; clearInterval(t); };
  }, [invoiceNumber]);

  const copy = () => navigator.clipboard.writeText(invoiceNumber).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  const paid = status?.status === "paid";

  return (
    <PageShell>
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${paid ? "bg-emerald-100" : "bg-blue-50"}`}>
          {paid ? <CheckCircle2 className="w-9 h-9 text-emerald-600" /> : <Clock className="w-8 h-8 text-[hsl(221,83%,53%)]" />}
        </div>
        <h1 className="text-[34px] font-extrabold text-[#0A1628] mt-6" data-testid="text-thanks">
          {paid ? "Payment received" : "Your invoice is ready"}
        </h1>
        <p className="text-slate-600 mt-3 text-[15px] leading-relaxed">
          {paid ? "Thank you. Your vials will be prepared for shipment." : "Pay your invoice securely through Square. We ship once payment clears."}
        </p>

        {invoiceNumber && (
          <div className="mt-8 inline-flex flex-col items-center bg-gradient-to-br from-[#E8F0F8] to-[#F0F5FA] border-2 border-[hsl(221,83%,53%)]/20 rounded-xl px-10 py-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Invoice Number</span>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-[26px] md:text-[30px] font-mono font-extrabold text-[#0A1628]" data-testid="text-invoice-number">{invoiceNumber}</span>
              <button onClick={copy} className="p-2 text-slate-500 hover:text-[hsl(221,83%,53%)]" aria-label="Copy invoice number" data-testid="button-copy-invoice">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {copied && <span className="text-[11px] text-emerald-600 mt-1">Copied</span>}
            {status && (
              <span className="mt-3 text-[13px] font-bold text-[#0A1628]" data-testid="text-invoice-status">
                {LABEL[status.status] || status.status} · {formatUsd(status.totalCents)}
              </span>
            )}
          </div>
        )}

        <div className="mt-8 bg-white border border-slate-200 rounded-xl p-6 text-left space-y-4">
          {status?.publicUrl && !paid && (
            <a href={status.publicUrl} target="_blank" rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[hsl(221,83%,53%)] hover:bg-[hsl(221,83%,47%)] text-white text-[14px] font-bold"
              data-testid="link-pay-now">
              <CreditCard className="w-4 h-4" /> Pay invoice {invoiceNumber}
            </a>
          )}
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-[hsl(221,83%,53%)] flex-shrink-0 mt-0.5" />
            <p className="text-[13px] text-slate-600">
              Square also emailed the payment link for <strong className="font-mono">invoice {invoiceNumber}</strong>. Use this invoice number for any questions about your order.
            </p>
          </div>
        </div>

        <p className="mt-6 text-[11px] text-slate-500">{RUO_NOTICE}</p>
        <Link href="/catalog" className="mt-6 inline-block text-[13px] font-bold text-[hsl(221,83%,53%)] hover:underline" data-testid="link-continue-shopping">
          ← Continue shopping
        </Link>
      </div>
    </PageShell>
  );
}
