import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartPulse, Building2, UserRound, ArrowUpRight } from "lucide-react";

const markets = {
  healthcare: {
    title: "Health Institutes & Professionals",
    vertical: "MedTech",
    desc: "Clinical-grade VR therapy that integrates directly into existing care pathways.",
    cases: [
      "Clinical therapy integration for outpatient mental health clinics",
      "Non-pharmacological pain management — reducing analgesic & opioid dependency",
      "Digital CBT & ACT tools for anxiety, trauma, and phobia treatment",
      "Physical & musculoskeletal rehabilitation protocols",
    ],
    image: "https://images.unsplash.com/photo-1758691462668-046fd85ceac9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwzfHxmdXR1cmlzdGljJTIwaGVhbHRoY2FyZSUyMGRpZ2l0YWwlMjB0ZWNobm9sb2d5fGVufDB8fHx8MTc4OTc5MjM4MXww&ixlib=rb-4.1.0&q=85",
  },
  institutions: {
    title: "Tier-1 Educational Institutes",
    vertical: "EdTech",
    desc: "Immersive spatial learning platforms that double as student well-being infrastructure.",
    cases: [
      "Student mental well-being and stress regulation programs",
      "Focus enhancement and cognitive attention training",
      "Medical simulation labs for procedural training",
      "Virtual public speaking and confidence-building environments",
    ],
    image: "https://images.pexels.com/photos/3183176/pexels-photo-3183176.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  patients: {
    title: "Direct Patients",
    vertical: "B2C MedTech",
    desc: "Home-based therapeutic VR that puts clinical-grade care in the patient's hands.",
    cases: [
      "Chronic pain relief through immersive distraction therapy",
      "Dry Eye Syndrome treatment via lipid-layer stimulation",
      "Sleep improvement and circadian alignment protocols",
      "Guided anxiety relief in calming biophilic spaces",
    ],
    image: "https://images.pexels.com/photos/8721326/pexels-photo-8721326.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
};

const tabs = [
  { key: "healthcare", label: "Healthcare", icon: HeartPulse, testid: "target-market-tab-healthcare" },
  { key: "institutions", label: "Institutions", icon: Building2, testid: "target-market-tab-enterprises" },
  { key: "patients", label: "Patients", icon: UserRound, testid: "target-market-tab-patients" },
];

export default function Markets() {
  const [active, setActive] = useState("healthcare");
  const m = markets[active];

  return (
    <section id="applications" data-testid="target-markets-section" className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="font-mono-gu text-xs uppercase tracking-[0.25em] text-cyan-400"
      >
        04 — Target Markets
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mt-4 max-w-2xl font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
      >
        Built for clinics, campuses, <span className="text-gradient-cv">and living rooms.</span>
      </motion.h2>

      <div className="mt-10 flex flex-wrap gap-3">
        {tabs.map((t) => (
          <button
            key={t.key}
            data-testid={t.testid}
            onClick={() => setActive(t.key)}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
              active === t.key
                ? "bg-gradient-to-r from-cyan-400 to-violet-500 text-[#050714] shadow-[0_0_20px_rgba(0,242,254,0.3)]"
                : "border border-slate-700/70 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-300"
            }`}
          >
            <t.icon size={16} /> {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid items-center gap-10 lg:grid-cols-2"
        >
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">{m.title}</h3>
              <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono-gu text-[10px] uppercase tracking-[0.18em] text-violet-300">
                {m.vertical}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">{m.desc}</p>
            <ul className="mt-8 space-y-4">
              {m.cases.map((c, i) => (
                <motion.li
                  key={c}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
                  className="group flex items-center gap-3 text-sm text-slate-300 sm:text-base"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(0,242,254,0.4)]">
                    <ArrowUpRight size={13} />
                  </span>
                  {c}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan-500/15 to-violet-500/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-slate-700/60">
              <img
                src={m.image}
                alt={m.title}
                loading="lazy"
                className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105 lg:h-96"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050714]/85 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 rounded-full border border-cyan-500/40 bg-[#050714]/70 px-3 py-1 font-mono-gu text-[10px] uppercase tracking-[0.18em] text-cyan-300 backdrop-blur-md">
                {m.title}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
