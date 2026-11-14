import { useCallback, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";

/** Signature before/after transformation slider (draggable + keyboard accessible). */
export function Transformation() {
  const [pos, setPos] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(96, Math.max(4, p)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setFromClientX(e.clientX);
  };
  const stop = () => { dragging.current = false; };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { setPos((p) => Math.max(4, p - 4)); e.preventDefault(); }
    if (e.key === "ArrowRight") { setPos((p) => Math.min(96, p + 4)); e.preventDefault(); }
  };

  return (
    <section className="relative overflow-hidden bg-[#f5ece5] py-28 md:py-40">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p data-reveal className="mb-6 flex items-center gap-4 text-[10px] font-bold tracking-[0.34em] text-[#bc773f]">
            <span className="inline-block h-px w-10 bg-[#bc773f]" /> THE TRANSFORMATION
          </p>
          <h2 data-reveal className="font-display text-5xl leading-[1.02] text-[#262220] md:text-[64px]">
            FROM DEMOLITION<br />TO <span className="text-[#bc773f]">DONE.</span>
          </h2>
          <p data-reveal className="mt-7 max-w-md text-[15px] leading-relaxed text-[#3c3835] md:text-base">
            Every transformation begins the same way — stripped back to the bones. Drag the divider to move from a real
            demolition day to the finished result: new cabinetry, stone counters, brass fixtures and light.
          </p>
          <p data-reveal className="mt-6 border-l-2 border-[#dec9b8] pl-4 text-xs leading-relaxed text-[#8a837c]">
            The “before” frame is an actual Home Remodels project photo. The “after” frame is a representative
            visualization of the finished result.
          </p>
        </div>

        <div className="lg:col-span-7" data-reveal>
          <div
            ref={trackRef}
            className="relative mx-auto aspect-[3/4] max-h-[78vh] w-full max-w-[560px] touch-none select-none overflow-hidden shadow-2xl"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={stop}
            onPointerCancel={stop}
          >
            {/* after (base layer) */}
            <img
              src="/media/after-kitchen.jpg"
              alt="Finished luxury kitchen — quartz counters, oak cabinetry, brass faucet"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* before (clipped layer) */}
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <img
                src="/media/kitchen-demo.jpg"
                alt="Kitchen demolition — actual Home Remodels project photo"
                draggable={false}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#191613]/10" />
            </div>

            {/* labels */}
            <span className="absolute left-4 top-4 z-10 bg-[#191613]/70 px-3 py-1.5 text-[9px] font-bold tracking-[0.26em] text-[#faf6f3] backdrop-blur-sm">
              BEFORE
            </span>
            <span className="absolute right-4 top-4 z-10 bg-[#bc773f] px-3 py-1.5 text-[9px] font-bold tracking-[0.26em] text-[#faf6f3]">
              AFTER
            </span>

            {/* handle */}
            <div
              className="ba-handle"
              style={{ left: `${pos}%` }}
              role="slider"
              tabIndex={0}
              aria-label="Before and after comparison"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              onKeyDown={onKeyDown}
            >
              <div className="ba-knob">
                <ChevronsLeftRight className="h-5 w-5" />
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-[10px] font-semibold tracking-[0.3em] text-[#8a837c]">
            DRAG TO COMPARE
          </p>
        </div>
      </div>
    </section>
  );
}
