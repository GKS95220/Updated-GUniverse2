import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const fields = [
  { name: "name", label: "Full Name", placeholder: "Dr. Alex Morgan", type: "text", testid: "lead-form-name" },
  { name: "email", label: "Institutional Email", placeholder: "alex.morgan@hospital.org", type: "email", testid: "lead-form-email" },
  { name: "organization", label: "Organization / Institution", placeholder: "Stanford Health Care", type: "text", testid: "lead-form-org" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", organization: "", message: "" });
  const [status, setStatus] = useState("idle");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axios.post(`${API}/leads`, form);
      setStatus("success");
      toast.success("Request received — our team will reach out shortly.");
    } catch (err) {
      setStatus("idle");
      toast.error("Something went wrong. Please try again.");
    }
  };

  const inputCls =
    "w-full rounded-xl border border-slate-700/70 bg-slate-900/50 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none backdrop-blur-sm transition-all duration-300 focus:border-cyan-400/70 focus:shadow-[0_0_16px_rgba(0,242,254,0.15)]";

  return (
    <section id="contact" data-testid="cta-banner-section" className="relative overflow-hidden py-28 lg:py-36">
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-cyan-500/10 to-violet-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono-gu text-xs uppercase tracking-[0.25em] text-cyan-400">06 — Get Involved</p>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Partner with GUniverse for <span className="text-gradient-cv">Next-Gen Spatial Care</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
            Whether you are a healthcare provider, research institution, or investor — join us in building
            the future of immersive digital therapeutics.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <span className="pulse-orb h-3 w-3 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500" />
            <span className="font-mono-gu text-xs uppercase tracking-[0.18em] text-slate-500">
              Pilot cohort onboarding now
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative rounded-3xl glass-card p-8 shadow-[0_8px_40px_rgba(0,0,0,0.4)] sm:p-10"
        >
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px neon-line" />
          {status === "success" ? (
            <div data-testid="lead-form-success-msg" className="flex flex-col items-center py-14 text-center">
              <CheckCircle2 size={48} className="text-cyan-400 drop-shadow-[0_0_14px_rgba(0,242,254,0.5)]" />
              <h3 className="mt-5 font-display text-xl font-semibold text-white">Request received</h3>
              <p className="mt-2 max-w-xs text-sm text-slate-400">
                Thank you for your interest in GUniverse. Our team will contact you within 48 hours.
              </p>
            </div>
          ) : (
            <form data-testid="lead-capture-form" onSubmit={onSubmit} className="space-y-5">
              {fields.map((f) => (
                <div key={f.name}>
                  <label htmlFor={f.name} className="mb-1.5 block font-mono-gu text-[11px] uppercase tracking-[0.16em] text-slate-400">
                    {f.label}
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    required
                    data-testid={f.testid}
                    placeholder={f.placeholder}
                    value={form[f.name]}
                    onChange={onChange}
                    className={inputCls}
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="mb-1.5 block font-mono-gu text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  Message / Use Case Interest
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  data-testid="lead-form-message"
                  placeholder="Describe your pilot requirements..."
                  value={form.message}
                  onChange={onChange}
                  className={`${inputCls} resize-none`}
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                data-testid="lead-form-submit-btn"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-7 py-3.5 text-sm font-semibold text-[#050714] transition-all duration-300 hover:shadow-[0_0_32px_rgba(0,242,254,0.5)] hover:brightness-110 disabled:opacity-60"
              >
                {status === "loading" ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    Request Pilot Access
                    <Send size={15} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
