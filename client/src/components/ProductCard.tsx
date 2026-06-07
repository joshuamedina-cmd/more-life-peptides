import { Link } from "wouter";
import { Product } from "@/data/products";
import { VialIcon } from "./VialIcon";
import { Star } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} data-testid={`card-product-${product.slug}`}>
      <div className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-[hsl(221,83%,53%)] hover:shadow-lg transition-all duration-200 cursor-pointer">
        <div className="bg-gradient-to-br from-[#F0F5FA] to-[#E1ECF7] aspect-square flex items-center justify-center p-6">
          <div className="transform group-hover:scale-105 transition-transform duration-300">
            <VialIcon label={product.name} size={170} />
          </div>
        </div>
        <div className="p-5 border-t border-slate-100">
          <div className="flex items-center gap-1 text-amber-400 mb-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400" />
            ))}
          </div>
          <h3 className="font-bold text-[15px] text-slate-900 leading-tight" data-testid={`text-product-name-${product.slug}`}>
            {product.name} — {product.dose}
          </h3>
          <div className="flex items-center justify-between mt-3">
            <span className="text-[18px] font-extrabold text-[hsl(221,83%,53%)]" data-testid={`text-product-price-${product.slug}`}>
              ${product.price}
            </span>
            {product.inStock ? (
              <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded">In Stock</span>
            ) : (
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500 bg-slate-100 px-2 py-1 rounded">Out of Stock</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
