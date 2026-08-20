const PALETTES = [
  ["#2A1417", "#7A1F2B"],
  ["#1D1818", "#3D2226"],
  ["#4A1017", "#A6293A"],
  ["#211B1B", "#5C2530"],
  ["#3A1015", "#8C2436"],
  ["#181414", "#4A1017"],
];

function paletteFor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return PALETTES[hash % PALETTES.length];
}

export default function Placeholder({
  label,
  sublabel,
  className = "",
}: {
  label: string;
  sublabel?: string;
  className?: string;
}) {
  const [from, to] = paletteFor(label);
  return (
    <div
      className={`relative flex items-end overflow-hidden ${className}`}
      style={{
        backgroundImage: `linear-gradient(155deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      <div className="absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(45deg,#F6F3EC_0,#F6F3EC_1px,transparent_1px,transparent_10px)]" />
      <div className="relative z-10 p-4">
        <p className="font-display italic text-paper/90 text-sm leading-tight">{label}</p>
        {sublabel && <p className="text-paper/50 text-[11px] tracking-wide mt-0.5">{sublabel}</p>}
      </div>
    </div>
  );
}
