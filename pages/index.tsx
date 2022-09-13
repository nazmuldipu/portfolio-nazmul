import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import styles from "../styles/Home.module.css";
import Banner from "./../components/banner/banner";
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

      <Header />
      <Banner />
      <About about={profile.index.about} />
      {/* Body
      <Footer /> */}
    </div>
  );
};

export default Home;
