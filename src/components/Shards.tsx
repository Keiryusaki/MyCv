/**
 * Decorative brand-shard layer behind a section's glass cards. The cards'
 * backdrop-filter frosts the fragments crossing underneath — sharp in the gaps,
 * frosted under glass. Purely decorative + non-interactive.
 *
 * Uses the same facet geometry + technique as Naraya's ShardField: 5 distinct
 * logo facets, each placed small (scale ~0.1–0.2) and low-opacity so the glass
 * effect reads instead of the shards dominating. Deterministic (hydration-safe).
 */
export type ShardVariant = "a" | "b" | "c";

/** Maps the raw logo path space into the mark viewBox (from Naraya's shards.ts). */
const GROUP_TRANSFORM = "translate(185.032 0) scale(1.83655)";

/** 5 facet subpaths split from the brand mark (0–3 body, 4 accent). */
const FACETS = [
  "M1503,866.088L1503,1897.09L842,1299.029L1503,866.088Z",
  "M1503,866.088L1503,0L1887.88,279.588C1943.98,324.074 1972.98,385.55 1976.5,433.044C1972.98,480.538 1943.98,542.014 1887.88,586.5L1503,866.088Z",
  "M525,122.5L1268,717L780,1009.5L29.5,390L525,122.5Z",
  "M0,1707.579L0,523.778L664.389,1076.685C610.677,1107.163 519.646,1144.226 524.912,1265.909L524.912,2178L88.608,1861.053C32.495,1816.561 3.499,1755.071 0,1707.579Z",
  "M1976.5,1464C1973,1511.5 1944,1573 1887.88,1617.5L1503,1897.09L1503,866.088L1887.88,586.5C1944,542 1973,480.5 1976.5,433L1976.5,1464Z",
] as const;

type Tone = "primary" | "accent" | "grad";
type Placement = { facet: number; x: number; y: number; rotate: number; scale: number; tone: Tone };

/** Placements across a 1200×1600 viewBox (sliced to fill the section). */
const PRESETS: Record<ShardVariant, Placement[]> = {
  a: [
    { facet: 3, x: 80, y: 120, rotate: -14, scale: 0.16, tone: "primary" },
    { facet: 1, x: 1000, y: 200, rotate: 24, scale: 0.13, tone: "accent" },
    { facet: 4, x: 700, y: 520, rotate: 10, scale: 0.12, tone: "grad" },
    { facet: 2, x: 140, y: 780, rotate: -22, scale: 0.15, tone: "accent" },
    { facet: 0, x: 980, y: 1000, rotate: 36, scale: 0.1, tone: "primary" },
    { facet: 3, x: 360, y: 1260, rotate: 18, scale: 0.18, tone: "grad" },
  ],
  b: [
    { facet: 1, x: 1000, y: 100, rotate: 20, scale: 0.18, tone: "accent" },
    { facet: 2, x: 80, y: 320, rotate: -30, scale: 0.13, tone: "primary" },
    { facet: 4, x: 560, y: 560, rotate: 12, scale: 0.15, tone: "grad" },
    { facet: 0, x: 1020, y: 760, rotate: -18, scale: 0.11, tone: "primary" },
    { facet: 3, x: 160, y: 1020, rotate: 26, scale: 0.16, tone: "accent" },
    { facet: 1, x: 820, y: 1280, rotate: -40, scale: 0.13, tone: "grad" },
  ],
  c: [
    { facet: 4, x: 1000, y: 90, rotate: -16, scale: 0.17, tone: "primary" },
    { facet: 3, x: 60, y: 240, rotate: 22, scale: 0.14, tone: "accent" },
    { facet: 1, x: 720, y: 560, rotate: -28, scale: 0.12, tone: "grad" },
    { facet: 2, x: 180, y: 800, rotate: 30, scale: 0.15, tone: "primary" },
    { facet: 0, x: 1000, y: 1080, rotate: -12, scale: 0.1, tone: "accent" },
    { facet: 3, x: 320, y: 1300, rotate: 16, scale: 0.18, tone: "grad" },
  ],
};

export function Shards({ variant = "a" }: { variant?: ShardVariant }) {
  const gradId = `shard-grad-${variant}`;
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      viewBox="0 0 1200 1600"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(var(--color-primary))" />
          <stop offset="100%" stopColor="rgb(var(--color-accent))" />
        </linearGradient>
        {/* Soft brand glows — give the glass cards something bright to frost so
            the blur reads even on a dark backdrop. */}
        <radialGradient id={`shard-glow-p-${variant}`}>
          <stop offset="0%" stopColor="rgb(var(--color-primary))" stopOpacity="0.28" />
          <stop offset="100%" stopColor="rgb(var(--color-primary))" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`shard-glow-a-${variant}`}>
          <stop offset="0%" stopColor="rgb(var(--color-accent))" stopOpacity="0.28" />
          <stop offset="100%" stopColor="rgb(var(--color-accent))" stopOpacity="0" />
        </radialGradient>
        {FACETS.map((d, i) => (
          <path key={i} id={`shardpath-${variant}-${i}`} d={d} transform={GROUP_TRANSFORM} />
        ))}
        <linearGradient id={`shard-fade-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="9%" stopColor="#fff" stopOpacity="1" />
          <stop offset="91%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`shard-mask-${variant}`}>
          <rect x="0" y="0" width="1200" height="1600" fill={`url(#shard-fade-${variant})`} />
        </mask>
      </defs>

      <g mask={`url(#shard-mask-${variant})`}>
        {/* Brightness wash behind the cards (frosted by the glass on top). */}
        <circle cx="260" cy="320" r="360" fill={`url(#shard-glow-p-${variant})`} />
        <circle cx="980" cy="980" r="380" fill={`url(#shard-glow-a-${variant})`} />
        {PRESETS[variant].map((p, i) => (
          <use
            key={i}
            href={`#shardpath-${variant}-${p.facet}`}
            transform={`translate(${p.x} ${p.y}) rotate(${p.rotate}) scale(${p.scale})`}
            fill={p.tone === "grad" ? `url(#${gradId})` : `rgb(var(--color-${p.tone}))`}
            fillOpacity={p.tone === "grad" ? 0.3 : 0.28}
          />
        ))}
      </g>
    </svg>
  );
}
