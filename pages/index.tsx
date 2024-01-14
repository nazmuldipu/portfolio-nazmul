import Head from "next/head";
import Banner from "@/src/components/Templates/banner";
import About from "@/src/components/about";
import profile from "@/src/data/profile";
import Experience from "@/src/components/Experience";
import Footer from "@/src/components/Templates/footer";
import { getProfile } from "@/src/sanity/lib/queries";
import { formatSanityData } from "@/src/utils/utils";
import NavbarComponent from "@/src/components/Templates/navbar";

const Home = ({ data }: { data: any }): JSX.Element => {
  const fd = formatSanityData(data);
  console.log({ fd, data });
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

      <NavbarComponent navbar={fd.navbar} />
      <Banner name={fd.name} about={fd.about} image={fd.image} />
      <About about={profile.index.about} />
      <Experience contribution={profile.index.contribution} />
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const data = await getProfile();

  return {
    props: {
      data,
    },
  };
}

export default Home;
