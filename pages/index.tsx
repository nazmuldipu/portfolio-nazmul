import Head from "next/head";
import imageUrlBuilder from "@sanity/image-url";
import Portfolio from "@/src/components/Portfolio";
import { client } from "@/src/sanity/lib/client";
import { getPortfolioPage } from "@/src/sanity/lib/queries";
import { mapPortfolio } from "@/src/utils/portfolioPage";

const builder = imageUrlBuilder(client);
const urlFor = (source: any, width: number, height: number) =>
  source ? builder.image(source).width(width).height(height).fit("crop").auto("format").url() : null;

// PNG-only variant for <link rel="icon"> — browsers need a stable format, not WebP.
const iconUrl = (source: any, size: number) =>
  source ? builder.image(source).width(size).height(size).fit("crop").format("png").url() : null;

export async function getStaticProps() {
  let data = null;
  let faviconUrl: string | null = null;
  let touchIconUrl: string | null = null;
  try {
    const raw = await getPortfolioPage();
    data = mapPortfolio(raw, urlFor);
    faviconUrl = iconUrl(raw?.image, 64);
    touchIconUrl = iconUrl(raw?.image, 180);
  } catch (e) {
    // Leave data null — the component renders empty rather than stand-in copy.
    data = null;
  }
  return { props: { data, faviconUrl, touchIconUrl }, revalidate: 60 };
}

export default function Home({
  data,
  faviconUrl,
  touchIconUrl,
}: {
  data: any;
  faviconUrl: string | null;
  touchIconUrl: string | null;
}) {
  return (
    <>
      <Head>
        <title>Nazmul Alam — Senior Software Engineer</title>
        <meta
          name="description"
          content="Senior Software Engineer — full-stack web applications across React, Svelte, Angular, Node and Java. Portfolio driven by Sanity CMS."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {faviconUrl ? (
          <link rel="icon" type="image/png" href={faviconUrl} />
        ) : (
          <link rel="icon" href="/favicon.ico" />
        )}
        {touchIconUrl && (
          <link rel="apple-touch-icon" href={touchIconUrl} />
        )}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </Head>
      <Portfolio data={data} />
    </>
  );
}
