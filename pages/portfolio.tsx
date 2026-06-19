import Head from "next/head";
import Portfolio from "@/src/components/Portfolio";

export default function PortfolioPage() {
  return (
    <>
      <Head>
        <title>Nazmul Alam — Booking platforms &amp; content systems</title>
        <meta
          name="description"
          content="Full-stack engineer building booking engines and content systems for hospitality and travel brands — Java/Node back ends and React/Svelte/Next.js front ends."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Portfolio />
    </>
  );
}
