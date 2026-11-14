import { ArrowUpRight } from "lucide-react";
import { SERVICES, ADDITIONAL_SERVICES } from "@/config/site";
import { scrollToId } from "@/lib/lenis";

export function Services() {
  return (
    <section id="services" className="relative bg-[#191613] py-28 text-[#faf6f3] md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6 md:mb-24">
          <div>
            <p data-reveal className="mb-6 flex items-center gap-4 text-[10px] font-bold tracking-[0.34em] text-[#bc773f]">
              <span className="inline-block h-px w-10 bg-[#bc773f]" /> WHAT WE DO
            </p>
            <h2 data-reveal className="font-display text-5xl leading-none md:text-7xl">
              SERVICES
            </h2>
          </div>
          <p data-reveal className="max-w-sm text-sm leading-relaxed text-[#faf6f3]/60">
            Six disciplines, one standard. Every service below is delivered with the same precision — planned carefully,
            built cleanly, finished beautifully.
          </p>
        </div>

        <div className="flex flex-col">
          {SERVICES.map((s, i) => (
            <article
              key={s.n}
              data-reveal
              className={`group grid items-center gap-6 border-t border-[#faf6f3]/10 py-10 md:py-14 lg:grid-cols-12 lg:gap-12 ${
                i === SERVICES.length - 1 ? "border-b" : ""
              }`}
            >
              {/* text */}
              <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2 lg:col-start-8" : ""}`}>
                <div className="flex items-baseline gap-5">
                  <span className="font-display text-sm text-[#bc773f]">{s.n}</span>
                  <h3 className="font-display text-3xl leading-tight transition-colors duration-300 group-hover:text-[#dec9b8] md:text-[42px]">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-[#faf6f3]/60 md:text-[15px]">{s.text}</p>
                <button
                  onClick={() => scrollToId("contact")}
                  className="u-btn mt-6 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.26em] text-[#dec9b8]"
                >
                  START A {s.title.split(" ")[0].toUpperCase()} PROJECT
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
              {/* image */}
              <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1 lg:col-start-1" : ""}`}>
                <div
                  className="mask-reveal relative aspect-[16/9] overflow-hidden lg:aspect-[21/9]"
                  data-cursor="EXPLORE"
                  onClick={() => scrollToId("work")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && scrollToId("work")}
                  aria-label={`View ${s.title.toLowerCase()} projects`}
                >
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                  />
                  <div className="absolute inset-0 bg-[#191613]/20 transition-opacity duration-500 group-hover:opacity-0" />
                  {s.badge && (
                    <span className="absolute left-4 top-4 bg-[#191613]/70 px-3 py-1.5 text-[9px] font-bold tracking-[0.24em] text-[#dec9b8] backdrop-blur-sm">
                      {s.badge.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <p data-reveal className="mt-12 text-center text-[11px] font-medium tracking-[0.22em] text-[#faf6f3]/45">
          ALSO — {ADDITIONAL_SERVICES.join("  •  ").toUpperCase()}
        </p>
      </div>
    </section>
  );
}
