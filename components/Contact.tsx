"use client";

import { useState } from "react";
import type { Content } from "@/lib/content";
import Reveal from "./Reveal";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import Skyline from "./Skyline";

export default function Contact({ c }: { c: Content }) {
  const [from, setFrom] = useState("");
  const [msg, setMsg] = useState("");
  const { email, linkedin, github } = c.contact;

  // No backend needed: opens the visitor's mail app with the message prefilled.
  const href = `mailto:${email}?subject=${encodeURIComponent(
    `Hello from ${from || "your portfolio"}`,
  )}&body=${encodeURIComponent(msg)}`;

  const field =
    "w-full rounded-sm border border-line bg-bg px-3 py-2.5 text-[15px] text-ink placeholder:text-muted/70 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan";

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%]" aria-hidden>
        <Skyline seed={23} minH={40} maxH={100} minW={14} maxW={30} body="var(--b-near)" windowDensity={0.4} className="h-full w-full" />
      </div>
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <Section id="contact" className="pb-[22vh]">
          <SectionHeading index="05" label="CONTACT" title="Let's talk" />
          <Reveal>
            <div className="pixel-box accent grid gap-8 p-6 sm:p-10 md:grid-cols-2">
              <div>
                <p className="text-xl leading-relaxed text-ink/90">
                  {c.contactNote} Whether it&apos;s a role, a project, or just swapping notes on Flutter and .NET,
                  I&apos;d like to hear from you.
                </p>
                <a
                  href={`mailto:${email}`}
                  className="mt-6 inline-flex items-center rounded-sm bg-cyan px-5 py-3 text-sm font-semibold text-bg transition-colors hover:bg-white"
                >
                  {email}
                </a>
                <div className="mt-4 flex gap-5 text-sm">
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">
                    LinkedIn ↗
                  </a>
                  <a href={github} target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">
                    GitHub ↗
                  </a>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = href;
                }}
                className="space-y-3"
              >
                <label className="block text-sm text-muted">
                  Your name
                  <input value={from} onChange={(e) => setFrom(e.target.value)} className={`${field} mt-1`} placeholder="Jane Doe" autoComplete="name" />
                </label>
                <label className="block text-sm text-muted">
                  Say hi
                  <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={4} className={`${field} mt-1 resize-y`} placeholder="What's on your mind?" />
                </label>
                <button
                  type="submit"
                  className="rounded-sm border border-cyan px-4 py-2.5 text-sm font-medium text-cyan transition-colors hover:bg-cyan hover:text-bg"
                >
                  Open in my email app
                </button>
              </form>
            </div>
          </Reveal>
        </Section>
      </div>
    </div>
  );
}
