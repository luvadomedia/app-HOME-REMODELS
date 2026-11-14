import { scrollToId } from "@/lib/lenis";

export function Intro() {
  return (
    <section className="relative overflow-hidden bg-[#faf6f3] py-28 md:py-44">
      {/* decorative architectural line */}
      <svg className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-60" aria-hidden="true" preserveAspectRatio="none">
        <line x1="12%" y1="0" x2="12%" y2="100%" stroke="#dec9b8" strokeWidth="1" opacity="0.35" />
        <line x1="88%" y1="0" x2="88%" y2="100%" stroke="#dec9b8" strokeWidth="1" opacity="0.35" />
      </svg>

      <div className="relative mx-auto grid max-w-[1440px] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p data-reveal className="mb-6 flex items-center gap-4 text-[10px] font-bold tracking-[0.34em] text-[#bc773f]">
            <span className="inline-block h-px w-10 bg-[#bc773f]" /> THE STUDIO
          </p>
          <h2 className="font-display text-[15vw] leading-[0.95] text-[#262220] sm:text-7xl lg:text-[92px]">
            <span data-reveal className="block">YOUR HOME.</span>
            <span data-reveal style={{ "--rd": "0.15s" } as React.CSSProperties} className="block text-[#bc773f]">
              REIMAGINED.
            </span>
          </h2>
          <div data-reveal style={{ "--rd": "0.3s" } as React.CSSProperties} className="mt-10 max-w-lg space-y-5 text-[15px] leading-relaxed text-[#3c3835] md:text-[17px]">
            <p>
              Home Remodels transforms existing homes into spaces that are beautiful, functional and built
              around the way you actually live — from the first sketch of an idea to the final walkthrough.
            </p>
            <p>
              Every project is a collaboration: your vision, our craft. The result is a home that feels considered in
              every detail — the line of a tile, the weight of a cabinet door, the way light moves through a room.
            </p>
          </div>
          <button
            data-reveal
            onClick={() => scrollToId("process")}
            style={{ "--rd": "0.45s" } as React.CSSProperties}
            className="u-btn mt-10 text-[11px] font-bold tracking-[0.24em] text-[#262220]"
          >
            SEE HOW WE WORK
          </button>
        </div>

        <div className="relative lg:col-span-5">
          <div className="mask-reveal relative aspect-[4/5] w-full overflow-hidden lg:mt-16" data-reveal>
            <img
              src="/media/slide-living.jpg"
              alt="Open-plan remodeled living space with warm natural light"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            className="mask-reveal absolute -bottom-10 -left-6 hidden w-[46%] overflow-hidden border-8 border-[#faf6f3] shadow-2xl md:block lg:-left-16"
            data-reveal
            style={{ "--rd": "0.25s" } as React.CSSProperties}
          >
            <div className="aspect-[3/4]">
              <img src="/media/insp-1.jpg" alt="Marble shelf detail with ceramics in warm light" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </div>
          <p
            data-reveal
            style={{ "--rd": "0.5s" } as React.CSSProperties}
            className="mt-6 text-right text-[10px] font-semibold tracking-[0.3em] text-[#8a837c] md:mt-14"
          >
            DESIGN DIRECTION — WARM MINIMALISM
          </p>
        </div>
      </div>
    </section>
  );
}
