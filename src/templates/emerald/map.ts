// Maps the raw Sanity `portfolio` document into the plain, serializable shape
// the Portfolio component (home route) consumes. Runs server-side (getStaticProps),
// so the component stays free of Sanity / PortableText dependencies.

type Block = { children?: { text?: string }[]; listItem?: string };

const plain = (blocks: any): string =>
  Array.isArray(blocks)
    ? blocks
        .map((b: Block) => (b.children || []).map((s) => s.text || "").join(""))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim()
    : (blocks || "").toString().trim();

// Pull the bulleted responsibilities; fall back to any paragraph text.
const bulletPoints = (blocks: any): string[] => {
  if (!Array.isArray(blocks)) return [];
  const text = (b: Block) =>
    (b.children || [])
      .map((s) => s.text || "")
      .join("")
      .trim();
  const bullets = blocks
    .filter((b: Block) => b.listItem === "bullet")
    .map(text)
    .filter(Boolean);
  return (bullets.length ? bullets : blocks.map(text).filter(Boolean)).filter(
    Boolean
  );
};

// Each skill category exposes its items via `technologies[].name` (queried as
// `items`). This map is only a safety net if a category somehow has none.
const FALLBACK_SKILL_ITEMS: Record<string, string[]> = {
  "Languages and Frameworks": ["TypeScript", "React", "Node.js", "Java"],
  "Tools / Utilities": ["Figma", "Git", "VS Code"],
  "Web Technologies": ["Docker", "REST API", "GraphQL"],
  Databases: ["MySQL", "MongoDB", "PostgreSQL"],
  Testing: ["Jest", "Cypress", "Playwright"],
};

// Project `skills` is stored as a quoted-CSV string, e.g. '"Svelte", "Jest"'.
const parseTech = (s: any): string[] => {
  if (Array.isArray(s)) return s.filter(Boolean);
  if (!s) return [];
  const quoted = s.match(/"([^"]+)"/g);
  if (quoted) return quoted.map((x: string) => x.replace(/"/g, "").trim());
  return s
    .split(",")
    .map((x: string) => x.trim())
    .filter(Boolean);
};

const MONTHS =
  /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g;
const SHORT: Record<string, string> = {
  January: "Jan", February: "Feb", March: "Mar", April: "Apr",
  May: "May", June: "Jun", July: "Jul", August: "Aug",
  September: "Sep", October: "Oct", November: "Nov", December: "Dec",
};

const yearOf = (s: any): string => {
  const m = String(s || "").match(/\d{4}/);
  return m ? m[0] : "";
};

const isCurrent = (s: any): boolean => /current/i.test(String(s || ""));

// Mono date used in cards: "2019 → 2021", "2022", "2022 → NOW".
const yearRange = (start: any, end: any): string => {
  const a = yearOf(start);
  const b = isCurrent(end) ? "NOW" : yearOf(end);
  if (a && b && a !== b) return `${a} → ${b}`;
  if (a && b === a) return a;
  return [a, b].filter(Boolean).join(" → ");
};

// Mono date used in the experience timeline: "Oct 2022 → Current".
const monthRange = (start: any, end: any): string => {
  const fmt = (s: any) =>
    String(s || "")
      .trim()
      .replace(MONTHS, (m) => SHORT[m] || m);
  return [fmt(start), fmt(end)].filter(Boolean).join(" → ");
};

// "Cefalo, Dhaka" → { company: "Cefalo", location: "Dhaka" }.
const splitCompany = (raw: string, fallbackCity: string) => {
  const [company, ...rest] = (raw || "").split(",");
  return {
    company: (company || "").trim(),
    location: rest.join(",").trim() || fallbackCity,
  };
};

// The Sanity tagline/headline both lead with the role, which already appears in
// the hero eyebrow. Drop that prefix so the H1 reads as a distinct pitch.
const heroHeadline = (t: string): string => {
  const s = t.replace(/^Senior Software Engineer[\s,–—-]*/i, "").trim();
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : t;
};

const shortDegree = (d: string): string =>
  (d || "")
    .replace(/Master of Science in/i, "MSc,")
    .replace(/Bachelor of Science in/i, "BSc,")
    .trim();

// `urlFor(source, width, height)` builds a Sanity image URL (or null).
type UrlFor = (source: any, width: number, height: number) => string | null;

export function mapPortfolio(raw: any, urlFor: UrlFor) {
  if (!raw) return null;
  const about = raw.about || {};
  const city = raw.location?.city || "";
  const country = raw.location?.country || "";

  // Contact details (phone / email) live in about.details, keyed by slug.
  const details: any[] = about.details || [];
  const detail = (slug: string) =>
    (details.find((d) => d?.slug?.current === slug) || {}).value || "";

  // --- Projects -------------------------------------------------------------
  // The work section has three shapes: one feature card (first project), a grid
  // of standard cards, and an emerald card grouping the static-site builds as link
  // tiles. We detect the static-site cluster by name and pull each tile's label
  // out of its description ("…named X.") so it all stays Sanity-driven.
  const allProjects = (raw.projects || [])
    .map((p: any) => ({
      title: p.projectName || "",
      label: yearRange(p.start, p.end),
      description: p.description || "",
      tech: parseTech(p.skills),
      url: p.link || "",
      image: urlFor(p.image, 1280, 800), // ~16:10
    }))
    .filter((p: any) => p.title);

  const isSiteLink = (p: any) => /static site/i.test(p.title);
  const feature = allProjects.find((p: any) => !isSiteLink(p)) || null;
  if (feature) feature.image = urlFor(rawProjectImage(raw, feature.title), 1100, 1000);
  const siteLinkProjects = allProjects.filter(isSiteLink);
  const standard = allProjects.filter(
    (p: any) => p !== feature && !isSiteLink(p)
  );
  const siteLinks = siteLinkProjects
    .map((p: any) => {
      const m = p.description.match(/named\s+(.+?)\.?\s*$/i);
      return { label: m ? m[1].trim() : p.title, href: p.url };
    })
    .filter((t: any) => t.href);

  return {
    name: raw.name || "Nazmul Alam",
    location: { city, country },
    // Hero eyebrow: "Senior Software Engineer · Dhaka, BD".
    role: raw.currentPosition || about.title || "Senior Software Engineer",
    headline: heroHeadline(plain(raw.tagline) || plain(raw.headline)),
    intro: plain(raw.title),
    portraitUrl: urlFor(raw.image, 880, 1100), // 4:5
    aboutLead: about.subtitle || "",
    projects: { feature, standard, siteLinks },
    skillGroups: (raw.skills || [])
      .map((s: any) => {
        const fromCms = (s.items || []).filter(Boolean);
        return {
          title: s.level || "",
          items: fromCms.length ? fromCms : FALLBACK_SKILL_ITEMS[s.level] || [],
        };
      })
      .filter((g: any) => g.title && g.items.length),
    experience: (raw.experience || []).map((e: any) => {
      const { company, location } = splitCompany(e.company, city);
      return {
        role: e.designation || "",
        company,
        location,
        period: monthRange(e.starts, e.ends),
        points: bulletPoints(e.roles),
        tech: (e.technologies || []).map((t: any) => t.name).filter(Boolean),
      };
    }),
    education: (raw.education || []).map((e: any) => ({
      period: yearRange(e.starts, e.ends),
      degree: shortDegree(e.degree),
      academy: e.academy || "",
      note: plain(e.major),
    })),
    contact: {
      headline: raw.contactHeadline || "",
      subtitle: plain(raw.contactSubtitle),
      email: detail("email"),
      phone: detail("phone"),
    },
    socials: (raw.socials || []).filter((s: any) => s && s.href),
  };
}

// Re-find the raw image source for a project by name (the feature card wants a
// portrait-leaning crop, so we rebuild its URL at a different aspect ratio).
function rawProjectImage(raw: any, title: string) {
  const p = (raw.projects || []).find((x: any) => x.projectName === title);
  return p ? p.image : null;
}
