"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SkillGroup } from "@/lib/content";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

const tones = ["text-cyan", "text-magenta", "text-teal", "text-ink"];

export default function Skills({ groups }: { groups: SkillGroup[] }) {
  const [filter, setFilter] = useState("All");
  const tabs = ["All", ...groups.map((g) => g.name)];

  return (
    <Section id="skills">
      <SectionHeading index="04" label="SKILLS" title="What I work with" />
      <div role="group" aria-label="Filter skills" className="mb-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={filter === t}
            onClick={() => setFilter(t)}
            className={`rounded-sm border px-3 py-1.5 text-sm transition-colors ${
              filter === t ? "border-cyan bg-cyan text-bg" : "border-line text-muted hover:border-cyan/50 hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-5">
        <AnimatePresence mode="popLayout" initial={false}>
          {groups.map((g, gi) =>
            filter === "All" || filter === g.name ? (
              <motion.div
                key={g.name}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="rounded-sm border border-line bg-surface/60 p-5 sm:p-6"
              >
                <h3 className="font-pixel text-[10px] text-muted">{g.name.toUpperCase()}</h3>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {g.skills.map((s) => (
                    <motion.li
                      key={s}
                      whileHover={{ y: -4, rotate: -2, scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      className={`cursor-default rounded-sm border border-line bg-bg px-4 py-2 text-base transition-colors hover:border-current ${tones[gi % tones.length]}`}
                    >
                      {s}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ) : null,
          )}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
