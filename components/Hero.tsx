"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Content } from "@/lib/content";
import Pixel, { GITHUB, LINKEDIN, MAIL, MOON, SUN } from "./Pixel";
import Skyline from "./Skyline";


// Deterministic star field (percent positions).
const STARS = Array.from({ length: 48 }, (_, i) => {
  const a = (i * 9301 + 49297) % 233280;
  const b = (i * 7919 + 12345) % 233280;
  return { x: (a / 233280) * 100, y: (b / 233280) * 60, t: i % 5 === 0 };
});

/** Types each line out, pauses, deletes, then moves to the next. */
function useTypewriter(lines: string[], disabled: boolean) {
  const [text, setText] = useState(disabled ? (lines[0] ?? "") : "");
  useEffect(() => {
    if (disabled || !lines.length) return;
    let li = 0;
    let ci = 0;
    let deleting = false;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const line = lines[li];
      ci += deleting ? -1 : 1;
      setText(line.slice(0, ci));
      let delay = deleting ? 25 : 55;
      if (!deleting && ci === line.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && ci === 0) {
        deleting = false;
        li = (li + 1) % lines.length;
        delay = 350;
      }
      t = setTimeout(tick, delay);
    };
    t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, [lines, disabled]);
  return text;
}

export default function Hero({ c }: { c: Content }) {
  const reduce = useReducedMotion() ?? false;
  const typed = useTypewriter(c.ticker, reduce);
  const { scrollY } = useScroll();
  const range = (to: number) => useTransform(scrollY, [0, 900], [0, reduce ? 0 : to]);
  const skyY = range(220);
  const farY = range(150);
  const midY = range(90);
  const nearY = range(35);
  const fade = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      id="top"
      className="sky relative flex min-h-[100svh] snap-start items-start justify-center overflow-hidden px-5 pt-32 sm:items-center sm:pt-0"
    >
      {/* Sky: stars + moon (night) / sun (sunset) */}
      <motion.div style={{ y: skyY }} className="absolute inset-0" aria-hidden>
        {STARS.map((s, i) => (
          <span
            key={i}
            className="star absolute"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
          >
            <span
              className={`block size-[3px] bg-white/80 ${s.t ? "twinkle" : ""}`}
              style={{ animationDelay: `${(i % 7) * 0.4}s` }}
            />
          </span>
        ))}
        <div className="only-night absolute right-[12%] top-[16%] drop-shadow-[0_0_28px_rgba(255,236,170,0.55)]">
          <Pixel grid={MOON} palette={{ o: "#fff1b8" }} size={7} />
        </div>
        <div className="only-sunset absolute bottom-[26%] left-1/2 -translate-x-1/2 drop-shadow-[0_0_60px_rgba(255,200,100,0.8)]">
          <Pixel grid={SUN} palette={{ o: "#ffe08a" }} size={16} />
        </div>
      </motion.div>

      {/* Skyline layers, far to near */}
      <motion.div style={{ y: farY }} className="absolute inset-x-0 bottom-0 h-[44%]" aria-hidden>
        <Skyline seed={11} minH={55} maxH={110} minW={14} maxW={30} body="var(--b-far)" windowDensity={0.25} className="h-full w-full opacity-80" />
      </motion.div>
      <motion.div style={{ y: midY }} className="absolute inset-x-0 bottom-0 h-[34%]" aria-hidden>
        <Skyline seed={42} minH={45} maxH={100} minW={14} maxW={26} body="var(--b-mid)" windowDensity={0.35} className="h-full w-full" />
      </motion.div>
      <motion.div style={{ y: nearY }} className="absolute inset-x-0 bottom-0 h-[24%]" aria-hidden>
        <Skyline seed={7} minH={40} maxH={95} minW={16} maxW={34} body="var(--b-near)" windowDensity={0.4} className="h-full w-full" />
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-bg" aria-hidden />

      {/* Centered content */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-2xl pb-[26vh] text-center sm:pb-[18vh]"
      >
        <p className="font-pixel text-[10px] tracking-wider text-teal">HELLO, WORLD</p>
        <h1 className="glow-text mt-5 text-5xl font-extrabold tracking-tight sm:text-7xl">{c.name}</h1>
        <p className="mt-4 text-lg font-medium text-cyan sm:text-xl">
          {c.title} <span className="text-ink/60">· {c.location}</span>
        </p>
        <p className="mt-6 min-h-[2lh] font-pixel text-[11px] leading-loose text-ink/85 sm:text-xs">
          I build <span className="text-magenta">{typed}</span>
          <span className="cursor" aria-hidden />
        </p>
        <p className="sr-only">{c.ticker.join(", ")}</p>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink/75">{c.tagline}</p>
        <ul className="mt-9 flex justify-center gap-6">
          {[
            { label: "Email", href: `mailto:${c.contact.email}`, grid: MAIL, ext: false },
            { label: "LinkedIn", href: c.contact.linkedin, grid: LINKEDIN, ext: true },
            { label: "GitHub", href: c.contact.github, grid: GITHUB, ext: true },
          ].map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                aria-label={l.label}
                {...(l.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group relative block p-1 text-[var(--icon)] drop-shadow-[0_0_8px_var(--icon-glow)] transition duration-200 hover:-translate-y-1 hover:text-[var(--icon-hover)] focus-visible:text-[var(--icon-hover)]"
              >
                <Pixel grid={l.grid} palette={{ o: "currentColor" }} size={5} />
                <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap font-pixel text-[8px] text-[var(--icon)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  {l.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.a
        href="#about"
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center font-pixel text-[8px] text-ink/70 hover:text-cyan"
      >
        SCROLL
        <span className="nudge mt-2 block text-base leading-none" aria-hidden>▾</span>
      </motion.a>
    </section>
  );
}
