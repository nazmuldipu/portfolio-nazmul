import Head from "next/head";
import imageUrlBuilder from "@sanity/image-url";
import Portfolio from "@/src/components/Portfolio";
import { client } from "@/src/sanity/lib/client";
import { getPortfolioPage } from "@/src/sanity/lib/queries";
import { mapPortfolio } from "@/src/utils/portfolioPage";

const builder = imageUrlBuilder(client);
const urlFor = (source: any, width: number, height: number) =>
  source ? builder.image(source).width(width).height(height).fit("crop").auto("format").url() : null;

export async function getStaticProps() {
  let data = null;
  try {
    const raw = await getPortfolioPage();
    data = mapPortfolio(raw, urlFor);
  } catch (e) {
    // Leave data null — the component renders empty rather than stand-in copy.
    data = null;
  }
  return { props: { data }, revalidate: 60 };
}

export default function Home({ data }: { data: any }) {
  return (
    <>
      <Head>
        <title>Nazmul Alam — Senior Software Engineer</title>
        <meta
          name="description"
          content="Senior Software Engineer — full-stack web applications across React, Svelte, Angular, Node and Java. Portfolio driven by Sanity CMS."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* SVG favicon — crisp at any size; ICO is the fallback for legacy browsers */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://rsms.me" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </Head>
      <Portfolio data={data} />
    </>
  );
}
