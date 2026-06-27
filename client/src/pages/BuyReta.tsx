import { PageShell } from "@/components/Layout";
import { Link } from "wouter";
import waterRetaCombo from "@/assets/water_reta_combo.png";

const PURCHASE_LINK = "https://more-life-peptides.com/products/30-ml-Bacteriostatic-Water-comes-with-FREE-30mg-USP-p839964180";

export default function BuyReta() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-[#F0F6FF] via-white to-white pt-12 pb-20" data-testid="section-buy-reta-hero">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="text-[12px] text-slate-500 mb-6" data-testid="nav-breadcrumb">
            <Link href="/" className="hover:text-[hsl(221,83%,53%)]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-[hsl(221,83%,53%)]">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-[#0A1628] font-semibold">Fit Kit</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Combo image */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md" data-testid="img-water-reta-combo">
              <img
                src={waterRetaCombo}
                alt="Fit Kit — Bacteriostatic Water and RETA 30MG shipped together"
                className="w-full h-auto block"
              />
            </div>

            {/* Offer panel */}
            <div className="lg:col-span-5">
              <h1 className="text-[42px] md:text-[52px] font-black leading-[1.05] text-[#0A1628] tracking-tight" data-testid="text-offer-headline">
                The Fit Kit
              </h1>

              <p className="text-[16px] text-slate-700 leading-relaxed mt-5" data-testid="text-offer-subhead">
                Bacteriostatic Water + RETA 30 MG, shipped together in our research kit.
              </p>

              {/* Price block */}
              <div className="mt-7 rounded-xl border border-slate-200 bg-white p-5 shadow-sm" data-testid="block-pricing">
                <div className="flex items-baseline justify-between">
                  <span className="text-[13px] uppercase font-bold tracking-[0.14em] text-slate-500">Price</span>
                  <span className="text-[36px] font-black text-[#0A1628]">$125</span>
                </div>
                <p className="text-[12px] text-slate-500 mt-2">Includes both vials · Cold-chain shipped together</p>
              </div>

              {/* CTA */}
              <a
                href={PURCHASE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-[hsl(221,83%,53%)] hover:bg-[hsl(221,83%,47%)] text-white text-[16px] font-extrabold tracking-wide transition-colors shadow-lg shadow-[hsl(221,83%,53%)]/25"
                data-testid="link-buy-now"
              >
                Buy the Fit Kit — $125 →
              </a>

              <p className="text-[11px] text-slate-500 mt-3 text-center" data-testid="text-cta-microcopy">
                Secure checkout · Cold-chain shipping · Lab-tested batches
              </p>

              <p className="text-[11px] text-slate-400 mt-2 text-center">
                For Research Purposes Only · Not for human consumption
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's in the Fit Kit */}
      <section className="py-20 bg-[#F8FAFC] border-t border-slate-100" data-testid="section-product-details">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[12px] font-bold tracking-[0.2em] text-[hsl(221,83%,53%)] uppercase">Kit Contents</p>
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#0A1628] mt-2 tracking-tight">
              What's in the Fit Kit
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: "01", t: "30 mL Bacteriostatic Water", d: "USP-grade, 0.9% benzyl alcohol. Multiple-dose vial for safe reconstitution of lyophilized peptides." },
              { n: "02", t: "RETA 30 MG Vial", d: "Triple-agonist research peptide (GLP-1 / GIP / glucagon). 30 mg lyophilized sodium powder, ≥99% HPLC." },
              { n: "03", t: "Cold-Chain Shipped Together", d: "Both vials packed and shipped together in a single cold-chain protected package with tracking." },
            ].map((item) => (
              <div key={item.n} className="rounded-xl border border-slate-200 bg-white p-6" data-testid={`card-step-${item.n}`}>
                <div className="text-[12px] font-black text-[hsl(221,83%,53%)] tracking-widest">{item.n}</div>
                <h4 className="text-[17px] font-extrabold text-[#0A1628] mt-2">{item.t}</h4>
                <p className="text-[14px] text-slate-600 mt-2 leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping & bottom CTA */}
      <section className="py-20 bg-white border-t border-slate-100" data-testid="section-bottom-cta">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-2xl bg-[#0A1628] p-8 md:p-10 text-center" data-testid="block-bottom-cta">
            <h3 className="text-[26px] md:text-[32px] font-extrabold text-white tracking-tight">
              Ready to order the Fit Kit?
            </h3>
            <p className="text-[15px] text-slate-300 mt-3 max-w-xl mx-auto">
              Both vials ship together, cold-chain protected. $125, no bundles, no gimmicks.
            </p>
            <a
              href={PURCHASE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[hsl(221,83%,53%)] hover:bg-[hsl(221,83%,47%)] text-white text-[15px] font-extrabold tracking-wide transition-colors shadow-lg"
              data-testid="link-buy-now-bottom"
            >
              Buy the Fit Kit — $125 →
            </a>
            <p className="text-[11px] text-slate-400 mt-4">For Research Purposes Only · Not for human consumption</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
