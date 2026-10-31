import Pixel, { STAR } from "./Pixel";

export default function SectionHeading({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  return (
    <div className="relative mb-10">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 right-0 select-none font-pixel text-6xl text-ink/[0.05] sm:text-8xl"
      >
        {index}
      </span>
      <p className="flex items-center gap-2 font-pixel text-[10px] tracking-wider text-magenta">
        <Pixel grid={STAR} palette={{ o: "currentColor" }} size={2} />
        {index} / {label}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">{title}</h2>
    </div>
  );
}
