import { motion } from "framer-motion";
import { Layers, Cpu, Radio, Database } from "lucide-react";

const stack = [
  {
    icon: Layers,
    title: "Spatial Engine",
    desc: "Real-time 3D scene orchestration with adaptive difficulty, haptics hooks, and multi-user sync.",
  },
  {
    icon: Cpu,
    title: "WebXR Runtime",
    desc: "One codebase deploys to browsers, Meta Quest, Apple Vision Pro, and HTC Vive — zero install friction.",
  },
  {
    icon: Radio,
    title: "Bio-Spatial Telemetry",
    desc: "Gaze, motion accuracy, reaction latency, and session stress signals streamed live from the headset.",
  },
  {
    icon: Database,
    title: "Clinical Analytics Cloud",
    desc: "Encrypted pipeline aggregating engagement metrics into clinician-ready progress dashboards.",
  },
];

export default function Technology() {
  return (
    <section id="technology" data-testid="technology-section" className="relative border-y border-slate-800/70 bg-[#070a1c] py-28">
      <div className="dot-texture pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-mono-gu text-xs uppercase tracking-[0.25em] text-cyan-400"
        >
          Technology
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-4 max-w-2xl font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
        >
          The stack behind <span className="text-gradient-cv">the experience.</span>
        </motion.h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((s, i) => (
            <motion.div
              key={s.title}
              data-testid={`tech-card-${i + 1}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-2xl glass-card p-7 transition-all duration-500 hover:border-cyan-500/40 hover:shadow-[0_0_28px_rgba(0,242,254,0.12)]"
            >
              <span className="font-mono-gu text-xs text-slate-600">0{i + 1}</span>
              <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-300 transition-all duration-500 group-hover:shadow-[0_0_16px_rgba(0,242,254,0.35)]">
                <s.icon size={20} />
              </div>
              <h3 className="mt-5 font-display text-base font-semibold text-white sm:text-lg">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
