import { PageShell } from "@/components/Layout";
import { Microscope, Award, FlaskConical, HeartHandshake } from "lucide-react";

export default function About() {
  return (
    <PageShell>
      <div className="bg-gradient-to-br from-[#E8F0F8] to-[#F0F5FA] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-[hsl(221,83%,53%)]">About Us</span>
          <h1 className="text-[44px] md:text-[56px] font-extrabold text-[#0A1628] tracking-tight mt-3 leading-tight">
            Built by researchers,<br />for researchers.
          </h1>
          <p className="mt-6 text-[17px] text-slate-700 leading-relaxed max-w-2xl mx-auto">
            More Life Peptides was founded on a simple idea: research peptides should be high purity, third-party verified, and shipped from facilities that take quality seriously.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-10">
        <section>
          <h2 className="text-[28px] font-extrabold text-[#0A1628] tracking-tight mb-4">Our Mission</h2>
          <p className="text-[15px] text-slate-700 leading-relaxed">
            We exist to make high-quality research peptides accessible to qualified researchers in the United States. Every product is manufactured in domestic laboratory facilities, lyophilized for stability, and independently verified by third-party analytical labs before any vial leaves our facility.
          </p>
        </section>

        <section>
          <h2 className="text-[28px] font-extrabold text-[#0A1628] tracking-tight mb-4">Our Standards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { icon: Award, title: "99%+ Purity", body: "Every batch HPLC-tested. If a batch doesn't hit 99%, it doesn't ship." },
              { icon: FlaskConical, title: "Sterile Manufacturing", body: "Produced in certified U.S. laboratory facilities with documented procedures." },
              { icon: Microscope, title: "Third-Party Verification", body: "Independent labs test identity, purity, and content. COAs available for every batch." },
              { icon: HeartHandshake, title: "Real Support", body: "U.S.-based support team reachable seven days a week via chat, email, and phone." },
            ].map((it) => (
              <div key={it.title} className="border border-slate-200 rounded-lg p-5">
                <it.icon className="w-7 h-7 text-[hsl(221,83%,53%)] mb-3" />
                <h3 className="font-bold text-[15px] text-[#0A1628] mb-1.5">{it.title}</h3>
                <p className="text-[13px] text-slate-600 leading-relaxed">{it.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h3 className="text-[14px] font-bold text-amber-900 mb-2 uppercase tracking-wider">Research Use Only</h3>
          <p className="text-[14px] text-amber-900/90 leading-relaxed">
            All products sold by More Life Peptides are intended strictly for in vitro research and laboratory use. They are not for human or veterinary consumption, diagnostic, or therapeutic use. Customers must be qualified researchers or research institutions.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
