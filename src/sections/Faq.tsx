import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQS } from "@/config/site";
import { scrollToId } from "@/lib/lenis";

export function Faq() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="bg-[#faf6f3] py-28 md:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p data-reveal className="mb-6 flex items-center gap-4 text-[10px] font-bold tracking-[0.34em] text-[#bc773f]">
              <span className="inline-block h-px w-10 bg-[#bc773f]" /> QUESTIONS
            </p>
            <h2 data-reveal className="font-display text-5xl leading-[1.02] text-[#262220] md:text-6xl">
              BEFORE YOU<br /><span className="text-[#bc773f]">ASK.</span>
            </h2>
            <p data-reveal className="mt-7 max-w-xs text-sm leading-relaxed text-[#3c3835]/75">
              The honest answers homeowners ask us most. Something else on your mind?{" "}
              <button onClick={() => scrollToId("contact")} className="u-btn font-semibold text-[#bc773f]">
                Ask us directly.
              </button>
            </p>
          </div>
        </div>

        <div className="lg:col-span-8">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} data-reveal className="border-b border-[#3c3835]/15 first:border-t">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className={`font-display text-xl transition-colors md:text-2xl ${isOpen ? "text-[#bc773f]" : "text-[#262220] group-hover:text-[#bc773f]"}`}>
                    {f.q}
                  </span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-300 ${
                      isOpen ? "rotate-45 border-[#bc773f] bg-[#bc773f] text-[#faf6f3]" : "border-[#3c3835]/25 text-[#3c3835]"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 text-sm leading-relaxed text-[#3c3835]/85 md:text-[15px]">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
