"use client";

import { useEffect, useState } from "react";
import Pixel, { MOON, SUN } from "./Pixel";

/** Small night/sunset switch pinned to the upper right. */
export default function ThemeToggle() {
  const [sunset, setSunset] = useState(false);

  useEffect(() => {
    setSunset(document.documentElement.dataset.theme === "sunset");
  }, []);

  const toggle = () => {
    const next = !sunset;
    setSunset(next);
    if (next) document.documentElement.dataset.theme = "sunset";
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem("theme", next ? "sunset" : "night");
    } catch {}
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={sunset}
      aria-label="Sunset mode"
      title={sunset ? "Switch to night" : "Switch to sunset"}
      onClick={toggle}
      className="glow-shadow fixed right-3 top-[26px] z-50 h-7 w-14 rounded-sm border-2 border-line bg-surface/80 backdrop-blur-md sm:right-5"
    >
      <span className="absolute inset-y-0 left-1.5 grid place-items-center text-muted/60" aria-hidden>
        <Pixel grid={MOON} palette={{ o: "currentColor" }} size={1.5} />
      </span>
      <span className="absolute inset-y-0 right-1.5 grid place-items-center text-muted/60" aria-hidden>
        <Pixel grid={SUN} palette={{ o: "currentColor" }} size={1} />
      </span>
      <span
        aria-hidden
        className={`absolute top-0.5 grid size-5 place-items-center bg-cyan text-bg transition-transform duration-200 ease-out ${
          sunset ? "translate-x-[28px]" : "translate-x-0.5"
        }`}
      >
        {sunset ? (
          <Pixel grid={SUN} palette={{ o: "currentColor" }} size={1} />
        ) : (
          <Pixel grid={MOON} palette={{ o: "currentColor" }} size={1.5} />
        )}
      </span>
    </button>
  );
}
