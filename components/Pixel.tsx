/** Renders a character grid as crisp SVG pixels. Keys of `palette` map chars to fills; "." is empty. */
export default function Pixel({
  grid,
  palette,
  size = 8,
  className,
  title,
}: {
  grid: string[];
  palette: Record<string, string>;
  size?: number;
  className?: string;
  title?: string;
}) {
  const w = grid[0].length;
  const h = grid.length;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * size}
      height={h * size}
      shapeRendering="crispEdges"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {grid.flatMap((row, y) =>
        [...row].map((ch, x) =>
          ch === "." || !palette[ch] ? null : (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={palette[ch]}
              className={ch === "e" ? "sprite-eye" : undefined}
            />
          ),
        ),
      )}
    </svg>
  );
}

export const CAT = [
  ".oo......oo.",
  ".obo....obo.",
  ".obbooooobbo",
  "obbbbbbbbbbo",
  "obbeebbeebbo",
  "obbeebbeebbo",
  "obpbbnnbbpbo",
  "obbbbbbbbbbo",
  ".obbbbbbbbo.",
  "..oooooooo..",
];
export const CAT_PALETTE = {
  o: "#1b6f86",
  b: "#5ef2ff",
  e: "#080b16",
  p: "#ff9be4",
  n: "#ff6ad5",
};

export const HEART = [
  ".oo.oo.",
  "ooooooo",
  "ooooooo",
  ".ooooo.",
  "..ooo..",
  "...o...",
];
export const STAR = [
  "...o...",
  "...o...",
  "ooooooo",
  ".ooooo.",
  ".oo.oo.",
  "oo...oo",
];

export const MAIL = [
  "ooooooooo",
  "oo.....oo",
  "o.o...o.o",
  "o..o.o..o",
  "o...o...o",
  "o.......o",
  "ooooooooo",
];
export const GITHUB = [
  "o.ooooo.o",
  ".ooooooo.",
  "ooooooooo",
  "ooooooooo",
  ".ooooooo.",
  "..ooooo..",
  "..o.o.o..",
];
export const LINKEDIN = [
  "ooooooooo",
  "ooooooooo",
  "oo.oooooo",
  "ooooooooo",
  "oo.o....o",
  "oo.o.oo.o",
  "oo.o.oo.o",
  "oo.o.oo.o",
  "ooooooooo",
];

export const MOON = [
  "..ooooo..",
  ".ooooooo.",
  "ooo.oooo.",
  "ooooooooo",
  "oooooo.oo",
  "ooooooooo",
  ".ooooooo.",
  "..ooooo..",
];

// Pixel girl, two walk frames sharing the same upper body.
const GIRL_TOP = [
  "..hhhhhh..",
  ".hhhhhhhh.",
  ".hssssssh.",
  ".hsessesh.",
  ".hpssssph.",
  ".h.ssss.h.",
  "..dddddd..",
  ".dddddddd.",
  "sdddddddds",
  "sdddddddds",
  ".dddddddd.",
  "dddddddddd",
  "DDDDDDDDDD",
];
export const GIRL_A = [...GIRL_TOP, "..ll..ll..", "..ll..ll..", ".bbb..bbb."];
export const GIRL_B = [...GIRL_TOP, "...ll.ll..", "...ll.ll..", "..bbb.bbb."];
export const GIRL_PALETTE = {
  h: "#ff6ad5",
  s: "#ffd9c2",
  e: "#080b16",
  p: "#ff9be4",
  d: "#5ef2ff",
  D: "#1b9bb0",
  l: "#ffd9c2",
  b: "#ff6ad5",
};

export const SUN = [
  "...ooooo...",
  "..ooooooo..",
  ".ooooooooo.",
  "ooooooooooo",
  "ooooooooooo",
  "ooooooooooo",
  "ooooooooooo",
  "ooooooooooo",
  ".ooooooooo.",
  "..ooooooo..",
  "...ooooo...",
];


export const CHUTE = [
  "....mcmcmcmc....",
  "..mcmcmcmcmcmc..",
  ".mcmcmcmcmcmcmc.",
  "mcmcmcmcmcmcmcmc",
  "m.c.m.c..c.m.c.m",
];

export const ARROW_UP = [
  "...o...",
  "..ooo..",
  ".ooooo.",
  "ooooooo",
  "..ooo..",
  "..ooo..",
];
