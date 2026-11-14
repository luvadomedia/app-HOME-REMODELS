import { useEffect, useState } from "react";
import type { ToastPayload } from "@/lib/bus";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

interface Item extends ToastPayload {
  id: number;
}

export function Toasts() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fn = (e: Event) => {
      const d = (e as CustomEvent<ToastPayload>).detail;
      const id = Date.now() + Math.random();
      setItems((xs) => [...xs.slice(-3), { ...d, id }]);
      window.setTimeout(() => setItems((xs) => xs.filter((x) => x.id !== id)), d.kind === "error" ? 7000 : 4500);
    };
    window.addEventListener("ghr:toast", fn);
    return () => window.removeEventListener("ghr:toast", fn);
  }, []);

  return (
    <div aria-live="polite" className="fixed top-5 left-1/2 z-[10000] flex w-[min(92vw,430px)] -translate-x-1/2 flex-col gap-2">
      {items.map((t) => (
        <div
          key={t.id}
          className="flex items-start gap-3 border border-[#dec9b8]/40 bg-[#191613]/95 px-4 py-3 text-sm text-[#faf6f3] shadow-xl backdrop-blur"
        >
          {t.kind === "success" && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#bc773f]" />}
          {t.kind === "error" && <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />}
          {t.kind === "info" && <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#dec9b8]" />}
          <p className="flex-1 leading-snug">{t.msg}</p>
          <button
            aria-label="Dismiss notification"
            onClick={() => setItems((xs) => xs.filter((x) => x.id !== t.id))}
            className="text-[#8a837c] transition-colors hover:text-[#faf6f3]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
