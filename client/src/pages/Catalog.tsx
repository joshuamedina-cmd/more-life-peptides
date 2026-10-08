import { Link } from "wouter";
import { useState } from "react";
import { PageShell } from "@/components/Layout";
import { useCart, CATALOG, formatUsd } from "@/lib/cart";
import { MAX_QTY_PER_LINE, RUO_NOTICE, type CatalogItem } from "@shared/catalog";
import { ShoppingCart, ArrowRight, Minus, Plus, Check } from "lucide-react";

function CatalogCard({ item }: { item: CatalogItem }) {
  const { add, lines } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const inCart = lines.find((l) => l.id === item.id)?.qty || 0;
  const soldOut = !item.inStock;

  const onAdd = () => {
    const room = Math.max(0, MAX_QTY_PER_LINE - inCart);
    if (room <= 0) return;
    add(item.id, Math.min(qty, room));
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div
      className={`bg-white border rounded-xl p-5 flex flex-col transition-all ${soldOut ? "border-slate-200 opacity-70" : "border-slate-200 hover:border-[hsl(221,83%,53%)] hover:shadow-lg"}`}
      data-testid={`card-catalog-${item.id}`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="font-extrabold text-[17px] text-[#0A1628] leading-tight" data-testid={`text-name-${item.id}`}>{item.name}</h3>
          <p className="text-[12px] font-bold text-[hsl(221,83%,53%)] mt-0.5">{item.dose} per vial</p>
        </div>
        <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded" data-testid={`text-sku-${item.id}`}>{item.id}</span>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[22px] font-extrabold text-[#0A1628]" data-testid={`text-price-${item.id}`}>{formatUsd(item.priceCents)}</span>
          <span className="text-[12px] text-slate-500 font-semibold">/ vial</span>
        </div>

        {soldOut ? (
          <div className="mt-3 w-full text-center px-4 py-2 rounded-lg bg-slate-100 text-slate-500 text-[12px] font-bold" data-testid={`status-soldout-${item.id}`}>
            Sold Out
          </div>
        ) : (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center border border-slate-200 rounded-lg">
              <button aria-label={`Decrease ${item.id}`} onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 text-slate-600 hover:text-[hsl(221,83%,53%)]" data-testid={`button-dec-${item.id}`}>
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-[14px] font-bold tabular-nums" data-testid={`text-qty-${item.id}`}>{qty}</span>
              <button aria-label={`Increase ${item.id}`} onClick={() => setQty((q) => Math.min(MAX_QTY_PER_LINE, q + 1))} className="p-2 text-slate-600 hover:text-[hsl(221,83%,53%)]" data-testid={`button-inc-${item.id}`}>
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <button
              onClick={onAdd}
              className="flex-1 px-3 py-2 rounded-lg bg-[hsl(221,83%,53%)] hover:bg-[hsl(221,83%,47%)] text-white text-[12px] font-bold transition-colors inline-flex items-center justify-center gap-1.5"
              data-testid={`button-add-${item.id}`}
            >
              {added ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
              {added ? "Added" : "Add"}
            </button>
          </div>
        )}
        {inCart > 0 && !soldOut && (
          <p className="mt-2 text-[11px] text-slate-500" data-testid={`text-incart-${item.id}`}>{inCart} in cart</p>
        )}
      </div>
    </div>
  );
}

export default function Catalog() {
  const available = CATALOG.filter((c) => c.inStock);
  const soldOut = CATALOG.filter((c) => !c.inStock);

  return (
    <PageShell>
      <div className="bg-gradient-to-br from-[#E8F0F8] to-[#F0F5FA] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="text-[12px] text-slate-500 mb-3" data-testid="breadcrumb">
            <Link href="/" className="hover:text-[hsl(221,83%,53%)]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900 font-semibold">Research Peptide Catalog</span>
          </div>
          <h1 className="text-[40px] md:text-[52px] font-extrabold text-[#0A1628] tracking-tight">Research Peptide Catalog</h1>
          <p className="mt-3 text-[15px] text-slate-700 max-w-2xl">
            Single vials for the individual researcher — no box minimums. Order exactly the number of vials your work needs.
          </p>
          <p className="mt-2 text-[13px] font-semibold text-slate-600">{RUO_NOTICE}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-[14px] font-bold tracking-[0.18em] uppercase text-slate-500" data-testid="text-catalog-count">
            {available.length} Available · Priced per vial
          </h2>
          <Link href="/cart" className="text-[13px] font-bold text-[hsl(221,83%,53%)] hover:underline flex items-center gap-1" data-testid="link-view-cart">
            View Cart <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {available.map((item) => <CatalogCard key={item.id} item={item} />)}
        </div>

        {soldOut.length > 0 && (
          <>
            <h2 className="mt-14 mb-6 text-[14px] font-bold tracking-[0.18em] uppercase text-slate-500" data-testid="text-soldout-count">
              Currently Sold Out
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {soldOut.map((item) => <CatalogCard key={item.id} item={item} />)}
            </div>
          </>
        )}

        <div className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
          <p className="text-[12px] text-slate-600">
            Prices in USD, per vial. Flat-rate shipping is added once per order. {RUO_NOTICE}
          </p>
        </div>
      </div>
    </PageShell>
  );
}
