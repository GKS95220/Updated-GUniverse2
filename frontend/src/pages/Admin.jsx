import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Loader2, LogOut, Users, Mail, Building2, RefreshCw, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/Navbar";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function formatApiErrorDetail(detail) {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail.map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e))).filter(Boolean).join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}

function LoginCard({ onSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post(`${API}/auth/login`, form, { withCredentials: true });
      onSuccess(data);
    } catch (err) {
      setError(formatApiErrorDetail(err.response?.data?.detail));
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-slate-700/70 bg-slate-900/50 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-cyan-400/70 focus:shadow-[0_0_16px_rgba(0,242,254,0.15)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-md rounded-3xl glass-card p-8 shadow-[0_8px_40px_rgba(0,0,0,0.4)] sm:p-10"
    >
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px neon-line" />
      <Logo testid="admin-login-logo" />
      <h1 className="mt-8 font-display text-2xl font-bold text-white">Admin Access</h1>
      <p className="mt-2 text-sm text-slate-400">Sign in to view pilot access requests.</p>
      {error && (
        <div data-testid="admin-login-error" className="mt-5 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          {error}
        </div>
      )}
      <form data-testid="admin-login-form" onSubmit={onSubmit} className="mt-6 space-y-5">
        <div>
          <label htmlFor="admin-email" className="mb-1.5 block font-mono-gu text-[11px] uppercase tracking-[0.16em] text-slate-400">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            required
            data-testid="admin-email-input"
            placeholder="admin@guniverse.health"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="admin-password" className="mb-1.5 block font-mono-gu text-[11px] uppercase tracking-[0.16em] text-slate-400">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            required
            data-testid="admin-password-input"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className={inputCls}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          data-testid="admin-login-submit-btn"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-7 py-3.5 text-sm font-semibold text-[#050714] transition-all duration-300 hover:shadow-[0_0_32px_rgba(0,242,254,0.5)] hover:brightness-110 disabled:opacity-60"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : "Sign In"}
        </button>
      </form>
    </motion.div>
  );
}

function Dashboard({ user, onLogout }) {
  const [leads, setLeads] = useState(null);

  const load = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/leads`, { withCredentials: true });
      setLeads(data);
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          await axios.post(`${API}/auth/refresh`, {}, { withCredentials: true });
          const { data } = await axios.get(`${API}/leads`, { withCredentials: true });
          setLeads(data);
          return;
        } catch {
          onLogout();
          return;
        }
      }
      toast.error("Failed to load leads.");
      setLeads([]);
    }
  }, [onLogout]);

  useEffect(() => {
    load();
  }, [load]);

  const logout = async () => {
    await axios.post(`${API}/auth/logout`, {}, { withCredentials: true }).catch(() => {});
    onLogout();
  };

  return (
    <div data-testid="admin-dashboard" className="mx-auto w-full max-w-6xl px-6 py-28 lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono-gu text-xs uppercase tracking-[0.25em] text-cyan-400">Admin Console</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-white">Pilot Access Leads</h1>
          <p className="mt-1 text-sm text-slate-500">Signed in as {user.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={load}
            data-testid="admin-refresh-btn"
            className="flex items-center gap-2 rounded-full border border-slate-700/70 px-4 py-2.5 text-sm text-slate-300 transition-all hover:border-cyan-400/60 hover:text-cyan-300"
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <button
            onClick={logout}
            data-testid="admin-logout-btn"
            className="flex items-center gap-2 rounded-full border border-rose-500/40 px-4 py-2.5 text-sm text-rose-300 transition-all hover:bg-rose-500/10"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <div className="rounded-2xl glass-card p-6">
          <div className="flex items-center gap-3 text-cyan-300"><Users size={18} /><span className="font-mono-gu text-xs uppercase tracking-[0.18em]">Total Leads</span></div>
          <p data-testid="admin-total-leads" className="mt-3 font-display text-4xl font-extrabold text-gradient">{leads ? leads.length : "—"}</p>
        </div>
        <div className="rounded-2xl glass-card p-6">
          <div className="flex items-center gap-3 text-violet-300"><Building2 size={18} /><span className="font-mono-gu text-xs uppercase tracking-[0.18em]">Organizations</span></div>
          <p data-testid="admin-total-orgs" className="mt-3 font-display text-4xl font-extrabold text-gradient">{leads ? new Set(leads.map((l) => l.organization)).size : "—"}</p>
        </div>
        <div className="rounded-2xl glass-card p-6">
          <div className="flex items-center gap-3 text-cyan-300"><Mail size={18} /><span className="font-mono-gu text-xs uppercase tracking-[0.18em]">Latest</span></div>
          <p data-testid="admin-latest-lead" className="mt-3 truncate font-display text-lg font-semibold text-white">{leads && leads[0] ? leads[0].name : "—"}</p>
          <p className="mt-1 text-xs text-slate-500">{leads && leads[0] ? new Date(leads[0].created_at).toLocaleString() : ""}</p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl glass-card">
        {leads === null ? (
          <div className="flex items-center justify-center gap-3 py-20 text-slate-400">
            <Loader2 size={18} className="animate-spin" /> Loading leads...
          </div>
        ) : leads.length === 0 ? (
          <p data-testid="admin-empty-leads" className="py-20 text-center text-sm text-slate-500">No pilot requests yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table data-testid="leads-table" className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 font-mono-gu text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Organization</th>
                  <th className="px-6 py-4">Message</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} data-testid={`lead-row-${l.id}`} className="border-b border-slate-800/60 transition-colors last:border-0 hover:bg-slate-800/20">
                    <td className="whitespace-nowrap px-6 py-4 text-slate-500">{new Date(l.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-medium text-white">{l.name}</td>
                    <td className="px-6 py-4 text-cyan-300">{l.email}</td>
                    <td className="px-6 py-4 text-slate-300">{l.organization}</td>
                    <td className="max-w-xs truncate px-6 py-4 text-slate-400" title={l.message}>{l.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Admin() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/auth/me`, { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(false));
  }, []);

  if (user === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050714]">
        <Loader2 size={24} className="animate-spin text-cyan-400" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#050714]">
      <div className="grid-texture pointer-events-none fixed inset-0 opacity-40" />
      <div className="hero-glow pointer-events-none fixed inset-0" />
      <div className="relative">
        <Link
          to="/"
          data-testid="admin-back-home-link"
          className="absolute left-6 top-6 z-10 flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-300 lg:left-10"
        >
          <ArrowLeft size={15} /> Back to site
        </Link>
        {user ? (
          <Dashboard user={user} onLogout={() => setUser(false)} />
        ) : (
          <div className="flex min-h-screen items-center justify-center px-6">
            <LoginCard onSuccess={setUser} />
          </div>
        )}
      </div>
    </div>
  );
}
