import fs from "node:fs";
import path from "node:path";

export type Project = {
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  link?: { label: string; href: string };
};
export type Experience = {
  role: string;
  company: string;
  dates: string;
  place?: string;
  bullets: string[];
};
export type Education = { degree: string; school: string; year: string };
export type SkillGroup = { name: string; skills: string[] };
export type Highlight = { value: number; label: string };
export type RoadmapItem = { text: string; done: boolean; goal: boolean };
export type Content = {
  name: string;
  title: string;
  location: string;
  tagline: string;
  about: string;
  contactNote: string;
  contact: { email: string; linkedin: string; github: string };
  projects: Project[];
  skillGroups: SkillGroup[];
  roadmap: RoadmapItem[];
  highlights: Highlight[];
  ticker: string[];
  experience: Experience[];
  education?: Education;
  hobbies: string[];
};

/** Splits markdown into `{ heading: body }` at the given heading level. */
function sections(md: string, level: number): Record<string, string> {
  const marker = "#".repeat(level) + " ";
  const out: Record<string, string> = {};
  let key: string | null = null;
  let buf: string[] = [];
  const flush = () => {
    if (key !== null) out[key] = buf.join("\n").trim();
  };
  for (const line of md.split("\n")) {
    if (line.startsWith(marker)) {
      flush();
      key = line.slice(marker.length).trim();
      buf = [];
    } else if (key !== null) buf.push(line);
  }
  flush();
  return out;
}

const oneLine = (s: string) => s.replace(/\s*\n\s*/g, " ").trim();

function parseProject(heading: string, body: string): Project {
  const [title, ...rest] = heading.split(" — ");
  const tags: string[] = [];
  let link: Project["link"];
  const desc: string[] = [];
  for (const line of body.split("\n")) {
    const l = line.trim();
    const linkMatch = l.match(/^\[(.+?)\]\((.+?)\)$/);
    if (linkMatch) link = { label: linkMatch[1], href: linkMatch[2] };
    else if (/^(`[^`]+`\s*)+$/.test(l)) {
      for (const m of l.matchAll(/`([^`]+)`/g)) tags.push(m[1]);
    } else desc.push(l);
  }
  return {
    title: title.trim(),
    subtitle: rest.join(" — ") || undefined,
    description: oneLine(desc.join("\n")),
    tags,
    link,
  };
}

export function getContent(): Content {
  const md = fs.readFileSync(
    path.join(process.cwd(), "content", "content.md"),
    "utf8",
  );
  const lines = md.split("\n");
  const name = lines.find((l) => l.startsWith("# "))?.slice(2).trim() ?? "";
  const headLines = md.split(/\n## /)[0].split("\n");
  const subtitle =
    headLines.find((l, i) => i > 0 && l.trim() && !l.startsWith(">")) ?? "";
  const [title, location = ""] = subtitle.split(" — ").map((s) => s.trim());
  const tagline = oneLine(
    headLines
      .filter((l) => l.startsWith(">"))
      .map((l) => l.replace(/^>\s?/, ""))
      .join("\n"),
  );

  const top = sections(md, 2);

  const contactLines = top["Contact"].split("\n");
  const field = (label: string) => {
    const line = contactLines.find((l) =>
      l.toLowerCase().startsWith(`- ${label.toLowerCase()}:`),
    );
    return line ? line.slice(line.indexOf(":") + 1).trim() : "";
  };

  const projects = Object.entries(sections(top["Projects"], 3)).map(([h, b]) =>
    parseProject(h, b),
  );

  const skillGroups = Object.entries(sections(top["Skills"], 3)).map(
    ([name, body]) => ({
      name,
      skills: oneLine(body)
        .split("·")
        .map((s) => s.trim())
        .filter(Boolean),
    }),
  );

  const roadmap = top["Roadmap"]
    .split("\n")
    .map((l) => l.match(/^- \[( |x)\]\s+(.*)$/i))
    .filter((m): m is RegExpMatchArray => !!m)
    .map((m) => {
      const goal = /^target:/i.test(m[2]);
      return {
        done: m[1].toLowerCase() === "x",
        goal,
        text: goal ? m[2].replace(/^target:\s*/i, "") : m[2],
      };
    });

  const bullets = (body: string) =>
    body
      .split("\n")
      .filter((l) => l.startsWith("- "))
      .map((l) => l.slice(2).trim());

  const highlights = bullets(top["Highlights"] ?? "")
    .map((l) => l.split("|").map((x) => x.trim()))
    .filter((p) => p.length === 2 && !Number.isNaN(Number(p[0])))
    .map(([v, label]) => ({ value: Number(v), label }));

  const experience = Object.entries(sections(top["Experience"] ?? "", 3)).map(
    ([heading, body]) => {
      const [role, ...co] = heading.split(" — ");
      const lines = body.split("\n");
      const meta = lines.find((l) => l.trim() && !l.startsWith("- ")) ?? "";
      const [dates, ...place] = meta.split(" · ").map((x) => x.trim());
      return {
        role: role.trim(),
        company: co.join(" — ").trim(),
        dates,
        place: place.join(" · ") || undefined,
        bullets: bullets(body),
      };
    },
  );

  const [degree, ...edu] = (top["Education"] ?? "").split(" — ");
  const eduParts = edu.join(" — ").split(",").map((x) => x.trim());
  const education = degree.trim()
    ? {
        degree: degree.trim(),
        year: eduParts.length > 1 ? eduParts[eduParts.length - 1] : "",
        school: eduParts.slice(0, -1).join(", ") || eduParts[0],
      }
    : undefined;

  return {
    experience,
    education,
    hobbies: bullets(top["Hobbies"] ?? ""),
    highlights,
    ticker: bullets(top["Ticker"] ?? ""),
    name,
    title,
    location,
    tagline,
    about: oneLine(top["About"]),
    contactNote: oneLine(top["Contact"].split("\n").filter((l) => !l.startsWith("- ")).join("\n")),
    contact: {
      email: field("Email"),
      linkedin: field("LinkedIn"),
      github: field("GitHub"),
    },
    projects,
    skillGroups,
    roadmap,
  };
}
