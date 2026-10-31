"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/content";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

export default function Projects({ projects }: { projects: Project[] }) {
  const [i, setI] = useState(0);
  const p = projects[i];

  const onKey = (e: React.KeyboardEvent) => {
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + projects.length) % projects.length;
    setI(next);
    document.getElementById(`proj-tab-${next}`)?.focus();
  };

  return (
    <Section id="projects">
      <SectionHeading index="03" label="PROJECTS" title="Things I've built" />
      <div className="grid gap-6 md:grid-cols-[17rem_1fr]">
        <div
          role="tablist"
          aria-label="Projects"
          aria-orientation="vertical"
          onKeyDown={onKey}
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-col md:overflow-visible md:px-0 md:pb-0"
        >
          {projects.map((pr, idx) => {
            const on = idx === i;
            return (
              <button
                key={pr.title}
                id={`proj-tab-${idx}`}
                role="tab"
                aria-selected={on}
                aria-controls="proj-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setI(idx)}
                className={`relative shrink-0 rounded-sm border px-4 py-3 text-left transition-colors ${
                  on ? "border-cyan/60 bg-cyan/10 text-ink" : "border-line text-muted hover:border-cyan/40 hover:text-ink"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="proj-bar"
                    className="absolute inset-y-0 left-0 w-1 bg-cyan shadow-[0_0_10px_var(--cyan)]"
                  />
                )}
                <span className="block font-pixel text-[9px] text-magenta">{String(idx + 1).padStart(2, "0")}</span>
                <span className="mt-1 block whitespace-nowrap text-sm font-medium md:whitespace-normal">{pr.title}</span>
              </button>
            );
          })}
        </div>

        <div id="proj-panel" role="tabpanel" aria-labelledby={`proj-tab-${i}`} className="pixel-box accent min-h-[22rem] overflow-hidden">
          <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5" aria-hidden>
            <span className="size-2.5 bg-magenta" />
            <span className="size-2.5 bg-teal" />
            <span className="size-2.5 bg-cyan" />
            <span className="ml-3 font-pixel text-[8px] text-muted">
              PROJECT {i + 1}/{projects.length}
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
              className="p-6 sm:p-8"
            >
              <h3 className="text-2xl font-bold sm:text-3xl">{p.title}</h3>
              {p.subtitle && <p className="mt-1 text-cyan">{p.subtitle}</p>}
              <p className="mt-5 font-serif text-lg font-light leading-relaxed text-ink">{p.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
                {p.tags.map((t) => (
                  <li key={t} className="rounded-sm border border-line bg-bg px-2.5 py-1 text-sm text-teal">
                    {t}
                  </li>
                ))}
              </ul>
              {p.link && (
                <a
                  href={p.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-sm bg-cyan px-4 py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-white"
                >
                  {p.link.label} <span aria-hidden>↗</span>
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
