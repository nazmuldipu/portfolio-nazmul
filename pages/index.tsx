import Head from "next/head";
import imageUrlBuilder from "@sanity/image-url";
import Portfolio from "@/src/components/Portfolio";
import { client } from "@/src/sanity/lib/client";
import { getPortfolioPage } from "@/src/sanity/lib/queries";
import { mapPortfolio } from "@/src/utils/portfolioPage";

const builder = imageUrlBuilder(client);

export async function getStaticProps() {
  let data = null;
  try {
    const raw = await getPortfolioPage();
    const avatarUrl = raw?.image
      ? builder.image(raw.image).width(180).height(180).fit("crop").url()
      : null;
    data = mapPortfolio(raw, avatarUrl);
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Portfolio data={data} />
    </>
  );
}
