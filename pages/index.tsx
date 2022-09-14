import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Templates/navbar";
import Banner from "../components/Templates/banner";
import About from "../components/about";
import profile from "../data/profile";

const Home: NextPage = () => {
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
      {/* Body
      <Footer /> */}
    </div>
  );
};

export default Home;
