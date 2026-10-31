import type { Content } from "@/lib/content";
import Pixel, { ARROW_UP } from "./Pixel";

export default function Footer({ c }: { c: Content }) {
  return (
    <footer className="relative border-t-4 border-line bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-muted sm:flex-row sm:px-8">
        <p>
          © {new Date().getFullYear()} {c.name}. Built with love &amp; a lot of pixels.
        </p>
        <a href="#top" className="group flex items-center gap-2 transition-colors hover:text-cyan">
          Back to top
          <span className="grid size-7 place-items-center border border-line transition-colors group-hover:border-cyan">
            <Pixel grid={ARROW_UP} palette={{ o: "currentColor" }} size={2} />
          </span>
        </a>
      </div>
    </footer>
  );
}
