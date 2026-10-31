"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import type { Highlight } from "@/lib/content";
import Reveal from "./Reveal";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (reduce) return setN(to);
    if (!inView) return;
    const c = animate(0, to, { duration: 1.2, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref}>{n}</span>;
}

export default function About({
  text,
  highlights,
  hobbies,
}: {
  text: string;
  highlights: Highlight[];
  hobbies: string[];
}) {
  return (
    <Section id="about">
      <SectionHeading index="01" label="ABOUT" title="A bit about me" />
      <div className="grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <p className="font-serif text-2xl font-light leading-snug text-ink sm:text-3xl">{text}</p>
          {hobbies.length > 0 && (
            <div className="mt-8">
              <p className="font-pixel text-[9px] text-magenta">OFF THE CLOCK</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {hobbies.map((h) => (
                  <li key={h} className="rounded-sm border border-line bg-surface/60 px-3 py-1.5 text-sm text-teal">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Reveal>
        <ul className="grid gap-5">
          {highlights.map((h, i) => (
            <li key={h.label}>
              <Reveal delay={i * 0.1}>
                <div
                  className={`pixel-box hoverable flex items-center gap-5 p-5 ${i % 2 ? "md:translate-x-4" : ""}`}
                >
                  <span className="glow-text min-w-[3ch] font-pixel text-3xl text-cyan">
                    <CountUp to={h.value} />
                  </span>
                  <span className="text-[15px] leading-snug text-muted">{h.label}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
