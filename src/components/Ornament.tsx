/** Fixed full-bleed backdrop: radial brand glows + faint grid + floating shards. */
export function Ornament() {
  return (
    <div className="cv-backdrop" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 800"
      >
        <g className="animate-float" style={{ transformOrigin: "center" }}>
          <polygon points="120,140 260,90 230,250" fill="rgb(var(--color-primary) / 0.06)" />
          <polygon points="980,120 1120,180 1010,300" fill="rgb(var(--color-accent) / 0.06)" />
          <polygon points="300,620 460,560 420,720" fill="rgb(var(--color-primary) / 0.05)" />
          <polygon points="860,640 1000,600 940,760" fill="rgb(var(--color-accent) / 0.05)" />
        </g>
      </svg>
    </div>
  );
}
