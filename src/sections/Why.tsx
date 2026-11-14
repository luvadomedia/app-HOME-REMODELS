const VALUES = [
  { n: "01", title: "CRAFTSMANSHIP", text: "Attention to detail from planning through completion — measured twice, cut once, finished right." },
  { n: "02", title: "QUALITY", text: "Materials, finishes and workmanship selected with long-term results in mind, not shortcuts." },
  { n: "03", title: "COMMUNICATION", text: "A clear, professional remodeling experience. You always know what's happening in your own home." },
  { n: "04", title: "EXPERIENCE", text: "Deep knowledge of residential remodeling and the Southern California market — its homes, its styles, its codes." },
  { n: "05", title: "PERSONALIZED DESIGN", text: "Every project is built around the homeowner's vision and lifestyle — never a template." },
];

export function Why() {
  return (
    <section className="bg-[#faf6f3] py-28 md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p data-reveal className="mb-6 flex items-center gap-4 text-[10px] font-bold tracking-[0.34em] text-[#bc773f]">
                <span className="inline-block h-px w-10 bg-[#bc773f]" /> WHY HOME REMODELS
              </p>
              <h2 data-reveal className="font-display text-5xl leading-[1.02] text-[#262220] md:text-6xl">
                BUILT ON<br />WHAT<br /><span className="text-[#bc773f]">LASTS.</span>
              </h2>
              <p data-reveal className="mt-7 max-w-xs text-sm leading-relaxed text-[#3c3835]/75">
                A remodel is a promise you live inside. These five commitments shape every project we take on.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            {VALUES.map((v) => (
              <div
                key={v.n}
                data-reveal
                className="group grid gap-3 border-t border-[#3c3835]/15 py-9 transition-colors duration-300 last:border-b hover:bg-[#f5ece5] md:grid-cols-12 md:items-baseline md:px-6"
              >
                <span className="font-display text-sm text-[#bc773f] md:col-span-1">{v.n}</span>
                <h3 className="min-w-0 font-display text-2xl text-[#262220] transition-transform duration-500 group-hover:translate-x-2 md:col-span-5 lg:text-3xl">
                  {v.title}
                </h3>
                <p className="min-w-0 text-sm leading-relaxed text-[#3c3835]/75 md:col-span-6">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
