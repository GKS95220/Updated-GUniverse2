import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Platform", href: "#platform", testid: "nav-link-platform" },
  { name: "Applications", href: "#applications", testid: "nav-link-applications" },
  { name: "Technology", href: "#technology", testid: "nav-link-technology" },
  { name: "Traction", href: "#traction", testid: "nav-link-traction" },
  { name: "About Us", href: "#about", testid: "nav-link-about" },
  { name: "Contact", href: "#contact", testid: "nav-link-contact" },
];

export const Logo = ({ testid }) => (
  <a href="#top" data-testid={testid} className="flex items-center gap-2.5 group">
    <span className="relative flex h-9 w-9 items-center justify-center">
      <span className="absolute inset-0 rounded-xl bg-gradient-to-tr from-cyan-400 to-violet-500 opacity-0 blur-[8px] transition-opacity duration-500 group-hover:opacity-70" />
      <img
        src="/guniverse-logo.png"
        alt="GUniverse logo"
        className="relative h-9 w-9 rounded-xl border border-slate-700/60 object-cover shadow-[0_0_14px_rgba(139,92,246,0.3)]"
      />
    </span>
    <span className="font-display text-lg font-bold tracking-tight text-white">
      G<span className="text-gradient-cv">Universe</span>
    </span>
  </a>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      data-testid="header-navigation"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav border-b border-cyan-500/15 shadow-[0_4px_30px_rgba(0,242,254,0.05)]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Logo testid="nav-logo" />
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              data-testid={l.testid}
              className="group relative text-sm font-medium text-slate-300 transition-colors duration-300 hover:text-white"
            >
              {l.name}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            data-testid="nav-request-pilot-btn"
            className="hidden rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-2.5 text-sm font-semibold text-[#050714] transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,242,254,0.45)] hover:brightness-110 lg:inline-block"
          >
            Request Pilot Access
          </a>
          <button
            data-testid="nav-mobile-menu-btn"
            onClick={() => setOpen(!open)}
            className="rounded-lg border border-slate-700/60 p-2 text-slate-300 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="glass-nav overflow-hidden border-b border-cyan-500/15 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  data-testid={`${l.testid}-mobile`}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800/50 hover:text-white"
                >
                  {l.name}
                </a>
              ))}
              <a
                href="#contact"
                data-testid="nav-request-pilot-btn-mobile"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-2.5 text-center text-sm font-semibold text-[#050714]"
              >
                Request Pilot Access
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
