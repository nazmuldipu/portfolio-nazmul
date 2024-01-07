import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Templates/navbar";
import Banner from "../components/Templates/banner";
import About from "../components/about";
import profile from "../data/profile";
import Experience from "../components/Experience";
import Footer from "../components/Templates/footer";
import { getNavbar } from "@/sanity/lib/client";

const Home = ({ data }: { data: any }): JSX.Element => {
  console.log({ data });
  return (
    <div>
      <Head>
        <title>Nazmul Alam</title>
        <meta
          name="description"
          content="This is a portfolio for Nazmul Alam"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Banner />
      <About about={profile.index.about} />
      <Experience contribution={profile.index.contribution} />
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const data = await getNavbar();

  return {
    props: {
      data,
    },
  };
}

export default Home;
