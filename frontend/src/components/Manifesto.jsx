import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

const problems = [
  "In-vivo exposure therapy carries high cost and real safety risks for patients.",
  "Imaginal therapy relies on the patient — vividness varies, outcomes are inconsistent.",
  "Zero environment control means unpredictable triggers mid-session.",
];

const solutions = [
  "Safe simulations: repeatable, controlled clinical conditions in photorealistic multi-sensory scenes.",
  "Real-time adjustment: the therapist alters trigger intensity instantly, session by session.",
  "Every session is logged — SUDS scores and time-stamped annotations flow straight to the EHR.",
];

const Chapter = ({ number, title, children }) => (
  <div className="flex items-baseline gap-4">
    <span className="font-mono-gu text-sm font-semibold text-cyan-400">{number}</span>
    <div>
      <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">{title}</h3>
      <div className="mt-6">{children}</div>
    </div>
  </div>
);

const Item = ({ icon: Icon, tone, children, delay }) => (
  <motion.li
    initial={{ opacity: 0, x: -24 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay }}
    className="flex items-start gap-3 rounded-xl border border-slate-800/70 bg-slate-900/30 p-4 backdrop-blur-sm"
  >
    <Icon size={18} className={`mt-0.5 shrink-0 ${tone}`} />
    <span className="text-sm leading-relaxed text-slate-300 sm:text-base">{children}</span>
  </motion.li>
);

export default function Manifesto() {
  return (
    <section data-testid="problem-solution-section" className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
      <div className="dot-texture pointer-events-none absolute inset-0 opacity-40" />
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="font-mono-gu text-xs uppercase tracking-[0.25em] text-cyan-400"
      >
        01 — The Paradigm Shift
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mt-4 max-w-2xl font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
      >
        Replacing static imagination <span className="text-gradient-cv">with controlled digital immersion.</span>
      </motion.h2>

      <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div data-testid="problem-card">
          <Chapter number="CH.01" title="Traditional Exposure Therapy">
            <ul className="space-y-4">
              {problems.map((p, i) => (
                <Item key={i} icon={AlertTriangle} tone="text-rose-400" delay={i * 0.12}>
                  {p}
                </Item>
              ))}
            </ul>
          </Chapter>
        </div>
        <div data-testid="solution-card">
          <Chapter number="CH.02" title="The GUniverse Platform">
            <ul className="space-y-4">
              {solutions.map((s, i) => (
                <Item key={i} icon={CheckCircle2} tone="text-cyan-400" delay={i * 0.12}>
                  {s}
                </Item>
              ))}
            </ul>
          </Chapter>
        </div>
      </div>
    </section>
  );
}
