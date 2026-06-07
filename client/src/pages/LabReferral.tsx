import { PageShell } from "@/components/Layout";
import { DollarSign, Users, BarChart3, ArrowRight } from "lucide-react";

export default function LabReferral() {
  return (
    <PageShell>
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-[hsl(217,91%,70%)]">Lab Referral Program</span>
          <h1 className="text-[44px] md:text-[56px] font-extrabold tracking-tight mt-3 leading-tight">
            Earn with every<br />referred researcher.
          </h1>
          <p className="mt-6 text-[16px] opacity-80 leading-relaxed max-w-2xl mx-auto">
            Partner with More Life Peptides and earn ongoing commissions for every researcher or lab you refer. Real-time tracking, fast payouts, no caps.
          </p>
          <button className="mt-8 bg-[hsl(221,83%,53%)] hover:bg-[hsl(224,76%,48%)] text-white font-bold text-[14px] px-8 py-4 rounded-full inline-flex items-center gap-2" data-testid="button-apply">
            Apply to Join <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
        {[
          { icon: DollarSign, title: "Competitive Commission", body: "Earn percentage-based commission on every referred order, recurring as long as your referrals keep ordering." },
          { icon: Users, title: "Dedicated Partner Support", body: "A real partner manager helps you launch, optimize, and grow — not a chatbot." },
          { icon: BarChart3, title: "Real-Time Analytics", body: "Track clicks, conversions, and commissions live in your partner dashboard." },
        ].map((it) => (
          <div key={it.title} className="text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-[hsl(221,83%,53%)]/10 flex items-center justify-center mb-4">
              <it.icon className="w-7 h-7 text-[hsl(221,83%,53%)]" />
            </div>
            <h3 className="font-bold text-[16px] text-[#0A1628] mb-2">{it.title}</h3>
            <p className="text-[13px] text-slate-600 leading-relaxed">{it.body}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
