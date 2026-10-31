"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Pixel, { CHUTE, GIRL_A, GIRL_B, GIRL_PALETTE, HEART } from "./Pixel";

export default function ScrollGirl({ email }: { email: string }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const top = useSpring(useTransform(scrollYProgress, [0, 1], ["24vh", "74vh"]), {
    stiffness: 80,
    damping: 20,
  });
  const ref = useRef<HTMLDivElement>(null);
  const [arrived, setArrived] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => setArrived(v > 0.97));

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      ref.current?.setAttribute("data-moving", "");
      clearTimeout(t);
      t = setTimeout(() => ref.current?.removeAttribute("data-moving"), 160);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      style={{ top: reduce ? "60vh" : top }}
      className="girl pointer-events-none fixed right-6 z-20 sm:right-12"
    >
      <div className={arrived ? "hop relative" : "sway relative"}>
        {arrived && (
          <a
            href={`mailto:${email}?subject=${encodeURIComponent("Hi Aileen!")}`}
            style={{ animationDelay: "0.8s" }}
            className="pop pointer-events-auto absolute right-full top-0 mr-5 block w-52 rounded-sm border-2 border-cyan bg-surface p-3 text-sm shadow-[0_0_20px_rgb(var(--glow)/0.35)] transition-colors hover:bg-bg sm:w-60"
          >
            <span className="flex items-center gap-2 font-semibold text-ink">
              Yay, you made it!
              <Pixel grid={HEART} palette={{ o: "var(--magenta)" }} size={2} />
            </span>
            <span className="mt-1 block text-muted">
              Want to talk? <span className="font-medium text-cyan">Say hi →</span>
            </span>
            <span
              aria-hidden
              className="absolute -right-[9px] top-5 size-4 rotate-45 border-r-2 border-t-2 border-cyan bg-surface"
            />
          </a>
        )}
        <div
          className={`absolute bottom-full left-1/2 -translate-x-1/2 ${arrived ? "chute-away" : ""}`}
          aria-hidden
        >
          <Pixel grid={CHUTE} palette={{ m: "var(--magenta)", c: "var(--cyan)" }} size={4} className="block" />
          <svg width="64" height="22" viewBox="0 0 64 22" className="block" shapeRendering="crispEdges">
            <path d="M2 0 L32 22 M32 0 V22 M62 0 L32 22" stroke="var(--ink)" strokeOpacity="0.7" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
        <div
          aria-hidden
          className="relative h-[48px] w-[30px] drop-shadow-[0_0_10px_rgba(255,106,213,0.6)] sm:h-[64px] sm:w-[40px]"
        >
          <div className="walk-a absolute inset-0">
            <Pixel grid={GIRL_A} palette={GIRL_PALETTE} size={3} className="h-full w-full sm:hidden" />
            <Pixel grid={GIRL_A} palette={GIRL_PALETTE} size={4} className="hidden h-full w-full sm:block" />
          </div>
          <div className="walk-b absolute inset-0">
            <Pixel grid={GIRL_B} palette={GIRL_PALETTE} size={3} className="h-full w-full sm:hidden" />
            <Pixel grid={GIRL_B} palette={GIRL_PALETTE} size={4} className="hidden h-full w-full sm:block" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
