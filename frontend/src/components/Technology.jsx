import { motion } from "framer-motion";
import { Headset, Gamepad2, Radio, BrainCircuit } from "lucide-react";

const stack = [
  {
    icon: Headset,
    title: "Hardware Foundation",
    desc: "Meta Quest 3S (128 GB) standalone VR — fully wireless clinical deployment with zero PC infrastructure.",
  },
  {
    icon: Gamepad2,
    title: "Unity Real-Time Engine",
    desc: "Unity-powered rendering with pre-built 3D environments from Unity Store & Sketchfab, plus proprietary Blender models.",
  },
  {
    icon: Radio,
    title: "Clinician Control Loop",
    desc: "Human-in-the-loop safety without automated sensors: SUDS 1–10 feedback, live screen mirroring of the patient's exact POV, and session annotations.",
  },
  {
    icon: BrainCircuit,
    title: "Neuroscience Layer",
    desc: "Binaural beats for brainwave coherence, guided by Harvard brain-wiring research via Dr. Sweta (Limitless Brain Labs) — VR modulates all 5 pain regions.",
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
