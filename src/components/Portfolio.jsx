import { useEffect, useState } from "react";

import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { AspectRatio } from "@/src/components/ui/aspect-ratio";

// ── Layout constants ──────────────────────────────────────────────────────────
// Single 1180px content column, centered, 40px horizontal padding. Section
// vertical rhythm: ~104px on the paper/mist surfaces, ~120px on the mint bookends.
const COL = "mx-auto w-full max-w-[1180px] px-6 md:px-10";

// In-page section nav (information architecture — the only hard-coded labels).
const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
];

// Editorial section headings. These are layout copy (like the section labels),
// not profile data — all substantive content below is sourced from Sanity.
const HEADINGS = {
  about: "Hand me the feature your team is wary of.",
  work: "Things I’ve built and shipped.",
  workIntro:
    "From a nationwide math platform to hotel booking engines and high-performance static sites.",
  experience: "Eight years across product teams.",
  skills: "What I work with.",
};

// The static-site builds are presented as one tinted module grouping the live
// links; its framing copy is design-level, the tiles themselves come from Sanity.
const SITES_CARD = {
  label: "2021 → 2022 · ELEVENTY",
  title: "High-performance static sites",
  description:
    "A set of fast, lean marketing sites for hotels and restaurants — built on Eleventy, ES6, and Tailwind for near-instant loads.",
};

const ABOUT_STATS = [
  { n: "8+", c: "Years shipping production web apps" },
  { n: "Full-stack", c: "Java & Node · React, Svelte, Angular" },
  { n: "Lead", c: "Design & code reviews · mentoring" },
];

const CONTACT_FALLBACK =
  "I take on freelance and consulting work. Tell me what you’re building and I’ll tell you how I’d approach it.";

// ── Brand mark ────────────────────────────────────────────────────────────────
// Custom "N" monogram for Nazmul: two emerald verticals joined by a gold
// diagonal — the letter literally drawn as the palette (emerald structure, the
// one gold spark as its energy).
function Monogram({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Nazmul Alam monogram"
    >
      <line x1="6" y1="26" x2="6" y2="6" stroke="#0C4034" strokeWidth="4" strokeLinecap="round" />
      <line x1="26" y1="6" x2="26" y2="26" stroke="#0C4034" strokeWidth="4" strokeLinecap="round" />
      <line x1="6" y1="6" x2="26" y2="26" stroke="#BC7F19" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

// Faint monogram watermark, used as decorative texture. Inherits the current
// text color so it can tint to emerald on the light surfaces.
function Watermark({ className }) {
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="6" y1="26" x2="6" y2="6" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="26" y1="6" x2="26" y2="26" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="6" y1="6" x2="26" y2="26" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Small presentational helpers ──────────────────────────────────────────────
// Eyebrow: gold bar + mono uppercase label, sitting on the light surfaces.
function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden className="h-0.5 w-8 shrink-0 bg-gold" />
      <span className="font-mono text-[13px] font-medium uppercase tracking-[0.14em] text-graphite">
        {children}
      </span>
    </div>
  );
}

const hostLabel = (url) =>
  (url || "")
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");

const formatPhone = (phone) =>
  (phone || "").replace(/^(\+\d{3})(\d{4})(\d+)$/, "$1 $2 $3");

function TechChips({ items, tone = "tech" }) {
  if (!items?.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <Badge key={t} variant={tone}>
          {t}
        </Badge>
      ))}
    </div>
  );
}

// Live-link with an arrow that nudges right on hover. Emerald on light surfaces,
// warming to gold on hover.
function LiveLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link mt-5 inline-flex items-center gap-1.5 font-semibold text-emerald transition-colors hover:text-gold"
    >
      {children}
      <span className="transition-transform duration-200 group-hover/link:translate-x-1">
        →
      </span>
    </a>
  );
}

// ── Sticky top nav ────────────────────────────────────────────────────────────
function Nav({ name }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 h-[72px] border-b border-rule bg-paper/80 backdrop-blur-[12px] backdrop-saturate-150">
      <div className={`${COL} flex h-full items-center justify-between`}>
        <a href="#top" className="flex items-center gap-2.5">
          <Monogram className="h-7 w-7" />
          <span className="text-[17px] font-bold tracking-[-0.01em] text-emerald">
            {name}
          </span>
        </a>

        <nav className="flex items-center gap-7">
          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[15px] font-medium text-ink transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            ))}
          </div>
          <Button asChild size="sm" className="h-auto px-5 py-2.5">
            <a href="#contact">Get in touch</a>
          </Button>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-emerald md:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d={open ? "M5 5l10 10M15 5L5 15" : "M3 6h14M3 10h14M3 14h14"}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-b border-rule bg-paper/95 backdrop-blur-[12px] md:hidden">
          <div className={`${COL} flex flex-col gap-1 py-3`}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md py-2 text-[15px] font-medium text-ink hover:text-gold"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

// ── Project cards ─────────────────────────────────────────────────────────────
const CARD_HOVER =
  "transition-[border-color,box-shadow] duration-200 hover:border-emerald-20 hover:shadow-[0_14px_40px_rgba(12,64,52,0.12)]";

function FeatureCard({ project }) {
  return (
    <article
      className={`reveal group grid overflow-hidden rounded-[24px] border border-rule bg-card ${CARD_HOVER} md:grid-cols-[1.05fr_0.95fr]`}
    >
      {project.image && (
        <div className="overflow-hidden bg-mist">
          <AspectRatio ratio={1}>
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </AspectRatio>
        </div>
      )}
      <div className="flex flex-col p-8 md:p-10">
        <div className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-gold">
          {project.label}
        </div>
        <h3 className="mt-3 font-display text-[26px] font-bold leading-tight tracking-[-0.01em] text-emerald md:text-[30px]">
          {project.title}
        </h3>
        <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.6] text-graphite md:text-base">
          {project.description}
        </p>
        <div className="mt-auto pt-7">
          <TechChips items={project.tech} />
        </div>
        {project.url && (
          <LiveLink href={project.url}>{hostLabel(project.url)}</LiveLink>
        )}
      </div>
    </article>
  );
}

function ProjectCard({ project }) {
  return (
    <article
      className={`reveal group flex flex-col overflow-hidden rounded-[24px] border border-rule bg-card ${CARD_HOVER}`}
    >
      {project.image && (
        <div className="overflow-hidden border-b border-rule bg-mist">
          <AspectRatio ratio={16 / 10}>
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </AspectRatio>
        </div>
      )}
      <div className="flex flex-1 flex-col p-8">
        <div className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-graphite">
          {project.label}
        </div>
        <h3 className="mt-2.5 font-display text-[23px] font-bold leading-tight tracking-[-0.01em] text-emerald">
          {project.title}
        </h3>
        <p className="mt-2.5 text-[15px] leading-[1.6] text-graphite">
          {project.description}
        </p>
        <div className="mt-auto pt-7">
          <TechChips items={project.tech} />
        </div>
        {project.url && <LiveLink href={project.url}>Live</LiveLink>}
      </div>
    </article>
  );
}

function SitesCard({ links }) {
  return (
    <article className="reveal grid gap-8 overflow-hidden rounded-[24px] border border-emerald-20 bg-emerald-tint p-8 md:grid-cols-[0.8fr_1.2fr] md:p-10">
      <div>
        <div className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-gold">
          {SITES_CARD.label}
        </div>
        <h3 className="mt-3 font-display text-[26px] font-bold leading-tight tracking-[-0.01em] text-emerald md:text-[30px]">
          {SITES_CARD.title}
        </h3>
        <p className="mt-3 max-w-[40ch] text-[15px] leading-[1.6] text-graphite">
          {SITES_CARD.description}
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {links.map((t) => (
          <a
            key={t.href}
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/tile flex items-center justify-between gap-3 rounded-[14px] border border-emerald-20 bg-card px-4 py-3.5 transition-colors hover:border-emerald hover:bg-emerald-tint"
          >
            <span className="text-[15px] font-medium text-emerald">{t.label}</span>
            <span className="text-gold transition-transform duration-200 group-hover/tile:translate-x-1">
              →
            </span>
          </a>
        ))}
      </div>
    </article>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Portfolio({
  data,
  showStats = true,
  showWatermark = true,
}) {
  // All profile content is sourced from Sanity (the `data` prop). Missing fields
  // resolve to empty, never to invented copy.
  const p = data || {};
  const name = p.name || "";
  const role = p.role || "";
  const city = p.location?.city || "";
  const country = p.location?.country || "";
  const locationLine = [city, country].filter(Boolean).join(", ");
  const headline = p.headline || "";
  const intro = p.intro || "";
  const portraitUrl = p.portraitUrl || null;
  const aboutLead = p.aboutLead || "";
  const feature = p.projects?.feature || null;
  const standard = p.projects?.standard || [];
  const siteLinks = p.projects?.siteLinks || [];
  const skillGroups = p.skillGroups || [];
  const experience = p.experience || [];
  const education = p.education || [];
  const contact = p.contact || {};
  const socials = p.socials || [];

  // Reveal-on-scroll: a single, calm fade-up for content as it enters view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document
      .querySelectorAll(".portfolio-root .reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="portfolio-root min-h-screen bg-paper">
      <Nav name={name} />

      {/* ── HERO (mint) ── */}
      <section
        id="top"
        className="relative isolate overflow-hidden bg-mint"
      >
        {showWatermark && (
          <Watermark className="pointer-events-none absolute -bottom-16 right-4 w-[520px] max-w-[55%] text-emerald opacity-[0.06]" />
        )}
        <div
          className={`${COL} grid items-center gap-12 py-24 md:grid-cols-[1.15fr_0.85fr] md:gap-[72px] md:py-[120px]`}
        >
          <div>
            <Eyebrow>
              {[role, locationLine].filter(Boolean).join(" · ")}
            </Eyebrow>
            <h1 className="mt-6 max-w-[14ch] font-display text-[40px] font-bold leading-[1.05] tracking-[-0.025em] text-emerald sm:text-[52px] md:text-[60px]">
              {headline}
            </h1>
            <p className="mt-7 max-w-[54ch] text-[17px] leading-[1.6] text-ink/80 md:text-[19px]">
              {intro}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button variant="emerald" size="lg" asChild>
                <a href="#contact">Start a project</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#work">See selected work</a>
              </Button>
            </div>
            <div className="mt-9 inline-flex items-center gap-2.5 rounded-full border border-emerald-20 bg-card/60 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-gold ring-4 ring-gold/25" />
              <span className="font-mono text-[13px] text-graphite">
                Available for freelance &amp; consulting
              </span>
            </div>
          </div>

          {portraitUrl && (
            <div className="overflow-hidden rounded-[20px] bg-emerald/5 ring-1 ring-emerald-20">
              <AspectRatio ratio={4 / 5}>
                <img
                  src={portraitUrl}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              </AspectRatio>
            </div>
          )}
        </div>
      </section>

      {/* ── ABOUT (paper) ── */}
      <section id="about" className="border-t border-rule bg-paper">
        <div
          className={`${COL} grid gap-12 py-20 md:grid-cols-[0.9fr_1.1fr] md:gap-[72px] md:py-[104px]`}
        >
          <div className="reveal">
            <Eyebrow>About</Eyebrow>
            <h2 className="mt-5 max-w-[16ch] font-display text-[32px] font-bold leading-[1.15] tracking-[-0.02em] text-emerald md:text-[38px]">
              {HEADINGS.about}
            </h2>
          </div>
          <div className="reveal">
            <p className="max-w-[60ch] text-lg leading-[1.6] text-ink md:text-xl">
              {aboutLead}
            </p>
            {showStats && (
              <dl className="mt-12 grid grid-cols-1 gap-8 border-t border-rule pt-10 sm:grid-cols-3">
                {ABOUT_STATS.map((s) => (
                  <div key={s.c}>
                    <dt className="font-mono text-[40px] font-bold leading-none text-gold tabular-nums">
                      {s.n}
                    </dt>
                    <dd className="mt-3 text-sm leading-[1.5] text-graphite">
                      {s.c}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </section>

      {/* ── SELECTED WORK (mist) ── */}
      <section id="work" className="border-t border-rule bg-mist">
        <div className={`${COL} py-20 md:py-[104px]`}>
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Selected work</Eyebrow>
              <h2 className="mt-5 font-display text-[32px] font-bold leading-[1.15] tracking-[-0.02em] text-emerald md:text-[38px]">
                {HEADINGS.work}
              </h2>
            </div>
            <p className="max-w-[40ch] text-base leading-[1.6] text-graphite">
              {HEADINGS.workIntro}
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-7">
            {feature && <FeatureCard project={feature} />}
            {standard.length > 0 && (
              <div className="grid gap-7 md:grid-cols-2">
                {standard.map((proj) => (
                  <ProjectCard key={proj.title} project={proj} />
                ))}
              </div>
            )}
            {siteLinks.length > 0 && <SitesCard links={siteLinks} />}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE (paper) ── */}
      <section id="experience" className="border-t border-rule bg-paper">
        <div className={`${COL} py-20 md:py-[104px]`}>
          <div className="reveal">
            <Eyebrow>Experience</Eyebrow>
            <h2 className="mt-5 font-display text-[32px] font-bold leading-[1.15] tracking-[-0.02em] text-emerald md:text-[38px]">
              {HEADINGS.experience}
            </h2>
          </div>

          <div className="mt-12 border-t border-rule">
            {experience.map((job, i) => (
              <div
                key={`${job.company}-${i}`}
                className="reveal grid gap-4 border-b border-rule py-9 md:grid-cols-[200px_1fr] md:gap-10"
              >
                <div>
                  <div className="font-mono text-[13px] text-graphite tabular-nums">
                    {job.period}
                  </div>
                  {job.location && (
                    <div className="mt-1 text-sm text-emerald-70">
                      {job.location}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-[22px] font-bold leading-tight tracking-[-0.01em] text-emerald">
                    {job.role}
                  </h3>
                  <div className="mt-0.5 text-base font-semibold text-ink">
                    {job.company}
                  </div>
                  {job.points?.length > 0 && (
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {job.points.map((pt, j) => (
                        <li
                          key={j}
                          className="relative max-w-[72ch] pl-5 text-[15px] leading-[1.6] text-graphite"
                        >
                          <span
                            aria-hidden
                            className="absolute left-0 top-[9px] h-[7px] w-[7px] rounded-full bg-gold"
                          />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}
                  {job.tech?.length > 0 && (
                    <div className="mt-5">
                      <TechChips items={job.tech} tone="techGhost" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS + EDUCATION (mist) ── */}
      <section id="skills" className="border-t border-rule bg-mist">
        <div
          className={`${COL} grid gap-12 py-20 md:grid-cols-[1.3fr_0.7fr] md:gap-[72px] md:py-[104px]`}
        >
          {/* Toolbox */}
          <div className="reveal">
            <Eyebrow>Toolbox</Eyebrow>
            <h2 className="mt-5 font-display text-[32px] font-bold leading-[1.15] tracking-[-0.02em] text-emerald md:text-[38px]">
              {HEADINGS.skills}
            </h2>
            <div className="mt-10 flex flex-col gap-8">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <div className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-emerald">
                    {group.title}
                  </div>
                  <div className="mt-3.5 flex flex-wrap gap-2.5">
                    {group.items.map((item) => (
                      <Badge key={item} variant="skill">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="reveal">
            <div className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-emerald">
              Education
            </div>
            <div className="mt-3.5 flex flex-col gap-4">
              {education.map((e, i) => (
                <div
                  key={i}
                  className="rounded-[20px] border border-rule bg-card p-[26px]"
                >
                  <div className="font-mono text-[13px] text-graphite tabular-nums">
                    {e.period}
                  </div>
                  <h4 className="mt-2 font-display text-[17px] font-bold leading-snug text-emerald">
                    {e.degree}
                  </h4>
                  <div className="mt-0.5 text-sm text-ink">{e.academy}</div>
                  {e.note && (
                    <p className="mt-2 text-[13px] leading-[1.5] text-graphite">
                      {e.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT (mint) ── */}
      <section
        id="contact"
        className="relative isolate overflow-hidden border-t border-rule bg-mint"
      >
        {showWatermark && (
          <Watermark className="pointer-events-none absolute -top-12 left-2 w-[440px] max-w-[50%] text-emerald opacity-[0.06]" />
        )}
        <div className={`${COL} py-24 md:py-[120px]`}>
          <Eyebrow>Let’s talk</Eyebrow>
          <h2 className="mt-5 max-w-[20ch] font-display text-[34px] font-bold leading-[1.1] tracking-[-0.025em] text-emerald sm:text-[40px] md:text-[46px]">
            {contact.headline}
          </h2>
          <p className="mt-5 max-w-[54ch] text-lg leading-[1.6] text-ink/75">
            {contact.subtitle || CONTACT_FALLBACK}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {contact.email && (
              <Button variant="emerald" size="lg" asChild>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </Button>
            )}
            {contact.phone && (
              <Button variant="outline" size="lg" asChild>
                <a href={`tel:${contact.phone}`}>{formatPhone(contact.phone)}</a>
              </Button>
            )}
          </div>

          {socials.length > 0 && (
            <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-emerald-20 pt-7">
              {socials.map((s) => {
                const isMail = (s.href || "").startsWith("mailto:");
                return (
                  <a
                    key={s.href}
                    href={s.href}
                    {...(isMail
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className="font-mono text-sm text-emerald transition-colors hover:text-gold"
                  >
                    {s.name} ↗
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER (paper) ── */}
      <footer className="border-t border-rule bg-paper">
        <div
          className={`${COL} flex flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center`}
        >
          <div className="flex items-center gap-2.5">
            <Monogram className="h-6 w-6" />
            <span className="text-[15px] font-semibold text-emerald">
              {[name, role].filter(Boolean).join(" · ")}
            </span>
          </div>
          <div className="font-mono text-xs text-graphite">
            {[locationLine, "Crafted with Next.js & Sanity"]
              .filter(Boolean)
              .join(" · ")}
          </div>
        </div>
      </footer>
    </div>
  );
}
