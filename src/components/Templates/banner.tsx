import Image from "next/image";
import defaultCardImage from "@/public/nazmul2.png";
import SanityImage from "@/src/components/Molecules/SanityImage";
import { About } from "@/src/types/Portfolio.types";

interface Props {
  name: string;
  about: About;
  image: any;
  imageSrc?: any;
}

export default function Banner({
  imageSrc = defaultCardImage,
  about,
  name,
  image,
}: Props) {
  return (
    <div className="bg-primary font-primary">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="flex-auto max-w-lg lg:order-2 h-[450px] overflow-hidden">
            <SanityImage alt="abcd" asset={image.asset} maxWidth={600} />
          </div>
          <div className="flex flex-col justify-center mx-4 py-4">
            <h2 className="md:py-2 text-4xl md:text-6xl text-light font-bold font-secondary">
              Hi, I&apos;m {name}
            </h2>
            <h3 className="md:py-2 text-xl md:text-3xl text-accent font-stylus tracking-wider">
              {about.title}
            </h3>
            <div className="md:py-2 flex">
              <a className="w-auto px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-secondary shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span>ABOUT ME</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
