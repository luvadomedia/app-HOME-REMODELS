import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { scrollToId } from "@/lib/lenis";

const LINKS = [
  { label: "WORK", id: "work" },
  { label: "SERVICES", id: "services" },
  { label: "PROCESS", id: "process" },
  { label: "AREAS", id: "areas" },
  { label: "FAQ", id: "faq" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 500 && y > last);
      last = y;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? y / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 350 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[900] transition-all duration-500 ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled && !open
            ? "border-b border-[#dec9b8]/30 bg-[#faf6f3]/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        {/* scroll progress */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-[#bc773f] transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
          aria-hidden="true"
        />
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-10 md:py-5">
          <button
            onClick={() => go("top")}
            className={`text-left leading-none transition-colors ${scrolled || open ? "text-[#262220]" : "text-[#faf6f3]"}`}
            aria-label="Home Remodels — back to top"
          >
            <span className="font-display block text-[17px] tracking-[0.14em] text-[#bc773f] md:text-lg">HOME REMODELS</span>
          </button>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`nav-link text-[11px] font-semibold tracking-[0.22em] ${
                  scrolled ? "text-[#3c3835]" : "text-[#faf6f3]/85"
                }`}
              >
                <span className="nl-a">{l.label}</span>
                <span className="nl-b" aria-hidden="true">{l.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go("contact")}
              data-cursor=""
              className="arrow-btn group hidden items-center gap-2 bg-[#bc773f] px-5 py-2.5 text-[11px] font-bold tracking-[0.2em] text-[#faf6f3] transition-colors hover:bg-[#9d5f30] sm:flex"
            >
              START A PROJECT
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={`p-2 lg:hidden ${scrolled || open ? "text-[#262220]" : "text-[#faf6f3]"}`}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* fullscreen mobile menu */}
      <div
        className={`fixed inset-0 z-[850] flex flex-col justify-between bg-[#faf6f3] px-6 pb-10 pt-28 transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-2" aria-label="Mobile">
          {[{ label: "HOME", id: "top" }, ...LINKS, { label: "CONTACT", id: "contact" }].map((l, i) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
              className={`font-display border-b border-[#dec9b8]/40 py-4 text-left text-4xl text-[#262220] transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>
        <div>
          <p className="text-[10px] font-semibold tracking-[0.3em] text-[#8a837c]">
            INLAND EMPIRE • LOS ANGELES • HIGH DESERT
          </p>
        </div>
      </div>
    </>
  );
}
