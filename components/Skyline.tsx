import { useMemo } from "react";

const W = 480;
const H = 120;

/** Small deterministic PRNG so server and client render identical skylines. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

export default function Skyline({
  seed,
  minH,
  maxH,
  minW,
  maxW,
  body,
  windowDensity,
  className,
}: {
  seed: number;
  minH: number;
  maxH: number;
  minW: number;
  maxW: number;
  body: string;
  windowDensity: number;
  className?: string;
}) {
  const { bodyPath, wins, twinkle } = useMemo(() => {
    const r = rng(seed);
    const int = (a: number, b: number) => a + Math.floor(r() * (b - a + 1));
    const wins: Record<string, string> = { "#ffd36e": "", "#5ef2ff": "", "#ff6ad5": "" };
    const colors = Object.keys(wins);
    let twinkle = "";
    let bodyPath = "";
    for (let x = 0; x < W; ) {
      const w = int(minW, maxW);
      const h = int(minH, maxH);
      const top = H - h;
      bodyPath += `M${x} ${top}h${w}v${h}h-${w}z`;
      if (r() < 0.25) bodyPath += `M${x + Math.floor(w / 2)} ${top - int(3, 7)}h1v7h-1z`;
      for (let wx = x + 2; wx + 2 <= x + w - 1; wx += 4) {
        for (let wy = top + 4; wy + 2 < H - 2; wy += 5) {
          if (r() > windowDensity) continue;
          const d = `M${wx} ${wy}h2v2h-2z`;
          if (r() < 0.12) twinkle += d;
          else wins[colors[Math.floor(r() * colors.length)]] += d;
        }
      }
      x += w + int(0, 1);
    }
    return { bodyPath, wins, twinkle };
  }, [seed, minH, maxH, minW, maxW, windowDensity]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden
    >
      <path d={bodyPath} style={{ fill: body }} />
      {Object.entries(wins).map(([c, d]) => (
        <path key={c} d={d} fill={c} style={{ opacity: "var(--win-op)" }} />
      ))}
      <path d={twinkle} fill="#ffd36e" className="twinkle" />
    </svg>
  );
}
