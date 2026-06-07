import { Link } from "wouter";
import specReta from "@/assets/spec_reta_30mg.png";
import specWolverine from "@/assets/spec_wolverine.png";
import specGhkcu from "@/assets/spec_ghkcu.png";
import twoVials from "@/assets/two_vials.png";
import heroThreeVials from "@/assets/hero_three_vials.png";
import { useState } from "react";
import { PageShell } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { VialIcon } from "@/components/VialIcon";
import { BESTSELLERS, NEW_ARRIVALS } from "@/data/products";
import {
  Star, CheckCircle2, ShieldCheck, FlaskConical, Truck,
  Microscope, Award, HeartHandshake, FileCheck, ChevronDown, ArrowRight
} from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#E8F0F8] via-[#F0F5FA] to-[#E1ECF7]">
      {/* Floating molecular spheres */}
      <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-gradient-to-br from-[hsl(221,83%,75%)] to-[hsl(221,83%,53%)] opacity-30 blur-sm" />
      <div className="absolute bottom-32 left-16 w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(217,91%,75%)] to-[hsl(221,83%,53%)] opacity-25 blur-sm" />
      <div className="absolute top-1/2 right-1/3 w-8 h-8 rounded-full bg-[hsl(221,83%,53%)] opacity-20" />

      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center relative">
        <div>
          <div className="flex items-center gap-1 mb-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-2 text-[12px] font-semibold text-slate-700 uppercase tracking-wider">5-Star Rated</span>
          </div>

          <h1 className="text-[44px] md:text-[56px] lg:text-[64px] font-extrabold leading-[1.05] tracking-tight text-[#0A1628]">
            High Purity Peptides.<br />
            <span className="text-[hsl(221,83%,53%)]">Tested.</span> Trusted.
          </h1>

          <p className="mt-6 text-[16px] leading-relaxed text-slate-700 max-w-xl">
            At More Life Peptides, we provide high-quality research peptides formulated for purity and consistency. Produced in certified U.S. facilities and supported by third-party testing, every batch meets rigorous quality standards you can rely on.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <a href="https://more-life-peptides.com/products/Bacteriostatic-Water-comes-with-FREE-30mg-USP-p839964180" target="_blank" rel="noopener noreferrer">
              <button className="bg-[hsl(221,83%,53%)] hover:bg-[hsl(224,76%,48%)] text-white font-bold text-[14px] px-8 py-4 rounded-full transition-all shadow-lg shadow-[hsl(221,83%,53%)]/25 hover:shadow-xl hover:shadow-[hsl(221,83%,53%)]/30 hover:-translate-y-0.5 inline-flex items-center gap-2" data-testid="button-hero-shop">
                Shop Peptides
                <ArrowRight className="w-4 h-4" />
              </button>
            </a>
            <span className="text-[11px] text-slate-500 max-w-[280px]">
              For in vitro research and laboratory use only. Not for human consumption.
            </span>
          </div>
        </div>

        {/* Hero product trio */}
        <div className="relative flex items-center justify-center" data-testid="hero-three-vials">
          <div className="absolute inset-0 bg-gradient-radial from-[hsl(221,83%,80%)]/30 to-transparent rounded-full blur-3xl" />
          <img
            src={heroThreeVials}
            alt="More Life Peptides RETA, Wolverine Blend, and GHK-Cu vials"
            className="relative w-full max-w-[640px] h-auto drop-shadow-xl mix-blend-multiply"
          />
        </div>
      </div>
    </section>
  );
}

function TrustBanner() {
  return (
    <section className="bg-[#0A1628] py-5">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-4 text-white text-[13px] md:text-[15px] font-semibold flex-wrap">
        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        <span className="opacity-90">Third-Party Tested For:</span>
        <span className="text-[hsl(217,91%,70%)] font-bold tracking-wide">PURITY</span>
        <span className="opacity-50">·</span>
        <span className="opacity-90 tracking-wide">SAFETY</span>
        <span className="opacity-50">·</span>
        <span className="opacity-90 tracking-wide">QUALITY</span>
        <span className="opacity-50">·</span>
        <span className="opacity-90 tracking-wide">ACCURACY</span>
      </div>
    </section>
  );
}

function ValueProps() {
  const items = [
    { icon: ShieldCheck, title: "Buy More, Save More", sub: "Volume discounts up to 10% off" },
    { icon: FlaskConical, title: "Made In U.S.A Labs", sub: "Domestic manufacturing facilities" },
    { icon: FileCheck, title: "Third-Party Tested", sub: "99%+ purity verification" },
    { icon: HeartHandshake, title: "7 Days a Week Support", sub: "Real people, real answers" },
  ];
  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it) => (
          <div key={it.title} className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[hsl(221,83%,53%)]/10 flex items-center justify-center flex-shrink-0">
              <it.icon className="w-6 h-6 text-[hsl(221,83%,53%)]" />
            </div>
            <div>
              <div className="font-bold text-[14px] text-slate-900 leading-tight">{it.title}</div>
              <div className="text-[12px] text-slate-500 mt-0.5">{it.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

type LaunchProduct = {
  slug: string;
  name: string;
  dose: string;
  price: number;
  image: string;
  inStock: boolean;
  href: string;
  blurb: string;
};

const LAUNCH_PRODUCTS: LaunchProduct[] = [
  {
    slug: "reta-30mg",
    name: "RETATRUTIDE",
    dose: "30 MG",
    price: 299,
    image: specReta,
    inStock: true,
    href: "https://more-life-peptides.com/products/Bacteriostatic-Water-comes-with-FREE-30mg-USP-p839964180",
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
    href: "https://more-life-peptides.com/products/Bacteriostatic-Water-comes-with-FREE-30mg-USP-p839964180",
    blurb: "Copper tripeptide · Light-sensitive blue powder · ≥99% HPLC",
  },
];

function LaunchLineupCard({ item }: { item: LaunchProduct }) {
  const isSoldOut = !item.inStock;
  const inner = (
    <div
      className={`group relative bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${
        isSoldOut
          ? "border-slate-200 opacity-95"
          : "border-slate-200 hover:border-[hsl(221,83%,53%)] hover:shadow-xl cursor-pointer"
      }`}
      data-testid={`card-launch-${item.slug}`}
    >
      {isSoldOut && (
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block bg-slate-900 text-white text-[11px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-md shadow-md" data-testid={`badge-soldout-${item.slug}`}>
            Sold Out
          </span>
        </div>
      )}
      <div className={`bg-gradient-to-br from-[#F0F5FA] to-[#E1ECF7] aspect-[4/3] flex items-center justify-center p-4 overflow-hidden ${isSoldOut ? "grayscale" : ""}`}>
        <img
          src={item.image}
          alt={`More Life Peptides ${item.name} ${item.dose}`}
          className={`max-h-full max-w-full object-contain transition-transform duration-300 ${isSoldOut ? "" : "group-hover:scale-105"}`}
          loading="lazy"
          data-testid={`img-launch-${item.slug}`}
        />
      </div>
      <div className="p-6 border-t border-slate-100">
        <div className="flex items-center gap-1 text-amber-400 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
          ))}
          <span className="text-[11px] font-semibold text-slate-500 ml-1.5">5.0</span>
        </div>
        <h3 className="font-extrabold text-[18px] text-[#0A1628] leading-tight" data-testid={`text-launch-name-${item.slug}`}>{item.name}</h3>
        <p className="text-[13px] font-bold text-[hsl(221,83%,53%)] mt-0.5">{item.dose}</p>
        <p className="text-[13px] text-slate-600 mt-2 leading-relaxed">{item.blurb}</p>
        <div className="flex items-center justify-between mt-5 pt-5 border-t border-slate-100">
          <div>
            <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">From</span>
            <div className="text-[22px] font-extrabold text-[#0A1628]" data-testid={`text-launch-price-${item.slug}`}>${item.price}</div>
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
  if (isSoldOut) return <div>{inner}</div>;
  const isExternal = item.href.startsWith("http");
  if (isExternal) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" data-testid={`link-extbuy-${item.slug}`}>
        {inner}
      </a>
    );
  }
  return <Link href={item.href}>{inner}</Link>;
}

function LaunchLineup() {
  return (
    <section className="py-20 bg-[#F8FAFC]" data-testid="section-launch-lineup">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-[hsl(221,83%,53%)]">Launch Lineup</span>
          <h2 className="text-[36px] md:text-[44px] font-extrabold text-[#0A1628] mt-2 tracking-tight">Our First Three Peptides</h2>
          <p className="text-[15px] text-slate-600 mt-3 max-w-2xl mx-auto">
            A curated launch lineup. Every batch independently verified for ≥99% purity. More compounds on the way.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LAUNCH_PRODUCTS.map((item) => <LaunchLineupCard key={item.slug} item={item} />)}
        </div>
        <div className="mt-12 text-center">
          <a href="https://more-life-peptides.com/products/Bacteriostatic-Water-comes-with-FREE-30mg-USP-p839964180" target="_blank" rel="noopener noreferrer">
            <button className="border-2 border-[hsl(221,83%,53%)] text-[hsl(221,83%,53%)] font-bold text-[14px] px-8 py-3.5 rounded-full hover:bg-[hsl(221,83%,53%)] hover:text-white transition-all inline-flex items-center gap-2" data-testid="button-shop-all">
              Visit Full Store <ArrowRight className="w-4 h-4" />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

function ManufacturingSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-5">
          <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] rounded-xl aspect-[4/3] relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 grid grid-cols-3 gap-px p-4 opacity-30">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-gradient-to-br from-blue-300 to-blue-500 rounded-sm" />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Microscope className="w-32 h-32 text-white/80" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-white/90">
              <p className="text-[11px] font-bold uppercase tracking-widest opacity-70">U.S.-Based Facility</p>
              <p className="text-[14px] font-semibold">Sterile lyophilization & batch QA</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#E8F0F8] to-[#C8DAEC] rounded-xl aspect-[4/3] flex items-center justify-center shadow-lg">
            <div className="flex gap-4">
              <VialIcon label="BPC-157" size={150} />
              <VialIcon label="TB-500" size={150} />
            </div>
          </div>
        </div>

        <div>
          <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-[hsl(221,83%,53%)]">Our Process</span>
          <h2 className="text-[36px] md:text-[42px] font-extrabold text-[#0A1628] mt-2 mb-5 leading-tight tracking-tight">
            Advanced Research<br />Manufacturing
          </h2>
          <p className="text-[15px] text-slate-700 leading-relaxed mb-4">
            Every More Life Peptides vial is produced in certified U.S.-based laboratory facilities following established sterile manufacturing procedures. Our peptides are synthesized using high-grade solid-phase synthesis, purified by HPLC, and lyophilized to lock in stability.
          </p>
          <p className="text-[15px] text-slate-700 leading-relaxed mb-6">
            From raw material qualification through final fill, each step is documented and reviewed. Batch-specific certificates of analysis from independent third-party laboratories verify identity, purity, and content before any vial leaves our facility.
          </p>
          <Link href="/about">
            <button className="bg-[#0A1628] hover:bg-[#1E3A5F] text-white font-bold text-[13px] px-6 py-3 rounded-full transition-colors inline-flex items-center gap-2" data-testid="button-about">
              Read More About Us <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function QualityVerification() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#F0F5FA] to-[#E1ECF7]">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-[hsl(221,83%,53%)]">Verified Purity</span>
          <h2 className="text-[36px] md:text-[42px] font-extrabold text-[#0A1628] mt-2 mb-5 leading-tight tracking-tight">
            More Life Peptides<br />Quality & Verification
          </h2>
          <p className="text-[15px] text-slate-700 leading-relaxed mb-4">
            Independent verification matters. That's why every batch we release is sent to a third-party analytical laboratory for purity, identity, and content testing — with results published as accessible certificates of analysis.
          </p>
          <p className="text-[15px] text-slate-700 leading-relaxed mb-6">
            We hold our manufacturing to a 99%+ purity standard. When a batch doesn't meet that bar, it doesn't ship. Period.
          </p>
          <button className="border-2 border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white font-bold text-[13px] px-6 py-3 rounded-full transition-colors inline-flex items-center gap-2" data-testid="button-lab-testing">
            Learn More About Lab Testing <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="relative">
          <div className="bg-white rounded-xl p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[hsl(221,83%,53%)]" />
                <span className="text-[12px] font-bold uppercase tracking-wider text-slate-900">Certificate of Analysis</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">VERIFIED</span>
            </div>
            <div className="border-t border-slate-200 pt-5 space-y-3">
              {[
                { k: "Product", v: "BPC-157 10MG" },
                { k: "Batch", v: "MLP-2026-1142" },
                { k: "Method", v: "HPLC-UV / MS" },
                { k: "Purity", v: "99.62%", highlight: true },
                { k: "Identity", v: "Confirmed (MS)" },
                { k: "Endotoxin", v: "<0.5 EU/mg" },
                { k: "Lab", v: "Independent 3rd-party" },
              ].map((r) => (
                <div key={r.k} className="flex justify-between items-center text-[13px]">
                  <span className="text-slate-500">{r.k}</span>
                  <span className={`font-semibold ${r.highlight ? "text-[hsl(221,83%,53%)] text-[15px]" : "text-slate-900"}`}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const items = [
    { icon: Award, title: "99%+ Purity Verification by Third-Party Labs", body: "Each batch is independently verified for analytical purity and content." },
    { icon: FlaskConical, title: "U.S.-Based Laboratory Operations", body: "Manufactured within domestic facilities following established quality procedures." },
    { icon: HeartHandshake, title: "Expert Support, Real People", body: "Connect with our U.S.-based support team via chat, phone, or email." },
    { icon: Truck, title: "Fast & Reliable Fulfillment", body: "Orders are typically processed within one business day." },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-[hsl(221,83%,53%)]">Why Choose Us</span>
          <h2 className="text-[36px] md:text-[44px] font-extrabold text-[#0A1628] mt-2 tracking-tight">Why Researchers Choose More Life</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((it) => (
            <div key={it.title} className="text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-[hsl(221,83%,53%)] to-[hsl(224,76%,48%)] flex items-center justify-center shadow-lg shadow-[hsl(221,83%,53%)]/20">
                <it.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-[15px] text-[#0A1628] leading-tight mb-2.5">{it.title}</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: "What are Peptides?", a: "Peptides are short chains of amino acids linked by peptide bonds. They occur naturally in the body and play important regulatory roles. The peptides offered here are synthetic research compounds intended for in vitro laboratory and research applications only." },
  { q: "Are your peptides tested for purity?", a: "Yes. Every batch is independently tested by a third-party analytical laboratory using HPLC-UV and mass spectrometry. Batch-specific certificates of analysis are published and available on request." },
  { q: "How fast do you ship?", a: "Orders placed before 1:00 PM PT on a business day are typically processed and shipped the same day. Most domestic orders arrive within 2–4 business days via tracked carriers." },
  { q: "How should I store More Life Peptides upon arrival?", a: "Lyophilized peptides should be stored refrigerated (2–8°C) for short-term use, or frozen (-20°C or below) for long-term storage. Once reconstituted, store refrigerated and use within the recommended window for the specific compound." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-[hsl(221,83%,53%)]">FAQ</span>
          <h2 className="text-[36px] md:text-[44px] font-extrabold text-[#0A1628] mt-2 tracking-tight">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={f.q} className="bg-white border border-slate-200 rounded-lg overflow-hidden" data-testid={`faq-${i}`}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                data-testid={`button-faq-${i}`}
              >
                <span className="font-bold text-[15px] text-[#0A1628]">{f.q}</span>
                <ChevronDown className={`w-5 h-5 text-[hsl(221,83%,53%)] transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-[14px] text-slate-700 leading-relaxed">{f.a}</div>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-[14px] text-slate-600 mt-10">
          Want to learn more? Explore our full FAQ →{" "}
          <a href="#" className="font-bold text-[hsl(221,83%,53%)] hover:underline">Click Here</a>
        </p>
      </div>
    </section>
  );
}

function FeaturedSpecSheets() {
  return (
    <section className="py-24 bg-white border-y border-slate-100" data-testid="section-featured-specs">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[12px] font-bold tracking-[0.2em] text-[hsl(221,83%,53%)] uppercase">Featured Products</p>
          <h2 className="text-[36px] md:text-[44px] font-extrabold text-[#0A1628] mt-2 tracking-tight">
            Spec Sheets & Lab-Verified Lots
          </h2>
          <p className="text-[15px] text-slate-600 mt-4 max-w-2xl mx-auto">
            Every batch is third-party tested by HPLC. Browse our latest research-grade releases.
          </p>
        </div>

        <div className="mb-12 rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-br from-[#F8FAFC] to-white shadow-sm" data-testid="img-two-vials">
          <img src={twoVials} alt="More Life Peptides RETA and Wolverine Blend vials side by side" className="w-full h-auto" loading="lazy" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow" data-testid="card-spec-reta">
            <img src={specReta} alt="More Life Peptides RETA 30MG spec sheet" className="w-full h-auto block" loading="lazy" />
            <div className="p-6 flex items-center justify-between">
              <div>
                <p className="text-[12px] font-bold tracking-[0.18em] text-[hsl(221,83%,53%)] uppercase">Featured</p>
                <h3 className="text-[20px] font-extrabold text-[#0A1628] mt-1">RETA 30 MG</h3>
                <p className="text-[13px] text-slate-600 mt-1">Lyophilized sodium powder · ≥99% HPLC</p>
              </div>
              <a href="https://more-life-peptides.com/products/Bacteriostatic-Water-comes-with-FREE-30mg-USP-p839964180" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-[hsl(221,83%,53%)] text-white text-[13px] font-bold hover:bg-[hsl(221,83%,47%)] transition-colors" data-testid="link-shop-reta">
                Buy →
              </a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow" data-testid="card-spec-wolverine">
            <img src={specWolverine} alt="More Life Peptides Wolverine Blend spec sheet" className="w-full h-auto block" loading="lazy" />
            <div className="p-6 flex items-center justify-between">
              <div>
                <p className="text-[12px] font-bold tracking-[0.18em] text-[hsl(221,83%,53%)] uppercase">Featured Blend</p>
                <h3 className="text-[20px] font-extrabold text-[#0A1628] mt-1">Wolverine Blend</h3>
                <p className="text-[13px] text-slate-600 mt-1">BPC-157 10mg + TB-500 10mg · ≥99% HPLC</p>
              </div>
              <span className="px-4 py-2 rounded-lg bg-slate-100 text-slate-500 text-[13px] font-bold cursor-not-allowed" data-testid="link-shop-wolverine">
                Sold Out
              </span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow" data-testid="card-spec-ghkcu">
            <img src={specGhkcu} alt="More Life Peptides GHK-Cu 50MG spec sheet" className="w-full h-auto block" loading="lazy" />
            <div className="p-6 flex items-center justify-between">
              <div>
                <p className="text-[12px] font-bold tracking-[0.18em] text-[hsl(221,83%,53%)] uppercase">Copper Peptide</p>
                <h3 className="text-[20px] font-extrabold text-[#0A1628] mt-1">GHK-Cu 50 MG</h3>
                <p className="text-[13px] text-slate-600 mt-1">Copper tripeptide-1 · ≥99% HPLC</p>
              </div>
              <a href="https://more-life-peptides.com/products/Bacteriostatic-Water-comes-with-FREE-30mg-USP-p839964180" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-[hsl(221,83%,53%)] text-white text-[13px] font-bold hover:bg-[hsl(221,83%,47%)] transition-colors" data-testid="link-shop-ghkcu">
                Buy →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <TrustBanner />
      <ValueProps />
      <LaunchLineup />
      <FeaturedSpecSheets />
      <ManufacturingSection />
      <QualityVerification />
      <WhyChooseUs />
      <FAQ />
    </PageShell>
  );
}
