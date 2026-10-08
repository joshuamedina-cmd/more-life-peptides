import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { CATALOG, findById, formatUsd, SHIPPING_FLAT_CENTS, MAX_QTY_PER_LINE } from "@shared/catalog";

export type CartLine = { id: string; qty: number };

type CartCtx = {
  lines: CartLine[];
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  count: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const add = useCallback((id: string, qty = 1) => {
    if (!findById(id)?.inStock) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing) {
        return prev.map((l) => (l.id === id ? { ...l, qty: Math.min(MAX_QTY_PER_LINE, l.qty + qty) } : l));
      }
      return [...prev, { id, qty: Math.min(MAX_QTY_PER_LINE, qty) }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) => {
      if (qty <= 0) return prev.filter((l) => l.id !== id);
      return prev.map((l) => (l.id === id ? { ...l, qty: Math.min(MAX_QTY_PER_LINE, qty) } : l));
    });
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const subtotalCents = lines.reduce((sum, l) => {
    const item = findById(l.id);
    return sum + (item ? item.priceCents * l.qty : 0);
  }, 0);

  const count = lines.reduce((s, l) => s + l.qty, 0);
  const shippingCents = subtotalCents > 0 ? SHIPPING_FLAT_CENTS : 0;
  const totalCents = subtotalCents + shippingCents;

  return (
    <Ctx.Provider
      value={{ lines, add, setQty, remove, clear, subtotalCents, shippingCents, totalCents, count }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export { CATALOG, findById, formatUsd };
