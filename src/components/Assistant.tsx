import { useEffect, useRef, useState } from "react";
import { X, Send, Sparkles, RotateCcw } from "lucide-react";
import { trpc } from "@/providers/trpc";
import { OPEN_ASSISTANT } from "@/lib/bus";
import { scrollToId } from "@/lib/lenis";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi — I'm the Home Remodels Project Assistant. Planning a remodel? Tell me what you're looking to transform, and I'll help you think it through.",
};

const QUICK = [
  "Kitchen remodel",
  "Bathroom remodel",
  "Full home remodel",
  "What areas do you serve?",
  "How does the process work?",
  "Get an estimate",
];

type Status = "idle" | "sending" | "unavailable" | "transient";

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const sessionRef = useRef<string>(crypto.randomUUID().slice(0, 32));
  const scrollRef = useRef<HTMLDivElement>(null);
  const chat = trpc.assistant.chat.useMutation();

  useEffect(() => {
    const fn = () => setOpen(true);
    window.addEventListener(OPEN_ASSISTANT, fn);
    return () => window.removeEventListener(OPEN_ASSISTANT, fn);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, status]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || status === "sending") return;
    const next = [...msgs, { role: "user" as const, content }];
    setMsgs(next);
    setInput("");
    setStatus("sending");
    try {
      const res = await chat.mutateAsync({
        sessionId: sessionRef.current,
        messages: next.filter((m) => m !== GREETING).slice(-20).map((m) => ({ role: m.role, content: m.content })),
      });
      if (res.ok) {
        setMsgs((m) => [...m, { role: "assistant", content: res.reply }]);
        setStatus("idle");
      } else if (res.reason === "unavailable") {
        setStatus("unavailable");
      } else if (res.reason === "rejected") {
        setMsgs((m) => [...m, { role: "assistant", content: "I couldn't quite work with that phrasing — could you rephrase your question?" }]);
        setStatus("idle");
      } else {
        setStatus("transient");
      }
    } catch {
      setStatus("transient");
    }
  };

  return (
    <>
      {/* floating launcher */}
      <button
        onClick={() => setOpen(true)}
        data-cursor=""
        aria-label="Open the Home Remodels AI project assistant"
        className={`fixed bottom-24 right-4 z-[800] flex items-center gap-2.5 bg-[#bc773f] px-4 py-3 text-[10px] font-bold tracking-[0.2em] text-[#faf6f3] shadow-2xl transition-all duration-300 hover:bg-[#9d5f30] md:bottom-8 md:right-8 ${
          open ? "pointer-events-none translate-y-4 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <Sparkles className="h-4 w-4" />
        <span className="hidden sm:inline">PROJECT ASSISTANT</span>
        <span className="sm:hidden">AI ASSISTANT</span>
      </button>

      {/* overlay */}
      <div
        className={`fixed inset-0 z-[9400] bg-[#0d0b09]/60 backdrop-blur-sm transition-opacity duration-400 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Home Remodels Project Assistant"
        aria-hidden={!open}
        inert={!open}
        className={`fixed bottom-0 right-0 top-0 z-[9500] flex w-full flex-col border-l border-[#faf6f3]/10 bg-[#191613] text-[#faf6f3] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-[420px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-start justify-between border-b border-[#faf6f3]/10 p-5">
          <div>
            <p className="text-[9px] font-bold tracking-[0.3em] text-[#bc773f]">HOME REMODELS PROJECT ASSISTANT</p>
            <p className="mt-1.5 text-[11px] text-[#faf6f3]/50">AI assistant — answers are automated, not from a team member.</p>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close assistant" className="p-1.5 text-[#faf6f3]/60 transition-colors hover:text-[#faf6f3]">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-[#bc773f] text-[#faf6f3]"
                    : "border border-[#faf6f3]/12 bg-[#221e1a] text-[#faf6f3]/90"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {status === "sending" && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 border border-[#faf6f3]/12 bg-[#221e1a] px-4 py-3.5">
                <span className="tdot" /><span className="tdot" /><span className="tdot" />
              </div>
            </div>
          )}

          {status === "unavailable" && (
            <div className="border border-[#bc773f]/40 bg-[#221e1a] p-4 text-sm leading-relaxed text-[#faf6f3]/80">
              The assistant is currently unavailable. The fastest way to reach the team is the{" "}
              <button
                className="u-btn font-semibold text-[#bc773f]"
                onClick={() => { setOpen(false); setTimeout(() => scrollToId("contact"), 300); }}
              >
                project inquiry form
              </button>{" "}
              — we respond personally.
            </div>
          )}
          {status === "transient" && (
            <div className="flex items-center justify-between gap-3 border border-[#faf6f3]/15 bg-[#221e1a] p-4 text-sm text-[#faf6f3]/80">
              <span>Something interrupted that reply.</span>
              <button
                onClick={() => {
                  const lastUser = [...msgs].reverse().find((m) => m.role === "user");
                  if (lastUser) {
                    setMsgs((m) => m.slice(0, m.length));
                    setStatus("idle");
                    void send(lastUser.content);
                  }
                }}
                className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] text-[#bc773f]"
              >
                <RotateCcw className="h-3.5 w-3.5" /> RETRY
              </button>
            </div>
          )}
        </div>

        {/* quick actions */}
        <div className="flex gap-2 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {QUICK.map((q) => (
            <button
              key={q}
              onClick={() => void send(q)}
              disabled={status === "sending"}
              className="shrink-0 border border-[#faf6f3]/20 px-3.5 py-2 text-[10px] font-semibold tracking-[0.08em] text-[#faf6f3]/75 transition-colors hover:border-[#bc773f] hover:text-[#dec9b8] disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>

        <form
          className="flex items-center gap-2 border-t border-[#faf6f3]/10 p-4"
          onSubmit={(e) => { e.preventDefault(); void send(input); }}
        >
          <label htmlFor="assistant-input" className="sr-only">Message the project assistant</label>
          <input
            id="assistant-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your project…"
            maxLength={500}
            className="flex-1 bg-transparent px-2 py-2.5 text-sm text-[#faf6f3] placeholder:text-[#faf6f3]/35 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "sending" || !input.trim()}
            aria-label="Send message"
            className="flex h-10 w-10 items-center justify-center bg-[#bc773f] text-[#faf6f3] transition-colors hover:bg-[#9d5f30] disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </aside>
    </>
  );
}
