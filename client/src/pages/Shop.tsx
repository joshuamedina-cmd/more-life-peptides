import { Link } from "wouter";
import { PageShell } from "@/components/Layout";
import { Star } from "lucide-react";
import specReta from "@/assets/spec_reta_30mg.png";
import specWolverine from "@/assets/spec_wolverine.png";
import specGhkcu from "@/assets/spec_ghkcu.png";

type ShopItem = {
  slug: string;
  name: string;
  dose: string;
  price: number;
  image: string;
  inStock: boolean;
  href: string;
  blurb: string;
};

const ITEMS: ShopItem[] = [
  {
    slug: "reta-30mg",
    name: "RETATRUTIDE",
    dose: "30 MG",
    price: 299,
    image: specReta,
    inStock: true,
    href: "/buy/reta",
    blurb: "Triple-receptor research peptide · Lyophilized sodium powder · ≥99% HPLC",
  },
  {
    slug: "wolverine-blend",
    name: "WOLVERINE BLEND",
    dose: "10 + 10 MG",
    price: 159,
    image: specWolverine,
    inStock: false,
    href: "/shop",
    blurb: "BPC-157 + TB-500 recovery blend · Lyophilized · Third-party verified",
  },
  {
    slug: "ghk-cu-50mg",
    name: "GHK-Cu",
    dose: "50 MG",
    price: 119,
    image: specGhkcu,
    inStock: true,
    href: "/shop",
    blurb: "Copper tripeptide · Light-sensitive blue powder · ≥99% HPLC",
  },
];

function ShopCard({ item }: { item: ShopItem }) {
  const isSoldOut = !item.inStock;
  const CardInner = (
    <div
      className={`group relative bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${
        isSoldOut
          ? "border-slate-200 opacity-95"
          : "border-slate-200 hover:border-[hsl(221,83%,53%)] hover:shadow-xl cursor-pointer"
      }`}
      data-testid={`card-product-${item.slug}`}
    >
      {/* Sold out ribbon */}
      {isSoldOut && (
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block bg-slate-900 text-white text-[11px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-md shadow-md" data-testid={`badge-soldout-${item.slug}`}>
            Sold Out
          </span>
        </div>
      )}

      {/* Image area */}
      <div className={`bg-gradient-to-br from-[#F0F5FA] to-[#E1ECF7] aspect-[4/3] flex items-center justify-center p-4 overflow-hidden ${isSoldOut ? "grayscale" : ""}`}>
        <img
          src={item.image}
          alt={`More Life Peptides ${item.name} ${item.dose}`}
          className={`max-h-full max-w-full object-contain transition-transform duration-300 ${isSoldOut ? "" : "group-hover:scale-105"}`}
          loading="lazy"
          data-testid={`img-product-${item.slug}`}
        />
      </div>

      {/* Body */}
      <div className="p-6 border-t border-slate-100">
        <div className="flex items-center gap-1 text-amber-400 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
          ))}
          <span className="text-[11px] font-semibold text-slate-500 ml-1.5">5.0</span>
        </div>
        <h3 className="font-extrabold text-[18px] text-[#0A1628] leading-tight" data-testid={`text-product-name-${item.slug}`}>
          {item.name}
        </h3>
        <p className="text-[13px] font-bold text-[hsl(221,83%,53%)] mt-0.5">{item.dose}</p>
        <p className="text-[13px] text-slate-600 mt-2 leading-relaxed">{item.blurb}</p>

        <div className="flex items-center justify-between mt-5 pt-5 border-t border-slate-100">
          <div>
            <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">From</span>
            <div className="text-[22px] font-extrabold text-[#0A1628]" data-testid={`text-product-price-${item.slug}`}>
              ${item.price}
            </div>
          </div>
          {isSoldOut ? (
            <span className="px-5 py-2.5 rounded-lg bg-slate-100 text-slate-500 text-[13px] font-bold cursor-not-allowed" data-testid={`button-soldout-${item.slug}`}>
              Sold Out
            </span>
          ) : (
            <span className="px-5 py-2.5 rounded-lg bg-[hsl(221,83%,53%)] text-white text-[13px] font-bold group-hover:bg-[hsl(221,83%,47%)] transition-colors" data-testid={`link-buy-${item.slug}`}>
              Buy →
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (isSoldOut) {
    return <div>{CardInner}</div>;
  }
  return <Link href={item.href}>{CardInner}</Link>;
}

export default function Shop() {
  const inStockCount = ITEMS.filter((i) => i.inStock).length;

  return (
    <PageShell>
      {/* Page header */}
      <div className="bg-gradient-to-br from-[#E8F0F8] to-[#F0F5FA] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="text-[12px] text-slate-500 mb-3" data-testid="breadcrumb">
            Home / <span className="text-slate-900 font-semibold">Shop Peptides</span>
          </div>
          <h1 className="text-[40px] md:text-[52px] font-extrabold text-[#0A1628] tracking-tight">Shop Peptides</h1>
          <p className="mt-3 text-[15px] text-slate-700 max-w-2xl">
            A curated launch lineup of high-purity research peptides. Every batch independently verified for ≥99% purity. For in vitro research use only.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-[14px] font-bold tracking-[0.18em] uppercase text-slate-500" data-testid="text-launch-lineup">
            Launch Lineup · {ITEMS.length} Products
          </h2>
          <span className="text-[12px] text-slate-500" data-testid="text-stock-count">
            <span className="font-bold text-emerald-600">{inStockCount}</span> in stock
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((item) => (
            <ShopCard key={item.slug} item={item} />
          ))}
        </div>

        {/* More coming soon */}
        <div className="mt-16 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center" data-testid="block-more-coming">
          <p className="text-[12px] font-bold tracking-[0.18em] uppercase text-[hsl(221,83%,53%)]">Coming Soon</p>
          <h3 className="text-[24px] font-extrabold text-[#0A1628] mt-2">More peptides on the way</h3>
          <p className="text-[14px] text-slate-600 mt-2 max-w-xl mx-auto">
            We're expanding the catalog as new batches clear third-party verification. Check back soon.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
