import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useMotion";

gsap.registerPlugin(ScrollTrigger);

export function Featured() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { scale: 1.12 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      gsap.fromTo(
        metaRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 45%", end: "top 15%", scrub: true },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-[#191613] py-24 text-[#faf6f3] md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-10 flex items-center justify-between">
          <p data-reveal className="text-[10px] font-bold tracking-[0.34em] text-[#bc773f]">FEATURED PROJECT — 01</p>
          <p data-reveal className="hidden text-[10px] font-semibold tracking-[0.3em] text-[#faf6f3]/40 md:block">
            ACTUAL COMPANY PROJECT PHOTOGRAPHY
          </p>
        </div>

        <div ref={metaRef} className="relative z-10 mb-[-8vw] grid gap-6 md:mb-[-72px] md:grid-cols-12">
          <h2 className="font-display text-[11vw] leading-[0.95] text-[#faf6f3] mix-blend-difference md:col-span-8 md:text-[86px]">
            THE MARBLE<br />WALK-IN.
          </h2>
          <dl className="flex gap-10 self-end md:col-span-4 md:justify-end md:gap-12">
            <div>
              <dt className="text-[9px] font-bold tracking-[0.28em] text-[#8a837c]">SERVICE</dt>
              <dd className="font-display mt-1 text-lg text-[#dec9b8]">Bathroom Remodeling</dd>
            </div>
            <div>
              <dt className="text-[9px] font-bold tracking-[0.28em] text-[#8a837c]">REGION</dt>
              <dd className="font-display mt-1 text-lg text-[#dec9b8]">Southern California</dd>
            </div>
          </dl>
        </div>

        <div ref={imgRef} className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] md:aspect-[21/9]" data-cursor="VIEW">
          <img
            src="/media/shower-wide.jpg"
            alt="Finished walk-in shower — frameless glass, marble-look tile"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <p data-reveal className="max-w-xl text-sm leading-relaxed text-[#faf6f3]/65 md:col-span-6 md:text-[15px]">
            A dated enclosure became a frameless glass walk-in: large-format marble-look tile, a herringbone mosaic
            floor underfoot, brushed brass fixtures and a built-in bench — finished with precision and care.
          </p>
          <div data-reveal className="md:col-span-6">
            <div className="mask-reveal aspect-[16/9] overflow-hidden" data-cursor="VIEW">
              <img
                src="/media/shower-detail.jpg"
                alt="Detail of marble-look shower tile and herringbone floor"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-3 text-[9px] font-semibold tracking-[0.3em] text-[#8a837c]">DETAIL — TILE &amp; FLOOR, COMPANY PROJECT</p>
          </div>
        </div>
      </div>
    </section>
  );
}
