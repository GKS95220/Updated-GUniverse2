import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 3, suffix: "×", label: "Higher therapy engagement vs. passive protocols", testid: "traction-stat-engagement" },
  { value: 2, suffix: "", label: "Pilot programs in clinical discussion", testid: "traction-stat-pilots" },
  { value: 4, suffix: "+", label: "Target platforms: WebXR, Quest, Vision Pro, Vive", testid: "traction-stat-platforms" },
  { value: 100, suffix: "%", label: "Session telemetry captured for clinical review", testid: "traction-stat-telemetry" },
];

const Counter = ({ value, suffix }) => {
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
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-5xl font-extrabold text-gradient sm:text-6xl">
      {n}
      {suffix}
    </span>
  );
};

export default function Traction() {
  return (
    <section id="traction" data-testid="traction-section" className="relative border-y border-slate-800/70 bg-[#070a1c] py-24">
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-mono-gu text-xs uppercase tracking-[0.25em] text-cyan-400"
        >
          04 — Traction
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
        >
          Early signals, <span className="text-gradient-cv">measured in outcomes.</span>
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
              <Counter value={s.value} suffix={s.suffix} />
              <p className="mt-4 text-sm leading-relaxed text-slate-400">{s.label}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 font-mono-gu text-xs text-slate-600">
          * Pre-seed stage figures reflect internal prototypes and pilot discussions.
        </p>
      </div>
    </section>
  );
}
