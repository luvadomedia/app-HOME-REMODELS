import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { scrollToId } from "@/lib/lenis";

const REGIONS = [
  {
    id: "ie",
    name: "INLAND EMPIRE",
    x: 68,
    y: 46,
    desc: "Our home base. Kitchens, bathrooms and whole-home remodels across the IE's neighborhoods — from historic homes to new builds.",
  },
  {
    id: "la",
    name: "LOS ANGELES",
    x: 30,
    y: 62,
    desc: "From Los Angeles County's classic bungalows to its modern hillside homes — thoughtful remodeling, block by block.",
  },
  {
    id: "hd",
    name: "HIGH DESERT",
    x: 62,
    y: 14,
    desc: "High Desert homes with big potential — durable finishes and smart design built for the desert climate.",
  },
];

export function Areas() {
  const [active, setActive] = useState<string>("ie");
  const region = REGIONS.find((r) => r.id === active)!;

  return (
    <section id="areas" className="relative overflow-hidden bg-[#141210] py-28 text-[#faf6f3] md:py-40">
      {/* topo grid backdrop */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.13]" aria-hidden="true">
        <defs>
          <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#dec9b8" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-14 md:mb-20">
          <p data-reveal className="mb-6 flex items-center gap-4 text-[10px] font-bold tracking-[0.34em] text-[#bc773f]">
            <span className="inline-block h-px w-10 bg-[#bc773f]" /> SERVICE AREAS
          </p>
          <h2 data-reveal className="font-display text-5xl leading-[1.02] md:text-7xl">
            SERVING<br />SOUTHERN <span className="text-[#bc773f]">CALIFORNIA.</span>
          </h2>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* map-inspired visualization */}
          <div data-reveal className="relative lg:col-span-7">
            <div className="relative aspect-[4/3] w-full border border-[#faf6f3]/10 bg-[#191613]/60">
              {/* abstract coastline */}
              <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,30 C10,26 18,34 24,44 C30,54 34,62 40,75 L0,75 Z" fill="#221e1a" />
                <path d="M0,30 C10,26 18,34 24,44 C30,54 34,62 40,75" fill="none" stroke="#bc773f" strokeWidth="0.35" strokeDasharray="1.5 1.5" opacity="0.7" />
                <line x1="30" y1="62" x2="68" y2="46" stroke="#dec9b8" strokeWidth="0.25" strokeDasharray="2 2" opacity="0.5" />
                <line x1="68" y1="46" x2="62" y2="14" stroke="#dec9b8" strokeWidth="0.25" strokeDasharray="2 2" opacity="0.5" />
                <line x1="30" y1="62" x2="62" y2="14" stroke="#dec9b8" strokeWidth="0.15" strokeDasharray="2 2" opacity="0.3" />
              </svg>
              {REGIONS.map((r) => (
                <button
                  key={r.id}
                  onMouseEnter={() => setActive(r.id)}
                  onFocus={() => setActive(r.id)}
                  onClick={() => setActive(r.id)}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${r.x}%`, top: `${r.y}%` }}
                  aria-pressed={active === r.id}
                  aria-label={`Show ${r.name} service area`}
                >
                  <span className={`node-dot block h-3 w-3 rounded-full transition-colors ${active === r.id ? "bg-[#bc773f]" : "bg-[#dec9b8]/60"}`} />
                  <span
                    className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-[9px] font-bold tracking-[0.26em] transition-colors ${
                      active === r.id ? "text-[#faf6f3]" : "text-[#faf6f3]/45"
                    }`}
                  >
                    {r.name}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-4 text-[10px] font-medium tracking-[0.26em] text-[#faf6f3]/35">
              PRIMARY SERVICE REGIONS — SURROUNDING COMMUNITIES WELCOME
            </p>
          </div>

          {/* region detail */}
          <div data-reveal className="lg:col-span-5">
            <div key={region.id} className="border border-[#faf6f3]/12 bg-[#191613]/80 p-8 backdrop-blur md:p-10">
              <p className="text-[10px] font-bold tracking-[0.3em] text-[#bc773f]">REGION</p>
              <h3 className="font-display mt-3 text-4xl">{region.name}</h3>
              <p className="mt-5 text-sm leading-relaxed text-[#faf6f3]/65">{region.desc}</p>
              <p className="mt-5 text-xs leading-relaxed text-[#faf6f3]/45">
                Remodeling services: kitchens, bathrooms, interiors, exteriors and full-home renovations.
              </p>
              <button
                onClick={() => scrollToId("contact")}
                className="arrow-btn mt-8 inline-flex items-center gap-2 border border-[#bc773f] px-6 py-3.5 text-[10px] font-bold tracking-[0.24em] text-[#dec9b8] transition-colors hover:bg-[#bc773f] hover:text-[#faf6f3]"
              >
                CONFIRM YOUR CITY
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
