import { motion } from "framer-motion";
import { Brain, MonitorSmartphone, GraduationCap, LineChart } from "lucide-react";

const features = [
  {
    title: "Spatial Therapeutics",
    desc: "Gamified, immersive protocols for physical rehabilitation and exposure therapy — designed to trigger neuro-plasticity and sustain patient adherence.",
    tag: "Clinical XR",
    icon: Brain,
    span: "md:col-span-2",
    testid: "feature-card-spatial-therapeutics",
  },
  {
    title: "WebXR & Standalone Compatibility",
    desc: "Runs natively across WebXR frameworks and standalone VR hardware — no heavy infrastructure required.",
    tag: "Cross-Platform",
    icon: MonitorSmartphone,
    span: "",
    testid: "feature-card-webxr-compatibility",
  },
  {
    title: "Interactive Learning",
    desc: "Immersive MedTech and EdTech modules for intuitive, hands-on spatial training.",
    tag: "Immersive Edu",
    icon: GraduationCap,
    span: "",
    testid: "feature-card-interactive-learning",
  },
  {
    title: "Data-Driven Insights",
    desc: "A full analytics pipeline for monitoring patient engagement and clinical session metrics — visualized in real time.",
    tag: "Analytics",
    icon: LineChart,
    span: "md:col-span-2",
    testid: "feature-card-data-insights",
  },
];

export default function Features() {
  return (
    <section id="platform" data-testid="features-grid-section" className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="font-mono-gu text-xs uppercase tracking-[0.25em] text-cyan-400"
      >
        02 — Core Platform
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mt-4 max-w-2xl font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
      >
        One spatial engine. <span className="text-gradient-cv">Four clinical superpowers.</span>
      </motion.h2>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {features.map((f, i) => (
          <motion.article
            key={f.title}
            data-testid={f.testid}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className={`group relative overflow-hidden rounded-2xl glass-card p-8 transition-shadow duration-500 hover:shadow-[0_0_36px_rgba(0,242,254,0.14)] ${f.span}`}
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-tr from-cyan-500/15 to-violet-500/15 blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-300 transition-all duration-500 group-hover:shadow-[0_0_18px_rgba(0,242,254,0.35)]">
                <f.icon size={22} />
              </div>
              <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono-gu text-[10px] uppercase tracking-[0.18em] text-violet-300">
                {f.tag}
              </span>
            </div>
            <h3 className="mt-6 font-display text-lg font-semibold text-white sm:text-xl">{f.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.desc}</p>
            <div className="mt-6 h-px w-full bg-gradient-to-r from-cyan-500/40 via-violet-500/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
