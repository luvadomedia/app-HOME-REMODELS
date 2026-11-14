import { scrollToId } from "@/lib/lenis";

const COLS = [
  {
    title: "EXPLORE",
    links: [
      { label: "Home", id: "top" },
      { label: "Our Work", id: "work" },
      { label: "Services", id: "services" },
      { label: "Process", id: "process" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "Service Areas", id: "areas" },
      { label: "FAQ", id: "faq" },
      { label: "Contact", id: "contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0d0b09] pb-28 pt-20 text-[#faf6f3] md:pb-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-12 border-b border-[#faf6f3]/10 pb-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-display text-2xl tracking-[0.12em] text-[#bc773f]">HOME REMODELS</p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#faf6f3]/55">
              Premium home remodeling — kitchens, bathrooms and whole-home transformations, built with craftsmanship
              and care.
            </p>
            <p className="mt-6 text-[10px] font-semibold tracking-[0.28em] text-[#faf6f3]/40">
              SERVING SOUTHERN CALIFORNIA<br />INLAND EMPIRE • LOS ANGELES • HIGH DESERT
            </p>
          </div>
          {COLS.map((c) => (
            <nav key={c.title} className="md:col-span-2" aria-label={c.title}>
              <p className="mb-5 text-[10px] font-bold tracking-[0.3em] text-[#8a837c]">{c.title}</p>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.id}>
                    <button onClick={() => scrollToId(l.id)} className="u-btn text-sm text-[#faf6f3]/70 transition-colors hover:text-[#faf6f3]">
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="flex flex-col gap-4 pt-8 text-[11px] leading-relaxed text-[#faf6f3]/35 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Home Remodels. All rights reserved.</p>
          <p className="max-w-xl">
            Imagery on this site includes actual company project photos alongside representative design-direction
            visuals, each labeled accordingly. We are committed to digital accessibility and strive to provide an
            accessible experience for all visitors.
          </p>
        </div>
      </div>
    </footer>
  );
}
