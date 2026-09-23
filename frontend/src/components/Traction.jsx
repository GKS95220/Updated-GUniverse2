import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 60, suffix: "%", label: "Stress reduction observed in therapeutic VR sessions", testid: "traction-stat-stress" },
  { value: 43, suffix: "%", label: "Pain intensity decrease — a drug-free alternative to analgesics", testid: "traction-stat-pain" },
  { value: 6, suffix: " min", label: "Average session time for rapid therapeutic outcomes", testid: "traction-stat-session" },
  { value: 18.6, prefix: "$", suffix: "B", decimals: 1, label: "Global VR therapy market projection by 2034 — 19.3% CAGR", testid: "traction-stat-market" },
];

const roadmap = [
  { phase: "Phase 1", title: "MVP Build", desc: "Unity scenarios & dashboard completion" },
  { phase: "Phase 2", title: "Clinical Pilots", desc: "Partner with 5 regional psychology clinics" },
  { phase: "Phase 3", title: "Compliance", desc: "ISO 13485 QMS · SaMD submission" },
  { phase: "Phase 4", title: "Commercial Scale", desc: "National provider expansion & GTM campaign" },
];

const Counter = ({ value, suffix, prefix, decimals = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1600;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-5xl font-extrabold text-gradient sm:text-6xl">
      {prefix}
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default function Traction() {
  return (
    <section id="traction" data-testid="traction-section" className="relative border-y border-slate-800/70 bg-[#070a1c] py-24">
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-mono-gu text-xs uppercase tracking-[0.25em] text-cyan-400"
          >
            05 — Clinical Efficacy & Traction
          </motion.p>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
        >
          Measurable outcomes, <span className="text-gradient-cv">not promises.</span>
        </motion.h2>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-800/60 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.testid}
              data-testid={s.testid}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-[#0a0d24] p-8 transition-colors duration-500 hover:bg-[#0d1130]"
            >
              <Counter value={s.value} suffix={s.suffix} prefix={s.prefix} decimals={s.decimals} />
              <p className="mt-4 text-sm leading-relaxed text-slate-400">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-14">
          <p className="font-mono-gu text-xs uppercase tracking-[0.25em] text-violet-300">Execution Roadmap</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {roadmap.map((r, i) => (
              <motion.div
                key={r.phase}
                data-testid={`roadmap-${i + 1}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative rounded-2xl glass-card p-6"
              >
                <span className="font-mono-gu text-[10px] uppercase tracking-[0.2em] text-cyan-400">{r.phase}</span>
                <h3 className="mt-2 font-display text-base font-semibold text-white">{r.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{r.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 font-mono-gu text-xs text-slate-500">
            Projected ARR trajectory: $0.4M → $1.8M → $5.2M → $12.5M across Years 1–4.
          </p>
        </div>
      </div>
    </section>
  );
}
