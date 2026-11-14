import { ArrowRight, MessageSquareText } from "lucide-react";
import { scrollToId } from "@/lib/lenis";
import { openAssistant } from "@/lib/bus";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#0d0b09]">
      <div className="absolute inset-0">
        <img
          src="/media/cta-bg.jpg"
          alt="Evening interior of a remodeled luxury home, warm lamplight over a marble island"
          loading="lazy"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0b09]/60 via-[#0d0b09]/35 to-[#0d0b09]/80" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[82svh] max-w-[1440px] flex-col items-center justify-center px-5 py-28 text-center md:px-10">
        <p data-reveal className="mb-6 text-[10px] font-bold tracking-[0.4em] text-[#dec9b8]">YOUR PROJECT STARTS HERE</p>
        <h2 data-reveal className="font-display max-w-4xl text-[12vw] leading-[0.98] text-[#faf6f3] sm:text-6xl md:text-7xl lg:text-[88px]">
          READY TO TRANSFORM<br /><span className="text-[#bc773f]">YOUR HOME?</span>
        </h2>
        <p data-reveal className="mt-7 max-w-xl text-[15px] leading-relaxed text-[#faf6f3]/75 md:text-lg">
          Tell us what you're envisioning and let's explore what's possible — together.
        </p>
        <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollToId("contact")}
            data-cursor=""
            className="arrow-btn group flex items-center gap-3 bg-[#bc773f] px-8 py-4.5 text-[11px] font-bold tracking-[0.22em] text-[#faf6f3] transition-colors hover:bg-[#9d5f30] py-4"
          >
            START YOUR PROJECT
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={openAssistant}
            className="flex items-center gap-3 border border-[#dec9b8]/50 px-8 py-4 text-[11px] font-bold tracking-[0.22em] text-[#faf6f3] backdrop-blur-sm transition-colors hover:border-[#faf6f3] hover:bg-[#faf6f3]/10"
          >
            <MessageSquareText className="h-4 w-4" />
            TEXT OUR AI PROJECT ASSISTANT
          </button>
        </div>
      </div>
    </section>
  );
}
