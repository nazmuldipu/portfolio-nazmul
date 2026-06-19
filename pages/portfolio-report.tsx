import Head from "next/head";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { client } from "@/src/sanity/lib/client";
import { getPortfolioPage } from "@/src/sanity/lib/queries";

// ── Live indicators ───────────────────────────────────────────────────────────
const plain = (b: any): string =>
  Array.isArray(b)
    ? b
        .map((x: any) => (x.children || []).map((s: any) => s.text || "").join(""))
        .join(" ")
        .trim()
    : (b || "").toString();

export async function getStaticProps() {
  let live: any = {
    subtitle: "",
    skillCategories: [],
    skillsHaveItems: false,
    companies: [],
    headlineLen: 0,
    hasAddress: false,
  };
  try {
    const raw = await getPortfolioPage();
    if (raw) {
      live = {
        subtitle: raw.about?.subtitle || "",
        skillCategories: (raw.skills || []).map((s: any) => s.level),
        skillsHaveItems: (raw.skills || []).some(
          (s: any) => (s.items || []).length
        ),
        companies: (raw.experience || []).map((e: any) => e.company),
        headlineLen: plain(raw.headline).length,
        hasAddress: (raw.about?.details || []).some((d: any) =>
          /address/i.test(d.title || "")
        ),
      };
    }
  } catch (e) {
    /* fall back to defaults above */
  }
  return { props: { live }, revalidate: 60 };
}

// ── Findings ───────────────────────────────────────────────────────────────────
type Finding = {
  sev: "High" | "Medium" | "Low";
  field: string;
  issue: string;
  fix: string;
};

function buildFindings(live: any): Finding[] {
  return [
    {
      sev: "High",
      field: "about.subtitle",
      issue: `Generic and out of date — it reads "…working as a freelancer… looking for a new opportunity," which contradicts the current Senior Software Engineer role and sells rather than informs.`,
      fix: "Rewrite as 2–3 specific, present-tense sentences from the reader's side: what you do for a team and the kind of systems you own.",
    },
    {
      sev: "High",
      field: "portfolio.projects (missing)",
      issue:
        "There is no projects/work field in the schema, so the Work section can't be CMS-driven — it renders placeholder cards.",
      fix: "Add a `projects` array: title, one-line outcome, tech (string[]), repo URL, and an optional image. Then the Work section reads from Sanity like every other section.",
    },
    {
      sev: "Medium",
      field: "experience[].roles",
      issue:
        "Bullets are job-description boilerplate ('the primary responsibilities for this position include…') rather than impact. They list duties, not outcomes.",
      fix: "Replace with 2–3 achievement bullets per role, with a metric where possible (what changed, by how much).",
    },
    {
      sev: "Medium",
      field: "experience[0].roles (CEFALO)",
      issue:
        'Contains a stray glyph and filler bullet: "Perform other duties as assigned.Ï".',
      fix: "Delete that bullet and the trailing `Ï` (an encoding artifact).",
    },
    {
      sev: "Medium",
      field: "headline",
      issue: `Used as the hero H1 but it's ${live.headlineLen} characters across two sentences — too long to land as a headline.`,
      fix: "Tighten to one punchy line (≤ ~90 chars). Better: add a dedicated short `tagline` field for the hero and keep `headline` for meta/SEO.",
    },
    {
      sev: "Medium",
      field: "experience[].company",
      issue: `City is baked into the company name with inconsistent casing — e.g. ${
        live.companies.slice(0, 3).join("; ") || "“UNOLO… dhaka”"
      }.`,
      fix: "Store company and location in separate fields and normalise casing (“Dhaka”, not “dhaka”).",
    },
    {
      sev: "Low",
      field: "about.details (Address)",
      issue: live.hasAddress
        ? "A full home street address is published in the About details — a privacy concern on a public page."
        : "Address entry not detected (may already be removed).",
      fix: "Drop the street address; the city/country already live in `location`.",
    },
    {
      sev: "Low",
      field: "skills (labels)",
      issue: `Two typos: the category “Tools / Utilites” and the Testing tool “Playwrite”. ${
        live.skillsHaveItems
          ? "Skill items themselves are populated (via technologies[].name)."
          : ""
      }`,
      fix: "Correct to “Tools / Utilities” and “Playwright”.",
    },
    {
      sev: "Low",
      field: "experience[].starts / about.details[].value",
      issue:
        "Several values carry trailing whitespace (e.g. “June 2021 ”, the phone number).",
      fix: "Trim trailing spaces.",
    },
    {
      sev: "Low",
      field: "headline / title (tenure)",
      issue:
        "Says “over 6 years” while other materials say 8+ years — inconsistent.",
      fix: "Pick one accurate figure (or compute years of experience from a start date).",
    },
  ];
}

const SCHEMA_GAPS = [
  "`projects` array (title, outcome, tech[], repo, image) — powers the Work section.",
  "`tagline` (short ≤90-char hero line) + optional `highlightPhrase` to drive the marker highlight from the CMS.",
  "`contactHeadline` / CTA copy — currently hard-coded in the page.",
  "Skills: rename `level` → `category` and add an `items` string array.",
];

const SEV_VARIANT: Record<string, "accent" | "default" | "outline"> = {
  High: "accent",
  Medium: "default",
  Low: "outline",
};

export default function PortfolioReport({ live }: { live: any }) {
  const findings = buildFindings(live);
  const counts = findings.reduce(
    (a, f) => ((a[f.sev] = (a[f.sev] || 0) + 1), a),
    {} as Record<string, number>
  );

  return (
    <>
      <Head>
        <title>Sanity content report — /portfolio</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="portfolio-root min-h-screen">
        <main className="mx-auto max-w-3xl px-6 py-16 sm:px-8 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo">
            Content report
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            What to improve in{" "}
            <span className="box-decoration-clone rounded-[2px] bg-marker/70 px-1.5 text-on-marker">
              Sanity
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/70">
            The <code className="font-mono text-[0.95em]">/portfolio</code> page
            now renders live from the Sanity <code className="font-mono">portfolio</code>{" "}
            document. These are the content and schema changes that will make it
            read sharper — ordered by impact.
          </p>

          {/* Summary */}
          <div className="mt-8 flex flex-wrap gap-3">
            {(["High", "Medium", "Low"] as const).map((sev) => (
              <div
                key={sev}
                className="flex items-baseline gap-2 rounded-lg border border-rule bg-card px-4 py-3"
              >
                <span className="font-display text-2xl font-bold tabular-nums">
                  {counts[sev] || 0}
                </span>
                <span className="text-sm text-ink/55">{sev} priority</span>
              </div>
            ))}
          </div>

          <Separator className="my-12" />

          {/* Findings */}
          <ol className="flex flex-col gap-4">
            {findings.map((f, i) => (
              <li key={i}>
                <Card>
                  <CardContent className="p-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant={SEV_VARIANT[f.sev]}>{f.sev}</Badge>
                      <code className="font-mono text-sm text-ink/80">
                        {f.field}
                      </code>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">
                      {f.issue}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink">
                      <span className="font-semibold text-indigo">Fix · </span>
                      {f.fix}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>

          <Separator className="my-12" />

          {/* Schema gaps */}
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Schema additions
          </h2>
          <p className="mt-2 text-sm text-ink/60">
            Fields the page wants but the document doesn&apos;t have yet — until
            they exist, those sections use built-in fallbacks.
          </p>
          <ul className="mt-5 flex flex-col gap-3">
            {SCHEMA_GAPS.map((g, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm leading-relaxed text-ink/75"
              >
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo"
                />
                <span>{g}</span>
              </li>
            ))}
          </ul>

          <Separator className="my-12" />
          <footer className="text-xs text-ink/40">
            Generated against dataset{" "}
            <code className="font-mono">production</code>. Open{" "}
            <a className="text-indigo hover:underline" href="/portfolio">
              /portfolio
            </a>{" "}
            to see the live result.
          </footer>
        </main>
      </div>
    </>
  );
}
