import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Rocket, AlertTriangle, Layers, Orbit, Activity, Globe2, TrendingUp, Handshake } from "lucide-react";

const slides = [
  { icon: Rocket, chapter: "01 · Vision", title: "A multi-planetary VR ecosystem", body: "Clinician-guided immersive environments for exposure therapy, stress reduction, and digital mental healthcare — software-driven and non-biometric by design." },
  { icon: AlertTriangle, chapter: "02 · Problem", title: "Exposure therapy is stuck", body: "In-vivo is costly and risky. Imaginal depends on patient vividness. And there is zero environment control over triggers." },
  { icon: Layers, chapter: "03 · Platform", title: "Three-pillar architecture", body: "Patient VR Engine on Meta Quest 3S, a Therapist Console with WebSocket live control and instant freeze, and encrypted session logging with automated SUDS reporting." },
  { icon: Orbit, chapter: "04 · Ecosystem", title: "Six therapeutic planets", body: "Calm, Confidence, Focus, Sleep, Phobia Worlds, and Recovery Spaces — targeted modules from anxiety and PTSD to musculoskeletal rehabilitation." },
  { icon: Activity, chapter: "05 · Clinical Proof", title: "60% stress · 43% pain reduction", body: "Rapid outcomes in average 6-minute sessions. VR modulates all 5 pain-related brain regions — guided by Harvard brain-wiring research and binaural beats." },
  { icon: Globe2, chapter: "06 · Market & Model", title: "$18.6B market by 2034", body: "VR therapy is growing at 19.3% CAGR. Revenue: $299/seat/mo SaaS for clinics, B2B2C insurance reimbursement pathways, and turnkey hardware bundles." },
  { icon: TrendingUp, chapter: "07 · Traction & Roadmap", title: "Path to commercial scale", body: "MVP in build, then pilots with 5 regional psychology clinics, ISO 13485 / SaMD compliance, and national scale. Projected ARR: $0.4M → $12.5M in 4 years." },
  { icon: Handshake, chapter: "08 · The Ask", title: "Join the pilot cohort", body: "We're onboarding clinical partners and Tier-1 institutions now — and opening conversations with pre-seed investors shaping non-pharmacological care." },
];

export default function PitchModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#050714]/85 p-4 backdrop-blur-xl sm:p-8"
          onClick={onClose}
          data-testid="pitch-modal"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-violet-500/25 bg-[#0a0d24]/95 p-8 shadow-[0_0_60px_rgba(139,92,246,0.18)] sm:p-12"
          >
            <div className="pointer-events-none absolute inset-x-12 top-0 h-px neon-line" />
            <button
              onClick={onClose}
              data-testid="pitch-modal-close-btn"
              aria-label="Close pitch highlights"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/70 text-slate-400 transition-all duration-300 hover:border-cyan-400/60 hover:text-cyan-300"
            >
              <X size={16} />
            </button>

            <p className="font-mono-gu text-xs uppercase tracking-[0.25em] text-cyan-400">GUniverse · Pitch Highlights</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Next-gen therapeutic VR, <span className="text-gradient-cv">clinician-guided.</span>
            </h2>

            <div className="mt-10 space-y-4">
              {slides.map((s, i) => (
                <motion.div
                  key={s.chapter}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                  className="flex items-start gap-4 rounded-2xl glass-card p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-300">
                    <s.icon size={18} />
                  </span>
                  <div>
                    <p className="font-mono-gu text-[10px] uppercase tracking-[0.2em] text-violet-300">{s.chapter}</p>
                    <h3 className="mt-1 font-display text-base font-semibold text-white sm:text-lg">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{s.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <a
              href="#contact"
              onClick={onClose}
              data-testid="pitch-modal-cta-btn"
              className="mt-10 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-7 py-3.5 text-sm font-semibold text-[#050714] transition-all duration-300 hover:shadow-[0_0_32px_rgba(0,242,254,0.5)] hover:brightness-110"
            >
              Request Pilot Access
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
