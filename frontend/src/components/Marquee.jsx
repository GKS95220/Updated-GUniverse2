const items = [
  "Spatial Therapeutics",
  "WebXR Native",
  "Digital Therapeutics",
  "Immersive Learning",
  "Clinical Analytics",
  "Neuro-Rehabilitation",
  "Multi-Platform XR",
  "Evidence-Backed Protocols",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div data-testid="editorial-marquee" className="relative overflow-hidden border-y border-slate-800/70 bg-[#070a1c] py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#050714] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#050714] to-transparent" />
      <div className="marquee-track flex w-max items-center gap-10">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-lg font-medium tracking-wide text-slate-500 transition-colors hover:text-cyan-300">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rotate-45 bg-gradient-to-tr from-cyan-400 to-violet-500" />
          </span>
        ))}
      </div>
    </div>
  );
}
