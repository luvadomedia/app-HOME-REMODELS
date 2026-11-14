import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { trpc } from "@/providers/trpc";
import { toast } from "@/lib/bus";

const PROJECT_TYPES = [
  "Kitchen remodel",
  "Bathroom remodel",
  "Full home remodel",
  "Interior renovation",
  "Exterior / outdoor living",
  "Something else",
];

const SCOPES = [
  "Single room",
  "A few rooms",
  "Whole home",
  "Not sure yet",
];

const CONTACT_METHODS = ["Text", "Call", "Email"];

interface Fields {
  name: string;
  phone: string;
  email: string;
  city: string;
  projectType: string;
  scope: string;
  contactMethod: string;
  message: string;
}

const EMPTY: Fields = { name: "", phone: "", email: "", city: "", projectType: "", scope: "", contactMethod: "Text", message: "" };

const inputCls =
  "w-full border-b border-[#faf6f3]/25 bg-transparent py-3 text-[15px] text-[#faf6f3] placeholder:text-[#faf6f3]/35 focus:border-[#bc773f] focus:outline-none transition-colors";

export function Contact() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [done, setDone] = useState(false);
  const submit = trpc.leads.submit.useMutation();

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  const validate = (): boolean => {
    const errs: typeof errors = {};
    if (!f.name.trim()) errs.name = "Please enter your name.";
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errs.email = "Please enter a valid email address.";
    if (!f.phone.trim() && !f.email.trim()) errs.phone = "Please leave a phone number or email so we can reach you.";
    if (f.phone && !/^[+\d\s()-.]{7,}$/.test(f.phone)) errs.phone = "Please enter a valid phone number.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await submit.mutateAsync({ ...f, source: "website-form" });
      setDone(true);
      setF(EMPTY);
      toast("success", "Thank you — your project inquiry was sent. We'll be in touch personally.");
    } catch {
      toast("error", "Something went wrong sending your inquiry. Please try again in a moment.");
    }
  };

  return (
    <section id="contact" className="relative bg-[#191613] py-28 text-[#faf6f3] md:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p data-reveal className="mb-6 flex items-center gap-4 text-[10px] font-bold tracking-[0.34em] text-[#bc773f]">
            <span className="inline-block h-px w-10 bg-[#bc773f]" /> START HERE
          </p>
          <h2 data-reveal className="font-display text-5xl leading-[1.02] md:text-[64px]">
            LET'S BUILD<br />SOMETHING<br /><span className="text-[#bc773f]">BEAUTIFUL.</span>
          </h2>
          <p data-reveal className="mt-7 max-w-md text-sm leading-relaxed text-[#faf6f3]/60 md:text-[15px]">
            Tell us what you're envisioning — the room, the feeling, the problem you want gone. We'll respond personally
            and talk through what's possible.
          </p>
          <p data-reveal className="mt-8 text-[10px] font-semibold tracking-[0.3em] text-[#faf6f3]/40">
            SERVING INLAND EMPIRE • LOS ANGELES • HIGH DESERT
          </p>
        </div>

        <div className="lg:col-span-7" data-reveal>
          {done ? (
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center border border-[#bc773f]/40 bg-[#221e1a] p-10 text-center">
              <CheckCircle2 className="mb-6 h-12 w-12 text-[#bc773f]" />
              <h3 className="font-display text-4xl">REQUEST RECEIVED.</h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#faf6f3]/65">
                Thank you for reaching out. A member of the Home Remodels team will review your project and respond personally.
              </p>
              <button
                onClick={() => setDone(false)}
                className="u-btn mt-8 text-[11px] font-bold tracking-[0.24em] text-[#dec9b8]"
              >
                SEND ANOTHER INQUIRY
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className="mb-1 block text-[10px] font-bold tracking-[0.26em] text-[#faf6f3]/55">NAME *</label>
                <input id="c-name" className={inputCls} value={f.name} onChange={set("name")} autoComplete="name" placeholder="Your name" />
                {errors.name && <p className="mt-2 text-xs text-[#e2a47a]">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="c-city" className="mb-1 block text-[10px] font-bold tracking-[0.26em] text-[#faf6f3]/55">CITY</label>
                <input id="c-city" className={inputCls} value={f.city} onChange={set("city")} autoComplete="address-level2" placeholder="Where's the project?" />
              </div>
              <div>
                <label htmlFor="c-phone" className="mb-1 block text-[10px] font-bold tracking-[0.26em] text-[#faf6f3]/55">PHONE</label>
                <input id="c-phone" type="tel" className={inputCls} value={f.phone} onChange={set("phone")} autoComplete="tel" placeholder="(___) ___-____" />
                {errors.phone && <p className="mt-2 text-xs text-[#e2a47a]">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="c-email" className="mb-1 block text-[10px] font-bold tracking-[0.26em] text-[#faf6f3]/55">EMAIL</label>
                <input id="c-email" type="email" className={inputCls} value={f.email} onChange={set("email")} autoComplete="email" placeholder="you@email.com" />
                {errors.email && <p className="mt-2 text-xs text-[#e2a47a]">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="c-type" className="mb-1 block text-[10px] font-bold tracking-[0.26em] text-[#faf6f3]/55">PROJECT TYPE</label>
                <select id="c-type" className={`${inputCls} cursor-pointer`} value={f.projectType} onChange={set("projectType")}>
                  <option value="" className="bg-[#191613]">Select…</option>
                  {PROJECT_TYPES.map((t) => <option key={t} value={t} className="bg-[#191613]">{t}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="c-scope" className="mb-1 block text-[10px] font-bold tracking-[0.26em] text-[#faf6f3]/55">ESTIMATED SCOPE</label>
                <select id="c-scope" className={`${inputCls} cursor-pointer`} value={f.scope} onChange={set("scope")}>
                  <option value="" className="bg-[#191613]">Select…</option>
                  {SCOPES.map((t) => <option key={t} value={t} className="bg-[#191613]">{t}</option>)}
                </select>
              </div>
              <fieldset className="sm:col-span-2">
                <legend className="mb-3 text-[10px] font-bold tracking-[0.26em] text-[#faf6f3]/55">PREFERRED CONTACT METHOD</legend>
                <div className="flex gap-2">
                  {CONTACT_METHODS.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setF((p) => ({ ...p, contactMethod: m }))}
                      aria-pressed={f.contactMethod === m}
                      className={`border px-5 py-2.5 text-[11px] font-bold tracking-[0.18em] transition-colors ${
                        f.contactMethod === m ? "border-[#bc773f] bg-[#bc773f] text-[#faf6f3]" : "border-[#faf6f3]/25 text-[#faf6f3]/65 hover:border-[#dec9b8]"
                      }`}
                    >
                      {m.toUpperCase()}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="sm:col-span-2">
                <label htmlFor="c-msg" className="mb-1 block text-[10px] font-bold tracking-[0.26em] text-[#faf6f3]/55">MESSAGE</label>
                <textarea
                  id="c-msg"
                  rows={4}
                  className={`${inputCls} resize-none`}
                  value={f.message}
                  onChange={set("message")}
                  placeholder="Tell us about your project — the space, the goal, the timeline you're hoping for."
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={submit.isPending}
                  data-cursor=""
                  className="arrow-btn group flex w-full items-center justify-center gap-3 bg-[#bc773f] px-8 py-5 text-[12px] font-bold tracking-[0.24em] text-[#faf6f3] transition-colors hover:bg-[#9d5f30] disabled:opacity-60 sm:w-auto"
                >
                  {submit.isPending ? "SENDING…" : "START MY PROJECT"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
