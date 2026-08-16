// SEO/GEO helpers shared by pages/index.tsx. Kept template-agnostic: both
// mappers (src/templates/*/map.ts) return the same core fields consumed here
// (name, role/eyebrow, headline, intro, location, socials, portraitUrl).

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://nazmul.monerbari.com"
).replace(/\/$/, "");

// The resolved home-page URL, trailing slash included — the literal address
// the root route serves at. Canonical/OG/JSON-LD `url` fields all use this one
// form so every signal agrees on the same string (the sitemap uses it too).
export const PAGE_URL = `${SITE_URL}/`;

const DEFAULT_TITLE = "Nazmul Alam — Senior Software Engineer";
const DEFAULT_DESCRIPTION =
  "Senior Software Engineer — full-stack web applications across React, Svelte, Angular, Node and Java. Portfolio driven by Sanity CMS.";

const locationLine = (data: any): string =>
  [data?.location?.city, data?.location?.country].filter(Boolean).join(", ");

// e.g. "Nazmul Alam — Senior Software Engineer, Dhaka, Bangladesh". Falls back
// to the static default when Sanity data isn't available (build/ISR failure).
export function buildTitle(data: any): string {
  if (!data?.name) return DEFAULT_TITLE;
  const role = data.role || data.eyebrow || "Senior Software Engineer";
  return `${data.name} — ${role}`;
}

// Leads with a direct, factual sentence (name, role, location) so search
// snippets and AI answer engines get an answer-first summary even though the
// on-page hero copy is stylistic. Falls back to the intro/tagline, then the
// static default.
export function buildDescription(data: any): string {
  if (!data?.name) return DEFAULT_DESCRIPTION;
  const role = data.role || data.eyebrow || "Senior Software Engineer";
  const loc = locationLine(data);
  const lead = `${data.name} is a ${role}${loc ? ` based in ${loc}` : ""}.`;
  const rest = (data.intro || "").trim();
  const combined = rest ? `${lead} ${rest}` : lead;
  return combined.length > 300 ? `${combined.slice(0, 297)}...` : combined;
}

const emailFromSocials = (socials: any[]): string | null => {
  const mail = (socials || []).find((s) =>
    (s?.href || "").startsWith("mailto:")
  );
  return mail ? mail.href.replace(/^mailto:/, "") : null;
};

// schema.org Person — the single highest-leverage entry for both rich results
// and AI answer engines (who is this, what do they do, where, how to reach
// them, what do they know). Returns null when there's no CMS data to ground it.
export function buildPersonJsonLd(data: any, ogImageUrl?: string | null) {
  if (!data?.name) return null;
  const role = data.role || data.eyebrow || "Senior Software Engineer";
  const loc = data.location || {};
  const sameAs = (data.socials || [])
    .map((s: any) => s?.href)
    .filter((href: string) => href && !href.startsWith("mailto:"));
  const email = emailFromSocials(data.socials);
  const knowsAbout = Array.from(
    new Set((data.skillGroups || []).flatMap((g: any) => g.items || []))
  );
  const alumniOf = (data.education || [])
    .map((e: any) => e.academy)
    .filter(Boolean);

  const person: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${PAGE_URL}#person`,
    name: data.name,
    url: PAGE_URL,
    jobTitle: role,
    description: buildDescription(data),
  };
  if (data.portraitUrl || ogImageUrl) person.image = ogImageUrl || data.portraitUrl;
  if (loc.city || loc.country) {
    person.address = {
      "@type": "PostalAddress",
      ...(loc.city ? { addressLocality: loc.city } : {}),
      ...(loc.country ? { addressCountry: loc.country } : {}),
    };
  }
  if (sameAs.length) person.sameAs = sameAs;
  if (email) person.email = `mailto:${email}`;
  if (knowsAbout.length) person.knowsAbout = knowsAbout;
  if (alumniOf.length) {
    person.alumniOf = alumniOf.map((name: string) => ({
      "@type": "CollegeOrUniversity",
      name,
    }));
  }
  return person;
}

// A ProfilePage/WebSite wrapper so crawlers see the Person as the page's main
// entity, not just an unattached fact blob. `generatedAt` (an ISO timestamp
// stamped once at build/ISR-revalidation time) gives AI answer engines a
// freshness signal for how current the extracted facts are.
export function buildProfilePageJsonLd(data: any, generatedAt?: string) {
  if (!data?.name) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${PAGE_URL}#profilepage`,
    url: PAGE_URL,
    name: buildTitle(data),
    mainEntity: { "@id": `${PAGE_URL}#person` },
    ...(generatedAt ? { dateModified: generatedAt } : {}),
  };
}

// Safe to inline in a <script type="application/ld+json"> — escapes "</" so
// the JSON blob can't prematurely close the script tag.
export function jsonLdScript(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
