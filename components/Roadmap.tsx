"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import type { RoadmapItem } from "@/lib/content";
import Reveal from "./Reveal";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

export default function Roadmap({ items }: { items: RoadmapItem[] }) {
  const currentIdx = items.findIndex((i) => !i.done && !i.goal);
  const done = items.filter((i) => i.done).length;
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <Section id="roadmap">
      <SectionHeading index="05" label="ROADMAP" title="Where I'm headed next" />
      <div className="mb-10 max-w-md">
        <p className="text-muted">My skill-building plan for the next 1–2 years.</p>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-2 flex-1 bg-line" role="progressbar" aria-valuemin={0} aria-valuemax={items.length} aria-valuenow={done}>
            <div className="h-full bg-teal" style={{ width: `${(done / items.length) * 100}%` }} />
          </div>
          <span className="font-pixel text-[9px] text-teal">
            {done}/{items.length}
          </span>
        </div>
      </div>

      <ol ref={ref} className="relative ml-3 border-l-2 border-line">
        <motion.span
          aria-hidden
          style={{ scaleY: fill }}
          className="absolute -left-[2px] top-0 h-full w-[2px] origin-top bg-cyan shadow-[0_0_10px_var(--cyan)]"
        />
        {items.map((it, i) => {
          const state = it.done ? "done" : it.goal ? "goal" : i === currentIdx ? "current" : "todo";
          const marker = {
            done: "bg-teal border-teal",
            current: "bg-bg border-cyan pulse-glow shadow-[0_0_12px_var(--cyan)]",
            goal: "bg-magenta border-magenta shadow-[0_0_12px_var(--magenta)]",
            todo: "bg-bg border-line",
          }[state];
          const badge = {
            done: ["COMPLETE", "text-teal"],
            current: ["IN PROGRESS", "text-cyan"],
            goal: ["TARGET", "text-magenta"],
            todo: [`LEVEL ${String(i + 1).padStart(2, "0")}`, "text-muted"],
          }[state];
          return (
            <li key={it.text} className="group relative pb-8 pl-8 last:pb-0">
              <span
                aria-hidden
                className={`absolute -left-[9px] top-1.5 size-4 border-2 transition-transform group-hover:scale-125 ${marker}`}
              />
              <Reveal>
                <div className="rounded-sm border border-transparent px-3 py-2 transition-colors group-hover:border-line group-hover:bg-surface/60">
                  <p className={`font-pixel text-[9px] ${badge[1]}`}>{badge[0]}</p>
                  <p
                    className={`mt-2 text-lg sm:text-xl ${state === "todo" ? "text-ink/80" : "font-medium"} ${state === "done" ? "line-through decoration-teal/50" : ""}`}
                  >
                    {it.text}
                  </p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
