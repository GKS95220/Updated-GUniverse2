import { motion } from "framer-motion";
import { Waves, Megaphone, Crosshair, MoonStar, Mountain, Activity } from "lucide-react";

const planets = [
  {
    icon: Waves,
    name: "Calm Planet",
    desc: "Stress regulation, mindfulness, and rapid autonomic nervous system resetting.",
    hue: "from-cyan-400 to-teal-400",
    testid: "planet-calm",
  },
  {
    icon: Megaphone,
    name: "Confidence Planet",
    desc: "Social anxiety mitigation through progressive exposure and virtual public speaking.",
    hue: "from-violet-400 to-fuchsia-400",
    testid: "planet-confidence",
  },
  {
    icon: Crosshair,
    name: "Focus Planet",
    desc: "Cognitive attention training and sustained focus enhancement environments.",
    hue: "from-sky-400 to-cyan-400",
    testid: "planet-focus",
  },
  {
    icon: MoonStar,
    name: "Sleep Planet",
    desc: "Deep relaxation, circadian alignment, and targeted sleep preparation protocols.",
    hue: "from-indigo-400 to-violet-400",
    testid: "planet-sleep",
  },
  {
    icon: Mountain,
    name: "Phobia Worlds",
    desc: "Carefully controlled, graded exposure therapy for specific phobias and trauma response.",
    hue: "from-fuchsia-400 to-purple-400",
    testid: "planet-phobia",
  },
  {
    icon: Activity,
    name: "Recovery Spaces",
    desc: "Pain distraction techniques and musculoskeletal rehabilitation applications.",
    hue: "from-teal-400 to-emerald-400",
    testid: "planet-recovery",
  },
];

export default function Ecosystem() {
  return (
    <section id="ecosystem" data-testid="ecosystem-section" className="relative border-y border-slate-800/70 bg-[#070a1c] py-28">
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-mono-gu text-xs uppercase tracking-[0.25em] text-cyan-400"
        >
          03 — The GUniverse Ecosystem
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-4 max-w-3xl font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
        >
          A multi-planetary VR ecosystem for <span className="text-gradient-cv">mental health & rehabilitation.</span>
        </motion.h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {planets.map((p, i) => (
            <motion.article
              key={p.name}
              data-testid={p.testid}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl glass-card p-7 transition-shadow duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
            >
              <div className="flex items-center gap-4">
                <span className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr ${p.hue} p-[1.5px]`}>
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-[#0a0d24] text-white">
                    <p.icon size={20} />
                  </span>
                </span>
                <div>
                  <p className="font-mono-gu text-[10px] uppercase tracking-[0.2em] text-slate-500">Module 0{i + 1}</p>
                  <h3 className="font-display text-lg font-semibold text-white">{p.name}</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">{p.desc}</p>
              <div className={`pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-tr ${p.hue} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
