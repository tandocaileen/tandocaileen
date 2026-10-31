import type { Content } from "@/lib/content";
import Pixel from "./Pixel";
import Reveal from "./Reveal";
import Section from "./Section";
import SectionHeading from "./SectionHeading";

const CAP = [
  "...oooo...",
  ".oooooooo.",
  "oooooooooo",
  ".oooooooo.",
  "...o..o...",
  "...o..o...",
];

export default function Experience({
  items,
  education,
}: {
  items: Content["experience"];
  education: Content["education"];
}) {
  return (
    <Section id="experience">
      <SectionHeading index="02" label="EXPERIENCE" title="Where I've worked" />
      <ol className="relative ml-3 border-l-2 border-line">
        {items.map((e, i) => (
          <li key={e.role + e.company} className="relative pb-10 pl-8 last:pb-0">
            <span
              aria-hidden
              className={`absolute -left-[9px] top-2 size-4 border-2 ${
                i === 0 ? "pulse-glow border-cyan bg-cyan shadow-[0_0_12px_var(--cyan)]" : "border-line bg-bg"
              }`}
            />
            <Reveal>
              <article className="pixel-box hoverable p-5 sm:p-6">
                <p className="font-pixel text-[9px] text-magenta">{e.dates.toUpperCase()}</p>
                <h3 className="mt-3 text-xl font-bold sm:text-2xl">{e.role}</h3>
                <p className="mt-1 text-cyan">
                  {e.company}
                  {e.place && <span className="text-muted"> · {e.place}</span>}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-ink/85 sm:text-base">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-teal" />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>

      {education && (
        <Reveal className="mt-10">
          <div className="flex items-center gap-4 rounded-sm border border-line bg-surface/60 p-4 sm:p-5">
            <span className="text-teal">
              <Pixel grid={CAP} palette={{ o: "currentColor" }} size={4} />
            </span>
            <div>
              <p className="font-pixel text-[9px] text-magenta">EDUCATION</p>
              <p className="mt-2 font-medium">{education.degree}</p>
              <p className="text-sm text-muted">
                {education.school}
                {education.year && ` · ${education.year}`}
              </p>
            </div>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
