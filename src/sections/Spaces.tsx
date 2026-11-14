import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useMotion";

gsap.registerPlugin(ScrollTrigger);

const SPACES = [
  { name: "KITCHEN", img: "/media/hero-poster.jpg", note: "The heart of the home — rebuilt around how you live." },
  { name: "BATHROOM", img: "/media/shower-wide.jpg", note: "Stone, glass and light — a daily ritual, elevated." },
  { name: "INTERIOR", img: "/media/svc-interior.jpg", note: "Millwork, flooring and finishes in quiet harmony." },
  { name: "EXTERIOR", img: "/media/svc-exterior.jpg", note: "Curb appeal and outdoor rooms for California evenings." },
  { name: "FULL HOME", img: "/media/slide-living.jpg", note: "One vision, carried through every room." },
];

export function Spaces() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          const idx = Math.min(SPACES.length - 1, Math.floor(p * SPACES.length));
          setActive((prev) => (prev === idx ? prev : idx));
          const stage = stageRef.current;
          if (stage) {
            const local = (p * SPACES.length) % 1;
            stage.style.transform = `perspective(1100px) rotateY(${(local - 0.5) * 12}deg) scale(${0.94 + local * 0.08})`;
          }
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  const space = SPACES[active];

  return (
    <section ref={rootRef} className="relative bg-[#141210]" style={{ height: reduced ? "auto" : "520vh" }}>
      <div className={`${reduced ? "" : "sticky top-0"} flex h-[100svh] items-center overflow-hidden`}>
        {/* ambient tint */}
        <div
          className="absolute inset-0 transition-[background] duration-1000"
          style={{
            background: `radial-gradient(90% 70% at ${30 + active * 10}% 50%, rgba(188,119,63,0.10), transparent 60%), #141210`,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-10 px-5 md:px-10 lg:grid-cols-12">
          {/* word */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <p className="mb-6 flex items-center gap-4 text-[10px] font-bold tracking-[0.34em] text-[#bc773f]">
              <span className="inline-block h-px w-10 bg-[#bc773f]" /> SPACES WE TRANSFORM
            </p>
            <div className="relative h-[88px] overflow-hidden md:h-[130px]">
              {SPACES.map((s, i) => (
                <h3
                  key={s.name}
                  className={`font-display absolute inset-0 text-[13vw] leading-none text-[#faf6f3] transition-all duration-700 sm:text-7xl lg:text-[86px] ${
                    i === active ? "translate-y-0 opacity-100" : i < active ? "-translate-y-full opacity-0" : "translate-y-full opacity-0"
                  }`}
                  aria-hidden={i !== active}
                >
                  {s.name}
                </h3>
              ))}
            </div>
            <p key={active} className="mt-5 max-w-sm text-sm leading-relaxed text-[#faf6f3]/60 md:text-base">
              {space.note}
            </p>
            <p className="font-display mt-8 text-sm tracking-[0.3em] text-[#8a837c]">
              {String(active + 1).padStart(2, "0")} / {String(SPACES.length).padStart(2, "0")}
            </p>
          </div>

          {/* 3D stage */}
          <div className="order-1 lg:order-2 lg:col-span-7" style={{ perspective: "1100px" }}>
            <div
              ref={stageRef}
              className="relative mx-auto aspect-[4/3] w-full max-w-[760px] will-change-transform md:aspect-[16/10]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {SPACES.map((s, i) => (
                <div
                  key={s.name}
                  className="absolute inset-0 overflow-hidden transition-opacity duration-[900ms]"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform: `translateZ(${(i - active) * 40}px)`,
                    boxShadow: i === active ? "0 40px 90px -30px rgba(0,0,0,0.7)" : "none",
                  }}
                >
                  <img
                    src={s.img}
                    alt={`${s.name.toLowerCase()} remodeling`}
                    loading={i < 2 ? "eager" : "lazy"}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/45 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-5 text-[9px] font-bold tracking-[0.3em] text-[#faf6f3]/85">
                    {s.name} — {i === 1 ? "COMPANY PROJECT" : "DESIGN DIRECTION"}
                  </span>
                </div>
              ))}
              {/* architectural frame lines */}
              <div className="pointer-events-none absolute -inset-4 border border-[#dec9b8]/15" aria-hidden="true" />
              <div className="pointer-events-none absolute -right-4 -top-4 h-10 w-10 border-r border-t border-[#bc773f]/60" aria-hidden="true" />
              <div className="pointer-events-none absolute -bottom-4 -left-4 h-10 w-10 border-b border-l border-[#bc773f]/60" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* progress ticks */}
        <div className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:right-10 lg:flex" aria-hidden="true">
          {SPACES.map((s, i) => (
            <div
              key={s.name}
              className={`w-[2px] transition-all duration-500 ${i === active ? "h-10 bg-[#bc773f]" : "h-4 bg-[#faf6f3]/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
