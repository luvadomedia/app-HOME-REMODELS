import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useMotion";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { n: "01", title: "DISCOVER", text: "We start by listening — your goals, your frustrations with the space, the way your household actually lives. Then we walk the project together." },
  { n: "02", title: "PLAN", text: "Direction, scope and details take shape: layout, materials, finishes and a realistic sequence of work — agreed before anything is demolished." },
  { n: "03", title: "BUILD", text: "Execution with care. Clean job sites, respectful crews and craftsmanship at every stage — from framing to tile to trim." },
  { n: "04", title: "REFINE", text: "Finishing details, final adjustments and a complete walkthrough. We don't call it done until it feels right to you." },
];

export function Process() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: { trigger: rootRef.current, start: "top 60%", end: "bottom 70%", scrub: true },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="process" ref={rootRef} className="bg-[#f5ece5] py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-16 text-center md:mb-24">
          <p data-reveal className="mb-6 inline-flex items-center gap-4 text-[10px] font-bold tracking-[0.34em] text-[#bc773f]">
            <span className="inline-block h-px w-10 bg-[#bc773f]" /> THE PROCESS <span className="inline-block h-px w-10 bg-[#bc773f]" />
          </p>
          <h2 data-reveal className="font-display text-5xl leading-none text-[#262220] md:text-7xl">
            FOUR PHASES.<br /><span className="text-[#bc773f]">NO SURPRISES.</span>
          </h2>
        </div>

        <div className="relative mx-auto max-w-3xl">
          {/* progress line */}
          <div className="absolute bottom-0 left-[19px] top-0 w-px bg-[#dec9b8]/60 md:left-1/2" aria-hidden="true" />
          <div ref={lineRef} className="absolute bottom-0 left-[19px] top-0 w-px bg-[#bc773f] md:left-1/2" aria-hidden="true" />

          {STEPS.map((s, i) => (
            <div
              key={s.n}
              data-reveal
              className={`relative flex gap-8 pb-16 last:pb-0 md:gap-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* node */}
              <div className="absolute left-[11px] top-1 z-10 flex h-[17px] w-[17px] items-center justify-center rounded-full border border-[#bc773f] bg-[#f5ece5] md:left-1/2 md:-translate-x-1/2">
                <div className="h-[7px] w-[7px] rounded-full bg-[#bc773f]" />
              </div>
              <div className={`w-full pl-14 md:w-1/2 md:pl-0 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                <span className="font-display text-sm tracking-[0.3em] text-[#bc773f]">{s.n}</span>
                <h3 className="font-display mt-2 text-4xl text-[#262220] md:text-5xl">{s.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#3c3835]/80">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
