import { MessageSquareText, Hammer } from "lucide-react";
import { openAssistant } from "@/lib/bus";
import { scrollToId } from "@/lib/lenis";

/** Sticky mobile conversion bar (hidden on desktop). */
export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[820] grid grid-cols-2 border-t border-[#faf6f3]/10 bg-[#191613]/95 backdrop-blur-md md:hidden">
      <button
        onClick={openAssistant}
        className="flex items-center justify-center gap-2 py-4 text-[11px] font-bold tracking-[0.18em] text-[#dec9b8] active:bg-[#221e1a]"
      >
        <MessageSquareText className="h-4 w-4" /> TEXT AI
      </button>
      <button
        onClick={() => scrollToId("contact")}
        className="flex items-center justify-center gap-2 bg-[#bc773f] py-4 text-[11px] font-bold tracking-[0.18em] text-[#faf6f3] active:bg-[#9d5f30]"
      >
        <Hammer className="h-4 w-4" /> START PROJECT
      </button>
    </div>
  );
}
