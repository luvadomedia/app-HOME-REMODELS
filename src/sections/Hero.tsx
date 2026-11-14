import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowDown } from "lucide-react";
import { scrollToId } from "@/lib/lenis";
import { useReducedMotion } from "@/hooks/useMotion";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  { src: "/media/hero-poster.jpg", label: "KITCHEN" },
  { src: "/media/slide-bath.jpg", label: "BATHROOM" },
  { src: "/media/slide-living.jpg", label: "FULL HOME" },
];

export function Hero() {
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<"video" | "photos">("video");
  const [slide, setSlide] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  // photo slideshow
  useEffect(() => {
    if (mode !== "photos" || reduced) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [mode, reduced]);

  // scroll parallax + mouse light/tilt
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -110,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(mediaRef.current, {
        scale: 1.09,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      if (window.matchMedia("(pointer: fine)").matches) {
        const rx = gsap.quickTo(tiltRef.current, "rotationY", { duration: 0.9, ease: "power3.out" });
        const ry = gsap.quickTo(tiltRef.current, "rotationX", { duration: 0.9, ease: "power3.out" });
        const lx = gsap.quickTo(mediaRef.current, "--mx", { duration: 0.6, ease: "power2.out" });
        const ly = gsap.quickTo(mediaRef.current, "--my", { duration: 0.6, ease: "power2.out" });
        const onMove = (e: MouseEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          rx(nx * 4);
          ry(-ny * 3);
          lx(e.clientX);
          ly(e.clientY);
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} id="top" className="relative h-[100svh] min-h-[620px] overflow-hidden bg-[#191613]">
      {/* media layer */}
      <div
        ref={mediaRef}
        className="absolute inset-0 will-change-transform"
        style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%" }}
      >
        {/* video mode */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${mode === "video" ? "opacity-100" : "opacity-0"}`}>
          {reduced ? (
            <img src="/media/hero-poster.jpg" alt="Remodeled luxury kitchen with marble island" className="h-full w-full object-cover" />
          ) : (
            <video
              className="h-full w-full object-cover"
              src="/media/hero-loop.mp4"
              poster="/media/hero-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              aria-label="Cinematic tour of a remodeled luxury kitchen"
            />
          )}
        </div>
        {/* photo mode */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${mode === "photos" ? "opacity-100" : "opacity-0"}`}>
          {SLIDES.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={`${s.label.toLowerCase()} remodel photography`}
              loading={i === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ${
                i === slide ? "opacity-100 kenburns" : "opacity-0"
              }`}
            />
          ))}
        </div>
        {/* cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#191613]/70 via-[#191613]/35 to-[#191613]/85" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx) var(--my), rgba(222,201,184,0.14), transparent 65%)",
          }}
        />
        <div className="grain absolute inset-0" />
      </div>

      {/* content */}
      <div ref={contentRef} className="relative z-10 flex h-full flex-col justify-end pb-24 md:justify-center md:pb-0">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10" style={{ perspective: "900px" }}>
          <div ref={tiltRef} className="max-w-4xl will-change-transform">
            <p className="line-mask mb-5 text-[10px] font-semibold tracking-[0.34em] text-[#dec9b8] md:text-[11px]">
              <span style={{ animationDelay: "0.25s" }}>SERVING SOUTHERN CALIFORNIA — INLAND EMPIRE • LOS ANGELES • HIGH DESERT</span>
            </p>
            <h1 className="font-display text-[13.5vw] leading-[0.98] text-[#faf6f3] sm:text-6xl md:text-7xl lg:text-[86px]">
              <span className="line-mask"><span style={{ animationDelay: "0.4s" }}>BUILT TO TRANSFORM</span></span>
              <span className="line-mask"><span style={{ animationDelay: "0.55s" }}>THE WAY <em className="not-italic text-[#bc773f]">YOU</em> LIVE.</span></span>
            </h1>
            <p className="line-mask mt-6 max-w-xl text-[15px] leading-relaxed text-[#faf6f3]/80 md:text-lg">
              <span style={{ animationDelay: "0.75s" }}>
                Premium home remodeling throughout the Inland Empire, Los Angeles &amp; the High Desert — kitchens,
                bathrooms and whole-home transformations, finished with obsession.
              </span>
            </p>
            <div className="line-mask mt-9">
              <span style={{ animationDelay: "0.9s" }} className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => scrollToId("contact")}
                  data-cursor=""
                  className="arrow-btn group flex items-center gap-3 bg-[#bc773f] px-7 py-4 text-[11px] font-bold tracking-[0.22em] text-[#faf6f3] transition-colors hover:bg-[#9d5f30]"
                >
                  START YOUR PROJECT
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => scrollToId("work")}
                  className="u-btn px-1 py-4 text-[11px] font-bold tracking-[0.22em] text-[#faf6f3]/90"
                >
                  EXPLORE OUR WORK
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* bottom chrome */}
      <div className="absolute inset-x-0 bottom-0 z-20 hidden items-end justify-between px-10 pb-8 md:flex">
        <p className="text-[10px] font-medium tracking-[0.3em] text-[#faf6f3]/50">
          CRAFTSMANSHIP — PRECISION — TRANSFORMATION
        </p>
        <div className="flex flex-col items-center gap-3">
          <span className="text-[9px] font-semibold tracking-[0.34em] text-[#faf6f3]/60">SCROLL</span>
          <div className="scroll-cue-line" />
          <ArrowDown className="h-3 w-3 text-[#faf6f3]/50" />
        </div>
        <p className="text-[10px] font-medium tracking-[0.3em] text-[#faf6f3]/50">33.98°N — 117.37°W</p>
      </div>

      {/* video / photo toggle */}
      <div className="absolute right-5 top-24 z-20 md:right-10 md:top-auto md:bottom-24">
        <div className="flex border border-[#faf6f3]/25 bg-[#191613]/40 backdrop-blur-md" role="group" aria-label="Hero media mode">
          {(["video", "photos"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`px-4 py-2.5 text-[10px] font-bold tracking-[0.24em] transition-all duration-300 ${
                mode === m ? "bg-[#faf6f3] text-[#191613]" : "text-[#faf6f3]/70 hover:text-[#faf6f3]"
              }`}
            >
              {m === "video" ? "VIDEO" : "PROJECTS"}
            </button>
          ))}
        </div>
        {mode === "photos" && (
          <div className="mt-3 flex justify-end gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setSlide(i)}
                aria-label={`Show ${s.label.toLowerCase()} photo`}
                className={`h-[3px] transition-all duration-500 ${i === slide ? "w-8 bg-[#bc773f]" : "w-4 bg-[#faf6f3]/35"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
