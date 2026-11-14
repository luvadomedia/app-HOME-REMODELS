import { useEffect, useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { GALLERY, type GalleryItem } from "@/config/site";

const FILTERS = [
  { id: "all", label: "ALL" },
  { id: "company", label: "COMPANY PROJECTS" },
  { id: "kitchens", label: "KITCHENS" },
  { id: "bathrooms", label: "BATHROOMS" },
  { id: "interiors", label: "INTERIORS" },
  { id: "process", label: "PROCESS" },
  { id: "inspiration", label: "DESIGN INSPIRATION" },
];

function matches(item: GalleryItem, f: string) {
  if (f === "all") return true;
  if (f === "company") return item.real;
  return item.cats.includes(f);
}

export function Gallery() {
  const [filter, setFilter] = useState("all");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const items = useMemo(() => GALLERY.filter((g) => matches(g, filter)), [filter]);
  const current = openIdx !== null ? items[openIdx] : null;

  useEffect(() => {
    if (openIdx === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowRight") setOpenIdx((i) => (i === null ? null : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setOpenIdx((i) => (i === null ? null : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIdx, items.length]);

  return (
    <section id="work" className="bg-[#faf6f3] py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div>
            <p data-reveal className="mb-6 flex items-center gap-4 text-[10px] font-bold tracking-[0.34em] text-[#bc773f]">
              <span className="inline-block h-px w-10 bg-[#bc773f]" /> OUR WORK
            </p>
            <h2 data-reveal className="font-display text-5xl leading-none text-[#262220] md:text-7xl">
              CRAFTSMANSHIP<br />YOU CAN <span className="text-[#bc773f]">SEE.</span>
            </h2>
          </div>
          <p data-reveal className="max-w-sm text-sm leading-relaxed text-[#3c3835]/70">
            Real company project photography alongside design-direction imagery that shows the level of finish we
            build toward. Every frame is labeled honestly.
          </p>
        </div>

        {/* filters */}
        <div data-reveal className="mb-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`border px-4 py-2 text-[10px] font-bold tracking-[0.2em] transition-all duration-300 ${
                filter === f.id
                  ? "border-[#191613] bg-[#191613] text-[#faf6f3]"
                  : "border-[#3c3835]/25 text-[#3c3835] hover:border-[#bc773f] hover:text-[#bc773f]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* masonry */}
        <div className="masonry">
          {items.map((g, i) => (
            <figure key={g.src} data-reveal className="group relative cursor-pointer" data-cursor="VIEW">
              <button
                className="block w-full text-left"
                onClick={() => { setOpenIdx(i); setZoomed(false); }}
                aria-label={`Open ${g.title} fullscreen`}
              >
                <div className="mask-reveal in relative overflow-hidden">
                  <img
                    src={g.src}
                    alt={g.title}
                    loading="lazy"
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.05] ${
                      g.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#191613]/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-[#faf6f3]/90 text-[#191613] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Plus className="h-4 w-4" />
                  </span>
                  <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className={`mr-2 inline-block px-2 py-0.5 text-[8px] font-bold tracking-[0.2em] ${g.real ? "bg-[#bc773f] text-[#faf6f3]" : "bg-[#faf6f3]/85 text-[#3c3835]"}`}>
                      {g.real ? "COMPANY PROJECT" : "INSPIRATION"}
                    </span>
                    <span className="text-xs font-medium text-[#faf6f3]">{g.title}</span>
                  </figcaption>
                </div>
              </button>
            </figure>
          ))}
        </div>

        <p data-reveal className="mt-8 text-[11px] leading-relaxed text-[#8a837c]">
          Imagery marked “Inspiration” represents design direction and finish quality, not completed company projects.
        </p>
      </div>

      {/* fullscreen lightbox */}
      {current && (
        <div
          className="fixed inset-0 z-[9500] flex items-center justify-center bg-[#0d0b09]/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          onClick={() => setOpenIdx(null)}
        >
          <button aria-label="Close viewer" className="absolute right-5 top-5 z-10 p-2 text-[#faf6f3]/70 transition-colors hover:text-[#faf6f3]" onClick={() => setOpenIdx(null)}>
            <X className="h-7 w-7" />
          </button>
          <button
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 p-3 text-[#faf6f3]/60 transition-colors hover:text-[#bc773f] md:left-8"
            onClick={(e) => { e.stopPropagation(); setOpenIdx((openIdx! - 1 + items.length) % items.length); setZoomed(false); }}
          >
            <ChevronLeft className="h-9 w-9" />
          </button>
          <button
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 p-3 text-[#faf6f3]/60 transition-colors hover:text-[#bc773f] md:right-8"
            onClick={(e) => { e.stopPropagation(); setOpenIdx((openIdx! + 1) % items.length); setZoomed(false); }}
          >
            <ChevronRight className="h-9 w-9" />
          </button>

          <figure className="max-h-[86vh] max-w-[92vw]" onClick={(e) => e.stopPropagation()}>
            <img
              src={current.src}
              alt={current.title}
              onClick={() => setZoomed(!zoomed)}
              className={`max-h-[76vh] max-w-full cursor-zoom-in object-contain transition-transform duration-500 ${zoomed ? "scale-[1.6] cursor-zoom-out" : ""}`}
            />
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm text-[#faf6f3]/85">{current.title}</span>
              <span className={`px-2.5 py-1 text-[9px] font-bold tracking-[0.22em] ${current.real ? "bg-[#bc773f] text-[#faf6f3]" : "bg-[#faf6f3]/15 text-[#dec9b8]"}`}>
                {current.real ? "COMPANY PROJECT PHOTO" : "DESIGN INSPIRATION"}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
