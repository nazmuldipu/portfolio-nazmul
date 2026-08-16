import Head from "next/head";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/src/sanity/lib/client";
import { getPortfolioPage } from "@/src/sanity/lib/queries";
import { resolveTemplate, DEFAULT_TEMPLATE } from "@/src/templates";
import {
  PAGE_URL,
  buildTitle,
  buildDescription,
  buildPersonJsonLd,
  buildProfilePageJsonLd,
  jsonLdScript,
} from "@/src/lib/seo";

const builder = imageUrlBuilder(client);
const urlFor = (source: any, width: number, height: number) =>
  source ? builder.image(source).width(width).height(height).fit("crop").auto("format").url() : null;

// Which portfolio template to render. NEXT_PUBLIC_* is inlined at build time, so
// the choice is fixed per build — set NEXT_PUBLIC_PORTFOLIO_TEMPLATE to switch
// (e.g. "emerald" or "classic"); unset falls back to DEFAULT_TEMPLATE.
const template = resolveTemplate(
  process.env.NEXT_PUBLIC_PORTFOLIO_TEMPLATE || DEFAULT_TEMPLATE
);

export async function getStaticProps() {
  let data = null;
  let ogImageUrl = null;
  try {
    const raw = await getPortfolioPage();
    // Each template ships its own mapper, since their UI data shapes differ.
    data = template.mapPortfolio(raw, urlFor);
    // A 1200×630 crop dedicated to link-preview cards (OG/Twitter), independent
    // of whatever aspect ratio each template's own portrait treatment uses.
    ogImageUrl = raw?.image ? urlFor(raw.image, 1200, 630) : null;
  } catch (e) {
    // Leave data null — the component renders empty rather than stand-in copy.
    data = null;
  }
  // Stamped once per build/ISR revalidation — the JSON-LD `dateModified`.
  const generatedAt = new Date().toISOString();
  return { props: { data, ogImageUrl, generatedAt }, revalidate: 60 };
}

export default function Home({
  data,
  ogImageUrl,
  generatedAt,
}: {
  data: any;
  ogImageUrl: string | null;
  generatedAt: string;
}) {
  const Template = template.Component;
  const title = buildTitle(data);
  const description = buildDescription(data);
  const image = ogImageUrl || data?.portraitUrl || null;
  const personJsonLd = buildPersonJsonLd(data, ogImageUrl);
  const profilePageJsonLd = buildProfilePageJsonLd(data, generatedAt);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={PAGE_URL} />

        {/* Open Graph */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:site_name" content={data?.name || "Nazmul Alam"} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {image && <meta property="og:image" content={image} />}
        {ogImageUrl && (
          <>
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
          </>
        )}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {image && <meta name="twitter:image" content={image} />}

        {/* SVG favicon — crisp at any size; ICO is the fallback for legacy browsers */}
        <link rel="icon" type="image/svg+xml" href={template.favicon} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://rsms.me" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {personJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLdScript(personJsonLd) }}
          />
        )}
        {profilePageJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLdScript(profilePageJsonLd) }}
          />
        )}
      </Head>
      <Template data={data} />
    </>
  );
}
