"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Pixel, { CAT, CAT_PALETTE } from "./Pixel";

const links: [string, string][] = [
  ["About", "about"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Skills", "skills"],
  ["Contact", "contact"],
];

export default function Nav({ name }: { name: string }) {
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const els = ["top", ...links.map(([, id]) => id)]
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-cyan shadow-[0_0_10px_var(--cyan)]"
        aria-hidden
      />
      <header className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-3">
        <nav
          aria-label="Primary"
          className="glow-shadow pointer-events-auto relative flex h-12 items-center gap-1 rounded-sm border-2 border-line bg-surface/80 px-2 backdrop-blur-md sm:gap-2 sm:px-3"
        >
          <a href="#top" className="mr-1 flex items-center gap-2 pr-1 sm:mr-2" aria-label={`${name} — top`}>
            <Pixel grid={CAT} palette={CAT_PALETTE} size={2.5} />
            <span className="hidden font-pixel text-[10px] text-cyan sm:inline">
              {name.split(" ")[0].toUpperCase()}
            </span>
          </a>

          <ul className="hidden items-center md:flex">
            {links.map(([label, id]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`relative block px-3 py-1.5 text-sm transition-colors ${
                    active === id ? "text-cyan" : "text-muted hover:text-ink"
                  }`}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-sm border border-cyan/50 bg-cyan/10"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="grid size-9 place-items-center rounded-sm border border-line md:hidden"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="block h-0.5 w-4 bg-ink shadow-[0_5px_0_var(--ink),0_-5px_0_var(--ink)]" />
          </button>

          <AnimatePresence>
            {open && (
              <motion.ul
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute right-0 top-full mt-2 w-44 rounded-sm border-2 border-line bg-surface p-1 md:hidden"
              >
                {links.map(([label, id]) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={() => setOpen(false)}
                      className={`block px-3 py-2 text-sm ${active === id ? "text-cyan" : "text-ink"}`}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </>
  );
}
