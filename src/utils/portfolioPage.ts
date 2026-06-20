// Maps the raw Sanity `portfolio` document into the plain, serializable shape
// the Portfolio component (home route) consumes. Runs server-side (getStaticProps), so the
// component stays free of Sanity / PortableText dependencies.

type Block = { children?: { text?: string }[]; listItem?: string };

const plain = (blocks: any): string =>
  Array.isArray(blocks)
    ? blocks
        .map((b: Block) => (b.children || []).map((s) => s.text || "").join(""))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim()
    : (blocks || "").toString().trim();

const firstSentence = (text: string): string => {
  const m = text.split(/\.\s+/);
  return m.length > 1 ? `${m[0]}.` : text;
};

// Prefer the bulleted responsibilities; fall back to any paragraph text.
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
  return (bullets.length ? bullets : blocks.map(text).filter(Boolean)).slice(
    0,
    4
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

// `urlFor(source, width, height)` builds a Sanity image URL (or null).
type UrlFor = (source: any, width: number, height: number) => string | null;

export function mapPortfolio(raw: any, urlFor: UrlFor) {
  if (!raw) return null;
  const about = raw.about || {};
  const avatarUrl = urlFor(raw.image, 180, 180);
  const portraitUrl = urlFor(raw.image, 440, 550); // 4:5 portrait displayed at 220×275, 2× retina
  const edu0 = (raw.education || [])[0] || {};
  const degree = (edu0.degree || "").toString();
  const degreeShort = /master/i.test(degree)
    ? "MSc"
    : /bachelor/i.test(degree)
    ? "BSc"
    : degree;
  const academy = (edu0.academy || "").split(",")[0].trim();

  return {
    name: raw.name || "Nazmul Alam",
    location: raw.location || null,
    avatarUrl,
    portraitUrl,
    eyebrow: raw.currentPosition || about.title || "Senior Software Engineer",
    // Prefer the purpose-built short tagline for the hero; fall back to headline.
    headline: plain(raw.tagline) || firstSentence(plain(raw.headline)),
    highlight: raw.highlightPhrase || about.title || "",
    intro: plain(raw.title),
    contactHeadline: raw.contactHeadline || "",
    contactSubtitle: plain(raw.contactSubtitle),
    cvUrl: raw.cvUrl || null,
    about: {
      subtitle: about.subtitle || "",
      eduLine: [degreeShort, academy].filter(Boolean).join(" · "),
    },
    projects: (raw.projects || [])
      .map((p: any) => ({
        title: p.projectName || "",
        kicker: [p.start, p.end].filter(Boolean).join(" — "),
        outcome: p.description || "",
        tech: parseTech(p.skills),
        url: p.link || "",
        image: urlFor(p.image, 800, 450),
      }))
      .filter((p: any) => p.title),
    skillGroups: (raw.skills || [])
      .map((s: any) => {
        const fromCms = (s.items || []).filter(Boolean);
        return {
          title: s.level || "",
          items: fromCms.length ? fromCms : FALLBACK_SKILL_ITEMS[s.level] || [],
        };
      })
      .filter((g: any) => g.title && g.items.length),
    experience: (raw.experience || []).map((e: any) => ({
      role: e.designation || "",
      company: e.company || "",
      period: [String(e.starts || "").trim(), String(e.ends || "").trim()]
        .filter(Boolean)
        .join(" — "),
      points: bulletPoints(e.roles),
    })),
    socials: (raw.socials || []).filter((s: any) => s && s.href),
  };
}
