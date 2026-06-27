import { useRoute, Link } from "wouter";
import { useState } from "react";
import { PageShell } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { VialIcon } from "@/components/VialIcon";
import NotFound from "./not-found";
import {
  FileCheck, ShieldCheck, FlaskConical, Minus, Plus,
  ShoppingCart, Lock, CreditCard
} from "lucide-react";

export default function Product() {
  const [match, params] = useRoute("/product/:slug");
  const [qty, setQty] = useState(1);
  const product = PRODUCTS.find((p) => p.slug === params?.slug);
  if (!match || !product) return <NotFound />;

  const related = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  const bundles = [
    { qty: "3 Vials", discount: "5% OFF" },
    { qty: "5 Vials", discount: "8% OFF" },
    { qty: "6+ Vials", discount: "10% OFF" },
  ];

  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-[12px] text-slate-500 mb-6" data-testid="breadcrumb">
          <Link href="/" className="hover:text-[hsl(221,83%,53%)]">Home</Link>
          {" / "}
          <Link href="/shop" className="hover:text-[hsl(221,83%,53%)]">Shop</Link>
          {" / "}
          <span className="text-slate-900 font-semibold">{product.name} – {product.dose}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-gradient-to-br from-[#E8F0F8] to-[#C8DAEC] rounded-xl flex items-center justify-center aspect-square sticky top-32 self-start">
            <VialIcon label={product.name} size={320} />
          </div>

          {/* Info */}
          <div>
            <h1 className="text-[36px] md:text-[44px] font-extrabold text-[#0A1628] leading-tight tracking-tight" data-testid="text-product-title">
              {product.name} – {product.dose}
            </h1>

            <div className="flex flex-wrap gap-2 mt-5">
              <span className="text-[11px] font-bold bg-[hsl(221,83%,53%)]/10 text-[hsl(221,83%,53%)] px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5" /> COA Provided
              </span>
              <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5" /> 3rd-Party Tested
              </span>
              <span className="text-[11px] font-bold bg-red-50 text-red-700 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Made in USA
              </span>
            </div>

            <div className="mt-6 bg-[#F8FAFC] border border-slate-200 rounded-lg p-5">
              <h3 className="text-[12px] font-bold uppercase tracking-wider text-slate-900 mb-3">Key Research Highlights</h3>
              <ul className="space-y-2">
                {product.highlights.map((h, i) => (
                  <li key={i} className="text-[14px] text-slate-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[hsl(221,83%,53%)] mt-2 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bundle pricing */}
            <div className="mt-6">
              <h3 className="text-[12px] font-bold uppercase tracking-wider text-slate-900 mb-3">Buy More, Save More</h3>
              <div className="grid grid-cols-3 gap-2">
                {bundles.map((b) => (
                  <div key={b.qty} className="border border-slate-200 rounded-lg p-3 text-center hover:border-[hsl(221,83%,53%)] cursor-pointer transition-colors">
                    <div className="text-[13px] font-bold text-slate-900">{b.qty}</div>
                    <div className="text-[11px] font-bold text-[hsl(221,83%,53%)] mt-1">{b.discount}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-4">
              <span className="text-[40px] font-extrabold text-[#0A1628]" data-testid="text-price">${product.price}</span>
              {product.inStock ? (
                <span className="text-[12px] font-bold text-emerald-600 uppercase tracking-wider">In Stock</span>
              ) : (
                <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Out of Stock</span>
              )}
            </div>

            {/* Qty + Add */}
            <div className="mt-5 flex gap-3 items-stretch">
              <div className="flex items-center border border-slate-300 rounded-md">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 h-12 text-slate-600 hover:text-[hsl(221,83%,53%)]" data-testid="button-qty-down">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-slate-900" data-testid="text-qty">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 h-12 text-slate-600 hover:text-[hsl(221,83%,53%)]" data-testid="button-qty-up">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                disabled={!product.inStock}
                className="flex-1 bg-[hsl(221,83%,53%)] hover:bg-[hsl(224,76%,48%)] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-[14px] px-6 rounded-md transition-colors inline-flex items-center justify-center gap-2"
                data-testid="button-add-cart"
              >
                <ShoppingCart className="w-4 h-4" />
                Add {product.name} to Research Cart
              </button>
            </div>

            <div className="mt-5 flex items-center gap-3 text-[11px] text-slate-500">
              <Lock className="w-3.5 h-3.5" />
              <span>Secure checkout</span>
              <span className="opacity-40">·</span>
              <CreditCard className="w-3.5 h-3.5" />
              <span>Visa · Mastercard · Amex · Apple Pay · Klarna</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-20 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-[26px] font-extrabold text-[#0A1628] tracking-tight mb-3">Product Overview</h2>
              <p className="text-[15px] text-slate-700 leading-relaxed">{product.description}</p>
            </section>

            <section>
              <h2 className="text-[20px] font-bold text-[#0A1628] tracking-tight mb-3">Key Research Areas</h2>
              <ul className="space-y-2 text-[14px] text-slate-700">
                <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(221,83%,53%)] mt-2 flex-shrink-0" /> In vitro receptor binding & signaling studies</li>
                <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(221,83%,53%)] mt-2 flex-shrink-0" /> Cell-culture pathway investigation</li>
                <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(221,83%,53%)] mt-2 flex-shrink-0" /> Analytical method development & validation</li>
                <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(221,83%,53%)] mt-2 flex-shrink-0" /> Reference standard for comparative analysis</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[20px] font-bold text-[#0A1628] tracking-tight mb-3">Intended Use</h2>
              <p className="text-[14px] text-slate-700 leading-relaxed">
                This product is supplied strictly for in vitro research and laboratory use only. It is not intended for human or veterinary use, diagnostic, or therapeutic purposes. Purchasers must be qualified researchers or research institutions and assume full responsibility for safe handling and lawful use.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-bold text-[#0A1628] tracking-tight mb-3">Why Researchers Choose More Life</h2>
              <p className="text-[14px] text-slate-700 leading-relaxed">
                Every vial is produced in U.S.-based laboratory facilities, lyophilized for stability, and verified by independent third-party analytical testing. Each batch ships with a batch-specific certificate of analysis confirming identity, purity, and content.
              </p>
            </section>

            <section className="bg-amber-50 border border-amber-200 rounded-lg p-5">
              <h3 className="text-[13px] font-bold text-amber-900 mb-1.5 uppercase tracking-wider">Product Notes</h3>
              <p className="text-[13px] text-amber-900/90 leading-relaxed">
                Store lyophilized vials refrigerated (2–8°C) short-term or frozen (-20°C) long-term, away from light and moisture. Reconstitute only with appropriate sterile diluent (such as bacteriostatic water).
              </p>
            </section>
          </div>

          <aside className="space-y-5">
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-lg p-5">
              <h3 className="text-[12px] font-bold uppercase tracking-wider text-slate-900 mb-4">Product Details</h3>
              <dl className="space-y-2.5 text-[13px]">
                {[
                  ["Compound", `${product.name}`],
                  ["Dose", product.dose],
                  ["Category", product.category],
                  ["Form", "Lyophilized powder"],
                  ["Purity", "99%+ (HPLC verified)"],
                  ["Storage", "2–8°C / -20°C"],
                  ["Origin", "U.S. laboratory"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <dt className="text-slate-500">{k}</dt>
                    <dd className="font-semibold text-slate-900">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="text-[28px] font-extrabold text-[#0A1628] tracking-tight mb-8">Related Products</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </PageShell>
  );
}
