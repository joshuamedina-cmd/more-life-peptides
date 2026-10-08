import { Link, useLocation } from "wouter";
import { PageShell } from "@/components/Layout";
import { useCart, findById, formatUsd } from "@/lib/cart";
import { Trash2, Minus, Plus, ArrowRight, ShoppingCart } from "lucide-react";

export default function Cart() {
  const { lines, setQty, remove, subtotalCents, shippingCents, totalCents } = useCart();
  const [, navigate] = useLocation();

  if (lines.length === 0) {
    return (
      <PageShell>
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <ShoppingCart className="w-14 h-14 mx-auto text-slate-300" />
          <h1 className="text-[32px] font-extrabold text-[#0A1628] mt-6">Your cart is empty</h1>
          <p className="text-slate-600 mt-3">Browse the catalog to add research peptides.</p>
          <Link
            href="/catalog"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[hsl(221,83%,53%)] hover:bg-[hsl(221,83%,47%)] text-white text-[14px] font-bold transition-colors"
            data-testid="link-browse-catalog"
          >
            Browse Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-[12px] text-slate-500 mb-3" data-testid="breadcrumb-cart">
          <Link href="/" className="hover:text-[hsl(221,83%,53%)]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/catalog" className="hover:text-[hsl(221,83%,53%)]">Catalog</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900 font-semibold">Cart</span>
        </div>

        <h1 className="text-[36px] font-extrabold text-[#0A1628] mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-3">
            {lines.map((line) => {
              const item = findById(line.id);
              if (!item) return null;
              const lineTotal = item.priceCents * line.qty;
              return (
                <div
                  key={line.id}
                  className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4"
                  data-testid={`cart-line-${line.id}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-bold text-[15px] text-[#0A1628] truncate" data-testid={`cart-name-${line.id}`}>
                        {item.name}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400" data-testid={`cart-dose-${line.id}`}>
                        {item.dose}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-[12px] text-slate-500">
                      <span className="font-mono font-bold" data-testid={`cart-sku-${line.id}`}>{item.id}</span>
                      <span>·</span>
                      <span data-testid={`cart-unit-${line.id}`}>{formatUsd(item.priceCents)} each</span>
                    </div>
                  </div>

                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQty(line.id, line.qty - 1)}
                      className="px-2.5 py-1.5 hover:bg-slate-50"
                      data-testid={`button-dec-${line.id}`}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-[14px] font-bold min-w-[2.5rem] text-center" data-testid={`text-qty-${line.id}`}>
                      {line.qty}
                    </span>
                    <button
                      onClick={() => setQty(line.id, line.qty + 1)}
                      disabled={line.qty >= 100}
                      className="px-2.5 py-1.5 hover:bg-slate-50"
                      data-testid={`button-inc-${line.id}`}
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right w-24">
                    <div className="text-[16px] font-extrabold text-[#0A1628]" data-testid={`cart-total-${line.id}`}>
                      {formatUsd(lineTotal)}
                    </div>
                  </div>

                  <button
                    onClick={() => remove(line.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    data-testid={`button-remove-${line.id}`}
                    aria-label="Remove from cart"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          <div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 sticky top-24">
              <h2 className="text-[16px] font-bold text-[#0A1628] mb-4">Order Summary</h2>
              <dl className="space-y-2.5 text-[14px]">
                <div className="flex justify-between">
                  <dt className="text-slate-600">Subtotal</dt>
                  <dd className="font-bold text-[#0A1628]" data-testid="text-subtotal">{formatUsd(subtotalCents)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-600">Shipping <span className="text-slate-400 text-[11px]">(flat rate)</span></dt>
                  <dd className="font-bold text-[#0A1628]" data-testid="text-shipping">{formatUsd(shippingCents)}</dd>
                </div>
                <div className="border-t border-slate-200 pt-3 mt-3 flex justify-between text-[17px]">
                  <dt className="font-bold text-[#0A1628]">Total</dt>
                  <dd className="font-extrabold text-[#0A1628]" data-testid="text-total">{formatUsd(totalCents)}</dd>
                </div>
              </dl>

              <button
                onClick={() => navigate("/checkout")}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[hsl(221,83%,53%)] hover:bg-[hsl(221,83%,47%)] text-white text-[14px] font-bold transition-colors"
                data-testid="button-checkout"
              >
                Continue to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-slate-500 mt-4 text-center leading-relaxed">
                You'll receive a Square invoice via email to complete payment securely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
