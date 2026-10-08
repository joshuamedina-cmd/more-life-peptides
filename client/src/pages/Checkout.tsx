import { useState } from "react";
import { Link, useLocation } from "wouter";
import { PageShell } from "@/components/Layout";
import { useCart, findById, formatUsd } from "@/lib/cart";
import { ArrowRight, Loader2, AlertCircle, ShieldCheck } from "lucide-react";

export default function Checkout() {
  const { lines, subtotalCents, shippingCents, totalCents, clear } = useCart();
  const [, navigate] = useLocation();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });
  const [ageOk, setAgeOk] = useState(false);
  const [researchOk, setResearchOk] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (lines.length === 0) {
    return (
      <PageShell>
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h1 className="text-[28px] font-extrabold text-[#0A1628]">Your cart is empty.</h1>
          <Link href="/catalog" className="mt-6 inline-block text-[hsl(221,83%,53%)] font-bold hover:underline" data-testid="link-back-catalog">
            ← Back to catalog
          </Link>
        </div>
      </PageShell>
    );
  }

  const requiredFields = ["firstName", "lastName", "email", "addressLine1", "city", "state", "zip"] as const;
  const missingFields = requiredFields.filter((k) => !form[k].trim());
  const canSubmit = missingFields.length === 0 && ageOk && researchOk && !submitting;

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [k]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email.trim().toLowerCase(),
            phone: form.phone,
            address: {
              addressLine1: form.addressLine1,
              addressLine2: form.addressLine2,
              city: form.city,
              state: form.state,
              zip: form.zip,
              country: form.country,
            },
          },
          lines: lines.map((l) => ({ id: l.id, qty: l.qty })),
          ageVerified: ageOk,
          researchUseAccepted: researchOk,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);
      const { invoiceNumber } = data;
      clear();
      const params = new URLSearchParams({ invoice: String(invoiceNumber || "") });
      navigate(`/order-confirmation?${params.toString()}`);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <PageShell>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-[12px] text-slate-500 mb-3" data-testid="breadcrumb-checkout">
          <Link href="/" className="hover:text-[hsl(221,83%,53%)]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/cart" className="hover:text-[hsl(221,83%,53%)]">Cart</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900 font-semibold">Checkout</span>
        </div>

        <h1 className="text-[36px] font-extrabold text-[#0A1628] mb-8">Checkout</h1>

        <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Contact */}
            <section className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-[15px] font-bold text-[#0A1628] mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="First name" required>
                  <input type="text" required value={form.firstName} onChange={onChange("firstName")} className={inputCls} data-testid="input-first-name" />
                </Field>
                <Field label="Last name" required>
                  <input type="text" required value={form.lastName} onChange={onChange("lastName")} className={inputCls} data-testid="input-last-name" />
                </Field>
                <Field label="Email" required>
                  <input type="email" required value={form.email} onChange={onChange("email")} className={inputCls} data-testid="input-email" />
                </Field>
                <Field label="Phone" hint="(optional)">
                  <input type="tel" value={form.phone} onChange={onChange("phone")} className={inputCls} data-testid="input-phone" />
                </Field>
              </div>
            </section>

            {/* Shipping */}
            <section className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-[15px] font-bold text-[#0A1628] mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
                <Field label="Address line 1" className="sm:col-span-6" required>
                  <input type="text" required value={form.addressLine1} onChange={onChange("addressLine1")} className={inputCls} data-testid="input-address1" />
                </Field>
                <Field label="Apt, suite, etc." className="sm:col-span-6" hint="(optional)">
                  <input type="text" value={form.addressLine2} onChange={onChange("addressLine2")} className={inputCls} data-testid="input-address2" />
                </Field>
                <Field label="City" className="sm:col-span-3" required>
                  <input type="text" required value={form.city} onChange={onChange("city")} className={inputCls} data-testid="input-city" />
                </Field>
                <Field label="State" className="sm:col-span-2" required>
                  <input type="text" required maxLength={2} value={form.state} onChange={onChange("state")} className={inputCls + " uppercase"} placeholder="CA" data-testid="input-state" />
                </Field>
                <Field label="ZIP" className="sm:col-span-1" required>
                  <input type="text" required value={form.zip} onChange={onChange("zip")} className={inputCls} data-testid="input-zip" />
                </Field>
              </div>
            </section>

            {/* Gates */}
            <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h2 className="text-[15px] font-bold text-amber-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Required Acknowledgments
              </h2>
              <label className="flex items-start gap-3 cursor-pointer" data-testid="label-age">
                <input type="checkbox" checked={ageOk} onChange={(e) => setAgeOk(e.target.checked)} className="mt-1 w-4 h-4" required data-testid="checkbox-age" />
                <span className="text-[13px] text-slate-800">
                  I confirm that I am <strong>21 years of age or older</strong>.
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer mt-3" data-testid="label-research">
                <input type="checkbox" checked={researchOk} onChange={(e) => setResearchOk(e.target.checked)} className="mt-1 w-4 h-4" required data-testid="checkbox-research" />
                <span className="text-[13px] text-slate-800">
                  I understand these products are strictly for <strong>research use only</strong> — not for human or veterinary use, and not for diagnostic or therapeutic purposes.
                </span>
              </label>
            </section>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3" data-testid="error-box">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-[13px] text-red-900">
                  <p className="font-bold">Could not create invoice</p>
                  <p className="mt-1">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 sticky top-24">
              <h2 className="text-[15px] font-bold text-[#0A1628] mb-4">Order Summary</h2>

              <div className="space-y-2 border-b border-slate-100 pb-4 text-[13px]">
                {lines.map((line) => {
                  const item = findById(line.id);
                  if (!item) return null;
                  return (
                    <div key={line.id} className="flex justify-between" data-testid={`summary-line-${line.id}`}>
                      <div>
                        <span className="font-mono font-bold text-slate-500">{item.id}</span>
                        <span className="text-slate-700 ml-2">× {line.qty}</span>
                      </div>
                      <span className="font-bold text-[#0A1628]">{formatUsd(item.priceCents * line.qty)}</span>
                    </div>
                  );
                })}
              </div>

              <dl className="space-y-2 mt-4 text-[13px]">
                <div className="flex justify-between">
                  <dt className="text-slate-600">Subtotal</dt>
                  <dd className="font-bold text-[#0A1628]" data-testid="summary-subtotal">{formatUsd(subtotalCents)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-600">Shipping</dt>
                  <dd className="font-bold text-[#0A1628]" data-testid="summary-shipping">{formatUsd(shippingCents)}</dd>
                </div>
                <div className="border-t border-slate-200 pt-3 mt-3 flex justify-between text-[16px]">
                  <dt className="font-bold text-[#0A1628]">Total</dt>
                  <dd className="font-extrabold text-[#0A1628]" data-testid="summary-total">{formatUsd(totalCents)}</dd>
                </div>
              </dl>

              <button
                type="submit"
                disabled={!canSubmit}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[hsl(221,83%,53%)] hover:bg-[hsl(221,83%,47%)] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-[14px] font-bold transition-colors"
                data-testid="button-place-order"
              >
                {submitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Creating invoice…</>
                ) : (
                  <>Get Square Invoice <ArrowRight className="w-4 h-4" /></>
                )}
              </button>

              {!canSubmit && !submitting && (
                <p className="text-[11px] text-slate-500 mt-3 text-center">
                  {missingFields.length > 0
                    ? "Fill in all required fields to continue."
                    : "Check both acknowledgments to continue."}
                </p>
              )}

              <p className="text-[11px] text-slate-500 mt-4 text-center leading-relaxed">
                Square will email you a secure payment link. Your order is not confirmed until the invoice is paid.
              </p>
            </div>
          </div>
        </form>
      </div>
    </PageShell>
  );
}

const inputCls = "w-full px-3 py-2.5 text-[14px] border border-slate-300 rounded-md bg-white focus:outline-none focus:border-[hsl(221,83%,53%)]";

function Field({
  label, required, hint, className, children,
}: { label: string; required?: boolean; hint?: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={`block ${className || ""}`}>
      <span className="block text-[11px] font-bold uppercase tracking-wide text-slate-600 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
        {hint && <span className="ml-1 font-normal normal-case text-slate-400 tracking-normal">{hint}</span>}
      </span>
      {children}
    </label>
  );
}
