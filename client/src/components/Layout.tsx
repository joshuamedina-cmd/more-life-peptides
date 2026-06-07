import { Link } from "wouter";
import { ReactNode, useState } from "react";
import { Logo } from "./Logo";
import {
  Search, ShoppingCart, ChevronDown, Menu, X, Facebook, Twitter,
  CheckCircle2, FileCheck, FlaskConical, ShieldCheck, Truck,
  CreditCard, Mail
} from "lucide-react";

function AnnouncementBar() {
  return (
    <div className="w-full text-white text-[12px] font-medium" data-testid="announcement-bar">
      <div className="bg-[#0A1628] py-2 text-center tracking-[0.18em]" data-testid="text-tagline">
        <span className="opacity-95 font-semibold">BETTER CHEMISTRY.</span>
        <span className="mx-2 opacity-40">•</span>
        <span className="opacity-95 font-semibold">BETTER DAYS.</span>
        <span className="mx-2 opacity-40">•</span>
        <span className="opacity-95 font-semibold text-[hsl(221,83%,68%)]">MORE LIFE.</span>
      </div>
      <div className="bg-[#111827] py-2 text-center text-[11px]">
        <span className="opacity-90">👉 JOIN OUR RESEARCHER COMMUNITY — Fast Answers · Order Help · Shipping Updates</span>
      </div>
    </div>
  );
}

function TopUtility() {
  return (
    <div className="hidden md:block border-b border-slate-200 bg-white text-[11px] text-slate-600">
      <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-[hsl(221,83%,53%)]" data-testid="link-facebook">
            <Facebook className="w-3.5 h-3.5" />
          </a>
          <a href="#" className="hover:text-[hsl(221,83%,53%)]" data-testid="link-twitter">
            <Twitter className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-[hsl(221,83%,53%)]" data-testid="link-track-order">Track Your Order</a>
          <a href="#" className="hover:text-[hsl(221,83%,53%)]" data-testid="link-account">My Account</a>
        </div>
      </div>
    </div>
  );
}

export function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-[0_1px_0_0_rgba(15,23,42,0.04)]">
      <AnnouncementBar />
      <TopUtility />
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link href="/" data-testid="link-home-logo" className="flex items-center">
          <Logo variant="horizontal" height={44} />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-[14px] font-semibold text-slate-800">
          <Link href="/" className="hover:text-[hsl(221,83%,53%)] transition-colors" data-testid="link-nav-home">Home</Link>
          <Link href="/buy/reta" className="hover:text-[hsl(221,83%,53%)] transition-colors" data-testid="link-nav-shop">Shop Peptides</Link>
          <Link href="/about" className="hover:text-[hsl(221,83%,53%)] transition-colors" data-testid="link-nav-about">About Us</Link>
          <Link href="/lab-referral" className="hover:text-[hsl(221,83%,53%)] transition-colors" data-testid="link-nav-lab">Lab Referral Program</Link>
          <button className="flex items-center gap-1 hover:text-[hsl(221,83%,53%)] transition-colors" data-testid="button-nav-more">
            More <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-slate-700 hover:text-[hsl(221,83%,53%)]" data-testid="button-search">
            <Search className="w-5 h-5" />
          </button>
          <button className="relative text-slate-700 hover:text-[hsl(221,83%,53%)]" data-testid="button-cart">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-2 bg-[hsl(221,83%,53%)] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </button>
          <button className="lg:hidden text-slate-700" onClick={() => setOpen(!open)} data-testid="button-menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-3 text-sm font-semibold">
          <Link href="/" className="block py-1" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/buy/reta" className="block py-1" onClick={() => setOpen(false)}>Shop Peptides</Link>
          <Link href="/about" className="block py-1" onClick={() => setOpen(false)}>About Us</Link>
          <Link href="/lab-referral" className="block py-1" onClick={() => setOpen(false)}>Lab Referral Program</Link>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#F8FAFC] border-t border-slate-200 mt-24" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <Logo variant="horizontal" height={42} />
          <p className="text-[13px] text-slate-600 mt-4 leading-relaxed">
            High purity research peptides. Tested. Trusted. Manufactured in
            U.S.-based laboratory facilities and independently verified for purity
            and content.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <a href="#" className="text-slate-500 hover:text-[hsl(221,83%,53%)]"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="text-slate-500 hover:text-[hsl(221,83%,53%)]"><Twitter className="w-4 h-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="text-[13px] font-bold text-slate-900 mb-4 tracking-wide uppercase">Help & Support</h4>
          <ul className="space-y-2.5 text-[13px] text-slate-600">
            <li><a href="#" className="hover:text-[hsl(221,83%,53%)]">Contact Us</a></li>
            <li><a href="#" className="hover:text-[hsl(221,83%,53%)]">Lab Testing</a></li>
            <li><a href="#" className="hover:text-[hsl(221,83%,53%)]">Disclaimer</a></li>
            <li><a href="#" className="hover:text-[hsl(221,83%,53%)]">Research Use Only Policy</a></li>
            <li><a href="#" className="hover:text-[hsl(221,83%,53%)]">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-[hsl(221,83%,53%)]">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[hsl(221,83%,53%)]">Refund & Returns Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[13px] font-bold text-slate-900 mb-4 tracking-wide uppercase">Quick Links</h4>
          <ul className="space-y-2.5 text-[13px] text-slate-600">
            <li><Link href="/lab-referral" className="hover:text-[hsl(221,83%,53%)]">Lab Referral Program</Link></li>
            <li><Link href="/buy/reta" className="hover:text-[hsl(221,83%,53%)]">Shop Peptides</Link></li>
            <li><a href="#" className="hover:text-[hsl(221,83%,53%)]">Track Order</a></li>
            <li><a href="#" className="hover:text-[hsl(221,83%,53%)]">My Account</a></li>
            <li><a href="#" className="hover:text-[hsl(221,83%,53%)]">COAs</a></li>
            <li><a href="#" className="hover:text-[hsl(221,83%,53%)]">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[13px] font-bold text-slate-900 mb-4 tracking-wide uppercase">Newsletter</h4>
          <p className="text-[13px] text-slate-600 mb-3">Subscribe for research updates, new arrivals, and lab insights.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-1">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                placeholder="Your email"
                className="w-full pl-9 pr-3 py-2.5 text-[13px] border border-slate-300 rounded-md bg-white focus:outline-none focus:border-[hsl(221,83%,53%)]"
                data-testid="input-newsletter-email"
              />
            </div>
            <button className="bg-[hsl(221,83%,53%)] hover:bg-[hsl(224,76%,48%)] text-white text-[12px] font-bold px-4 rounded-md transition-colors" data-testid="button-newsletter-subscribe">
              JOIN
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-[11px] text-slate-500 space-y-1.5">
          <p>© 2026 More Life Peptides. All Rights Reserved.</p>
          <p className="max-w-4xl mx-auto leading-relaxed">
            All products listed on this site are intended strictly for <strong>in vitro research and laboratory use only</strong>. Not for human or veterinary use, diagnostic, or therapeutic purposes.
          </p>
          <p className="max-w-4xl mx-auto leading-relaxed">
            Statements on this site have not been evaluated by the FDA. More Life Peptides is not a compounding pharmacy or chemical compounding facility as defined under 503A of the Federal Drug & Cosmetic Act.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
      <NavBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

// Exported small icon helpers used on pages
export { CheckCircle2, FileCheck, FlaskConical, ShieldCheck, Truck, CreditCard };
