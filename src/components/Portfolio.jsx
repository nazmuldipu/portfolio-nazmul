import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Download, Mail } from "lucide-react";
// lucide-react dropped brand icons; react-icons (Feather set) matches its style.
import { FiGithub as Github, FiLinkedin as Linkedin } from "react-icons/fi";

import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { AspectRatio } from "@/src/components/ui/aspect-ratio";

// ── Content ─────────────────────────────────────────────────────────────────
// The syllabus rail is the signature element: a numbered spine that doubles as
// nav and scroll-progress. Bengali labels are real (Nazmul is a native speaker) —
// a quiet personal touch rather than a gimmick.
const SECTIONS = [
  { id: "top", n: "01", en: "Thesis", bn: "ভূমিকা" },
  { id: "about", n: "02", en: "About", bn: "পরিচিতি" },
  { id: "experience", n: "03", en: "Path", bn: "পথ" },
  { id: "skills", n: "04", en: "Stack", bn: "দক্ষতা" },
  { id: "work", n: "05", en: "Work", bn: "কাজ" },
  { id: "contact", n: "06", en: "Contact", bn: "যোগাযোগ" },
];

// Every piece of profile content comes from Sanity (the `data` prop). There are
// no content fallbacks: if a field is missing, its block renders empty rather
// than showing stand-in copy, so nothing on the page is ever stale or invented.
// `SECTIONS` above is the only hard-coded text — it's the site's section nav
// (information architecture), not profile data. The CV path below is the lone
// exception: it falls back to the real PDF committed in /public.
const CV_FALLBACK = "/nazmul_alam_cv.pdf";

// ── Small presentational helpers ──────────────────────────────────────────────
function Highlight({ children }) {
  return (
    <span className="box-decoration-clone rounded-[2px] bg-marker/70 px-1.5 text-on-marker">
      {children}
    </span>
  );
}

// Highlights the first occurrence of `keyword` inside `text` (CMS-driven accent).
function Headline({ text, keyword }) {
  const i = keyword ? text.indexOf(keyword) : -1;
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <Highlight>{keyword}</Highlight>
      {text.slice(i + keyword.length)}
    </>
  );
}

function SectionLabel({ n, en }) {
  return (
    <h2 className="mb-8 mt-0 flex items-baseline gap-3 font-normal">
      <span className="font-display text-sm font-semibold text-indigo">
        {n}
      </span>
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/70">
        {en}
      </span>
    </h2>
  );
}

function socialIcon(s) {
  const slug = (s.slug || s.name || "").toLowerCase();
  if (slug.includes("git")) return Github;
  if (slug.includes("link")) return Linkedin;
  return Mail;
}

// ── The signature element: persistent syllabus rail ──────────────────────────
function SyllabusRail({ active, name }) {
  const index = Math.max(
    0,
    SECTIONS.findIndex((s) => s.id === active)
  );
  const progress = ((index + 1) / SECTIONS.length) * 100;

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Sections"
      className="fixed left-0 top-0 z-20 hidden h-screen w-56 flex-col justify-center px-8 lg:flex"
    >
      <div className="mb-10 font-display text-base font-bold tracking-tight">
        {name}
      </div>
      <div className="relative flex flex-col gap-5 pl-5">
        {/* spine + marker-yellow progress fill */}
        <span className="absolute left-0 top-1 bottom-1 w-px bg-rule" />
        <span
          className="absolute left-0 top-1 w-px bg-marker transition-[height] duration-500 ease-out"
          style={{ height: `calc(${progress}% - 0.25rem)` }}
        />
        {SECTIONS.map((s) => {
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => go(s.id)}
              className="group flex items-baseline gap-2 rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
            >
              <span
                className={`font-display text-xs font-semibold tabular-nums transition-colors ${
                  isActive ? "text-indigo" : "text-ink/60"
                }`}
              >
                {s.n}
              </span>
              <span className="flex flex-col">
                <span
                  className={`text-sm transition-colors group-hover:text-ink ${
                    isActive ? "font-semibold text-ink" : "text-ink/70"
                  }`}
                >
                  {s.en}
                </span>
                <span className="font-bengali text-[11px] leading-tight text-ink/60">
                  {s.bn}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Portfolio({ data }) {
  const [active, setActive] = useState("top");

  // All profile content is sourced from Sanity (the `data` prop). Missing
  // fields resolve to empty, never to invented copy.
  const p = data || {};
  const name = p.name || "";
  const locationLine = [p.location?.city, p.location?.country]
    .filter(Boolean)
    .join(", ");
  const eyebrow = p.eyebrow || "";
  const headline = p.headline || "";
  const highlight = p.highlight || "";
  const intro = p.intro || "";
  const aboutSubtitle = p.about?.subtitle || "";
  const eduLine = p.about?.eduLine || "";
  const avatarUrl = p.avatarUrl || null;
  const portraitUrl = p.portraitUrl || avatarUrl;
  const skillGroups = p.skillGroups || [];
  const experience = p.experience || [];
  const currentCompany = (experience[0]?.company || "").split(",")[0].trim();
  const aboutFacts = [
    eyebrow && {
      label: "Currently",
      value: currentCompany ? `${eyebrow} at ${currentCompany}` : eyebrow,
    },
    locationLine && { label: "Based in", value: locationLine },
    eduLine && { label: "Education", value: eduLine },
  ].filter(Boolean);
  const socials = p.socials || [];
  const projects = p.projects || [];
  const contactHeadline = p.contactHeadline || "";
  const contactSubtitle = p.contactSubtitle || "";
  const cvUrl = p.cvUrl || CV_FALLBACK;
  const initials =
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "·";

  useEffect(() => {
    // Track the active section for the rail.
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) sectionObserver.observe(el);
    });

    // The single orchestrated motion: reveal each block once as it enters view.
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            revealObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document
      .querySelectorAll(".portfolio-root .reveal")
      .forEach((el) => revealObserver.observe(el));

    return () => {
      sectionObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  return (
    <div className="portfolio-root min-h-screen">
      <SyllabusRail active={active} name={name} />

      <main className="mx-auto max-w-3xl px-6 sm:px-8 lg:ml-56 lg:max-w-3xl lg:px-16 xl:ml-72">
        {/* 01 — HERO / THESIS */}
        <section
          id="top"
          className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden py-20"
        >
          {/* subtle generated glow — low-intensity atmosphere behind the thesis */}
          <div aria-hidden className="hero-glow" />
          {locationLine && (
            <p className="reveal text-sm text-ink/65">{locationLine}</p>
          )}
          <p className="reveal mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-ink/70">
            {eyebrow}
          </p>
          <h1 className="reveal mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            <Headline text={headline} keyword={highlight} />
          </h1>
          <p className="reveal mt-7 max-w-xl text-lg leading-relaxed text-ink/70">
            {intro}
          </p>
          <div className="reveal mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="group"
              onClick={() =>
                document
                  .getElementById("work")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View projects{" "}
              <ArrowDown className="transition-transform duration-200 group-hover:translate-y-0.5" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={cvUrl} target="_blank" rel="noreferrer">
                Download CV <Download />
              </a>
            </Button>
          </div>
        </section>

        <Separator />

        {/* 02 — ABOUT */}
        <section id="about" className="py-20 md:py-28">
          <SectionLabel n="02" en="About" />
          <div className="grid gap-9 md:grid-cols-[220px_1fr] md:gap-12">
            {/* framed portrait — the section's focal point */}
            <div className="reveal">
              <div className="relative isolate w-full max-w-[260px] md:max-w-none">
                <div
                  aria-hidden
                  className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-indigo/10"
                />
                <div className="relative overflow-hidden rounded-2xl bg-ink/5 shadow-[var(--lift)] ring-1 ring-rule">
                  <AspectRatio ratio={4 / 5}>
                    {portraitUrl ? (
                      <img
                        src={portraitUrl}
                        alt={name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-display text-4xl text-ink/65">
                        {initials}
                      </div>
                    )}
                  </AspectRatio>
                </div>
              </div>
              <div className="mt-5">
                <div className="font-display text-lg font-semibold">{name}</div>
                {locationLine && (
                  <div className="text-sm text-ink/70">{locationLine}</div>
                )}
              </div>
            </div>

            {/* narrative + structured facts */}
            <div className="reveal">
              <p className="text-xl leading-relaxed text-ink/80 md:text-2xl md:leading-relaxed">
                {aboutSubtitle}
              </p>
              {aboutFacts.length > 0 && (
                <dl className="mt-9 flex flex-col gap-4 border-t border-rule pt-7">
                  {aboutFacts.map((f) => (
                    <div key={f.label} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                      <dt className="w-28 shrink-0 pt-0.5 text-xs font-semibold uppercase tracking-[0.16em] text-indigo">
                        {f.label}
                      </dt>
                      <dd className="text-sm leading-relaxed text-ink/80">
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </section>

        <Separator />

        {/* 03 — PATH */}
        <section id="experience" className="py-20 md:py-28">
          <div className="reveal">
            <SectionLabel n="03" en="Path" />
          </div>
          <ol className="flex flex-col">
            {experience.map((job, i) => (
              <li
                key={`${job.company}-${i}`}
                className="reveal grid grid-cols-[auto_1fr] gap-x-5"
              >
                {/* timeline gutter */}
                <div className="flex flex-col items-center">
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full border-2 border-indigo bg-paper" />
                  {i < experience.length - 1 && (
                    <span className="my-1 w-px flex-1 bg-rule" />
                  )}
                </div>
                <div className="pb-10">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-display text-lg font-semibold">
                      {job.role}
                    </h3>
                    <span className="text-xs font-medium tabular-nums text-ink/45">
                      {job.period}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-indigo">
                    {job.company}
                  </div>
                  <ul className="mt-3 flex flex-col gap-2">
                    {(job.points || []).map((pt, j) => (
                      <li
                        key={j}
                        className="flex gap-2.5 text-sm leading-relaxed text-ink/70"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/30"
                        />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <Separator />

        {/* 04 — STACK */}
        <section id="skills" className="py-20 md:py-28">
          <div className="reveal">
            <SectionLabel n="04" en="Stack" />
            <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="font-display text-sm font-semibold text-ink">
                    {group.title}
                  </h3>
                  <Separator className="my-3" />
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* 05 — WORK */}
        <section id="work" className="py-20 md:py-28">
          <div className="reveal">
            <SectionLabel n="05" en="Work" />
          </div>
          <div className="flex flex-col gap-5">
            {projects.map((proj, i) => {
              const href = proj.url || proj.repo;
              const LinkIcon = proj.repo ? Github : ArrowUpRight;
              return (
              <Card
                key={`${proj.title}-${i}`}
                className="reveal group overflow-hidden transition-shadow hover:shadow-[var(--lift)]"
              >
                {proj.image && (
                  <div className="overflow-hidden border-b border-rule bg-ink/5">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={proj.image}
                        alt={proj.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                    </AspectRatio>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-display text-xl font-semibold">
                        {proj.title}
                      </div>
                      {proj.kicker && (
                        <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-indigo">
                          {proj.kicker}
                        </div>
                      )}
                    </div>
                    {href && (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${proj.title} — ${
                          proj.repo ? "GitHub repository" : "visit site"
                        }`}
                        className="rounded-md p-1.5 text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo"
                      >
                        <LinkIcon className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-base leading-relaxed text-ink/75">
                    {proj.outcome}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {proj.tech.map((t) => (
                      <Badge key={t} variant="outline">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              );
            })}
          </div>
        </section>

        <Separator />

        {/* 06 — CONTACT */}
        <section id="contact" className="py-20 md:py-28">
          <div className="reveal">
            <SectionLabel n="06" en="Contact" />
            <h2 className="max-w-xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {contactHeadline}
            </h2>
            {contactSubtitle && (
              <p className="mt-4 max-w-lg text-lg text-ink/65">
                {contactSubtitle}
              </p>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {socials.map((s, i) => {
                const Icon = socialIcon(s);
                const isMail = s.href.startsWith("mailto:");
                const label = isMail ? s.href.replace("mailto:", "") : s.name;
                return (
                  <Button
                    key={s.href}
                    variant={i === 0 ? "default" : "outline"}
                    asChild
                  >
                    <a
                      href={s.href}
                      {...(isMail
                        ? {}
                        : { target: "_blank", rel: "noreferrer" })}
                    >
                      <Icon /> {label}
                      {!isMail && <ArrowUpRight />}
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>
        </section>

        <Separator />
        <footer className="py-8 text-xs text-ink/65">
          Designed &amp; built by {name} · Bricolage Grotesque + IBM Plex Sans
        </footer>
      </main>
    </div>
  );
}
