import { PageShell } from "@/components/Layout";
import { Link } from "wouter";
import waterRetaCombo from "@/assets/water_reta_combo.png";
import bacWaterSolo from "@/assets/bac_water_solo.png";
import specReta from "@/assets/spec_reta_30mg.png";

// TODO: replace with the real Ecwid / payment link when ready
const PURCHASE_LINK = "https://more-life-peptides.com/products/Bacteriostatic-Water-comes-with-FREE-30mg-USP-p839964180";

function Star({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z" />
    </svg>
  );
}

export default function BuyReta() {
  return (
    <PageShell>
      {/* Hero offer */}
      <section className="relative bg-gradient-to-b from-[#F0F6FF] via-white to-white pt-12 pb-20" data-testid="section-buy-reta-hero">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="text-[12px] text-slate-500 mb-6" data-testid="nav-breadcrumb">
            <Link href="/" className="hover:text-[hsl(221,83%,53%)]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-[hsl(221,83%,53%)]">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-[#0A1628] font-semibold">RETA 30 MG</span>
          </nav>

          {/* Promo badge row */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[hsl(221,83%,53%)]/10 text-[hsl(221,83%,53%)] text-[11px] font-extrabold tracking-[0.18em] uppercase" data-testid="badge-launch-offer">
              <Star className="w-3 h-3" />
              Launch Offer
            </span>
            <span className="text-[12px] font-semibold text-slate-600">Limited Time · While Supplies Last</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Combo image */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md" data-testid="img-water-reta-combo">
              <img
                src={waterRetaCombo}
                alt="Buy bacteriostatic water, get RETA 30MG free"
                className="w-full h-auto block"
              />
            </div>

            {/* Offer panel */}
            <div className="lg:col-span-5">
              <h1 className="text-[42px] md:text-[52px] font-black leading-[1.05] text-[#0A1628] tracking-tight" data-testid="text-offer-headline">
                Buy Water.
                <br />
                <span className="text-[hsl(221,83%,53%)]">Get RETA FREE.</span>
              </h1>

              <p className="text-[16px] text-slate-700 leading-relaxed mt-5" data-testid="text-offer-subhead">
                Order a 30 mL vial of our USP-grade <strong>Bacteriostatic Water</strong> and we'll send you a vial of
                <strong> RETA 30 MG (Retatrutide)</strong> on the house. One free research-grade peptide vial,
                bundled with every water order — shipped together, cold-chain protected.
              </p>

              {/* Price block */}
              <div className="mt-7 rounded-xl border border-slate-200 bg-white p-5 shadow-sm" data-testid="block-pricing">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-[13px] uppercase font-bold tracking-[0.14em] text-slate-500">You Pay (Water)</span>
                  <span className="text-[28px] font-black text-[#0A1628]">$150</span>
                </div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-[13px] uppercase font-bold tracking-[0.14em] text-[hsl(221,83%,53%)]">You Get (RETA Vial)</span>
                  <span className="text-[16px] font-black text-[hsl(221,83%,53%)]">
                    <span className="line-through text-slate-400 font-bold mr-2">$150</span>FREE
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-200 flex items-baseline justify-between">
                  <span className="text-[12px] font-bold text-slate-600 uppercase tracking-wider">Total Value</span>
                  <span className="text-[16px] font-extrabold text-emerald-600">Save $150</span>
                </div>
              </div>

              {/* CTA */}
              <a
                href={PURCHASE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-[hsl(221,83%,53%)] hover:bg-[hsl(221,83%,47%)] text-white text-[16px] font-extrabold tracking-wide transition-colors shadow-lg shadow-[hsl(221,83%,53%)]/25"
                data-testid="link-buy-now"
              >
Ready to Buy  →
              </a>

              <p className="text-[11px] text-slate-500 mt-3 text-center" data-testid="text-cta-microcopy">
                Secure checkout · Cold-chain shipping · Lab-tested batches
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white border-t border-slate-100" data-testid="section-how-it-works">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[12px] font-bold tracking-[0.2em] text-[hsl(221,83%,53%)] uppercase">Why This Offer Exists</p>
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#0A1628] mt-2 tracking-tight">
              A Creative Solution While We Finalize Checkout
            </h2>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 md:p-8 mb-10" data-testid="block-explainer">
            <div className="flex items-start gap-4">
              <Star className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-[18px] font-extrabold text-[#0A1628]">We're putting the finishing touches on our full payment system.</h3>
                <p className="text-[15px] text-slate-700 leading-relaxed mt-2">
                  While our complete site-wide checkout is being completed, we wanted our earliest researchers to still get their hands on
                  More Life Peptides products — so here's our solution: <strong>order a vial of our USP-grade bacteriostatic water</strong>
                  through our fully-secured partner checkout, and we'll <strong>ship a free vial of RETA 30 MG</strong> alongside it,
                  bundled in the same cold-chain package. No catch, no upcharge — just a thank-you for being early.
                </p>
              </div>
            </div>
          </div>

          {/* Three-step */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: "01", t: "Order the Water", d: "Click the button above and check out securely through our partner cart for the 30 mL BAC water." },
              { n: "02", t: "We Bundle the RETA", d: "Every water order auto-ships with a free vial of RETA 30 MG — lyophilized, lab-tested, no extra steps." },
              { n: "03", t: "Track & Receive", d: "Cold-chain shipped together. You get your COA, tracking, and both products in one box." },
            ].map((step) => (
              <div key={step.n} className="rounded-xl border border-slate-200 bg-white p-6" data-testid={`card-step-${step.n}`}>
                <div className="text-[12px] font-black text-[hsl(221,83%,53%)] tracking-widest">{step.n}</div>
                <h4 className="text-[17px] font-extrabold text-[#0A1628] mt-2">{step.t}</h4>
                <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product details — water + reta side by side */}
      <section className="py-20 bg-[#F8FAFC] border-t border-slate-100" data-testid="section-product-details">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[12px] font-bold tracking-[0.2em] text-[hsl(221,83%,53%)] uppercase">What's In The Box</p>
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#0A1628] mt-2 tracking-tight">
              Two Products, One Order
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Water */}
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm" data-testid="card-water-detail">
              <div className="bg-gradient-to-br from-[#F0F6FF] to-white p-6 flex items-center justify-center min-h-[360px]">
                <img src={bacWaterSolo} alt="Bacteriostatic Water 30mL" className="max-h-[340px] w-auto" />
              </div>
              <div className="p-6 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-extrabold tracking-[0.18em] text-[hsl(221,83%,53%)] uppercase">You Pay For</span>
                </div>
                <h3 className="text-[22px] font-extrabold text-[#0A1628]">Bacteriostatic Water · 30 mL</h3>
                <p className="text-[14px] text-slate-600 mt-2">USP-grade, 0.9% benzyl alcohol. Multiple-dose vial for safe reconstitution of lyophilized peptides.</p>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-[24px] font-black text-[#0A1628]">$150</span>
                </div>
              </div>
            </div>

            {/* Reta */}
            <div className="rounded-2xl border-2 border-[hsl(221,83%,53%)] bg-white overflow-hidden shadow-md relative" data-testid="card-reta-detail">
              <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(221,83%,53%)] text-white text-[11px] font-extrabold tracking-[0.14em] uppercase shadow-md">
                <Star className="w-3 h-3" />
                FREE
              </div>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-white p-6 flex items-center justify-center min-h-[360px]">
                <img src={specReta} alt="RETA 30 MG spec sheet" className="max-h-[340px] w-auto" />
              </div>
              <div className="p-6 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-extrabold tracking-[0.18em] text-[hsl(221,83%,53%)] uppercase">Included Free</span>
                </div>
                <h3 className="text-[22px] font-extrabold text-[#0A1628]">RETA 30 MG · Retatrutide</h3>
                <p className="text-[14px] text-slate-600 mt-2">
                  Triple-agonist research peptide (GLP-1 / GIP / glucagon). 30 mg lyophilized sodium powder, ≥99% HPLC.
                </p>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-[24px] font-black text-[hsl(221,83%,53%)]">FREE</span>
                  <span className="text-[14px] line-through text-slate-400 font-semibold">$150.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 rounded-2xl bg-[#0A1628] p-8 md:p-10 text-center" data-testid="block-bottom-cta">
            <Star className="w-8 h-8 text-[hsl(221,83%,63%)] mx-auto mb-3" />
            <h3 className="text-[26px] md:text-[32px] font-extrabold text-white tracking-tight">
              Ready to claim your free RETA?
            </h3>
            <p className="text-[15px] text-slate-300 mt-3 max-w-xl mx-auto">
              Order the water through our partner cart and we'll bundle your RETA vial automatically. No promo code needed.
            </p>
            <a
              href={PURCHASE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[hsl(221,83%,53%)] hover:bg-[hsl(221,83%,47%)] text-white text-[15px] font-extrabold tracking-wide transition-colors shadow-lg"
              data-testid="link-buy-now-bottom"
            >
              Buy Water + Claim Free RETA  →
            </a>
            <p className="text-[11px] text-slate-400 mt-4">Research use only · Not for human consumption</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
