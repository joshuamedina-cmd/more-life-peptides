import { useState, useMemo } from "react";
import { PageShell } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { Search } from "lucide-react";

const CATEGORIES = ["All", "GLP", "Growth", "Recovery", "Blends", "Metabolic", "Cosmetic", "Neuro", "Immune", "Longevity", "Antioxidant", "Supplies"];

export default function Shop() {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => category === "All" || p.category === category);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.dose.toLowerCase().includes(q));
    }
    if (sort === "price-low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [category, sort, query]);

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
            Browse our complete catalog of research peptides. Every batch independently verified for 99%+ purity. For in vitro research use only.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          <div className="lg:w-64 flex-shrink-0">
            <h3 className="text-[12px] font-bold uppercase tracking-wider text-slate-900 mb-4">Categories</h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`text-left text-[13px] font-semibold px-3 py-2 rounded-md transition-colors ${
                    category === c
                      ? "bg-[hsl(221,83%,53%)] text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                  data-testid={`button-category-${c.toLowerCase()}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search peptides…"
                  className="w-full pl-10 pr-3 py-2.5 text-[14px] border border-slate-300 rounded-md focus:outline-none focus:border-[hsl(221,83%,53%)]"
                  data-testid="input-search"
                />
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-3 py-2.5 text-[14px] border border-slate-300 rounded-md bg-white focus:outline-none focus:border-[hsl(221,83%,53%)] font-semibold text-slate-700"
                data-testid="select-sort"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name (A–Z)</option>
              </select>
            </div>

            <p className="text-[13px] text-slate-500 mb-5" data-testid="text-result-count">
              Showing <span className="font-bold text-slate-900">{filtered.length}</span> of {PRODUCTS.length} products
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-slate-500" data-testid="text-empty">
                No products match your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
