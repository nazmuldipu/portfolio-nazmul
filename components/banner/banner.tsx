import Image from "next/image"
import defaultCardImage from "../../public/nazmul2.png";

// const sanityIoImageLoader = ({ src, width, quality }) => {
//     return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`
// }

export default function Banner({ imageSrc = defaultCardImage }) {
    return (
        <div className="bg-primary font-primary">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
                <div className="flex flex-col lg:flex-row lg:justify-between">
                    <div className="flex-auto max-w-lg lg:order-2 h-[450px] overflow-hidden">
                        {/* <img src="./nazmul.jpg" alt="nazmul" className="w-full" /> */}
                        <Image src={imageSrc} alt="image-alt-text" sizes="320 640 750" layout="responsive" objectFit="cover" priority />

                    </div>
                    <div className="flex flex-col justify-center mx-4 py-4">
                        <h2 className="md:py-2 text-4xl md:text-6xl text-light font-bold font-secondary">Hi, I&apos;m Nazmul Alam</h2>
                        <h3 className="md:py-2 text-2xl md:text-5xl text-accent font-stylus tracking-wider">Frontend Developer.</h3>
                        <div className="md:py-2 flex">
                            <a className="w-auto px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-secondary shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"><span>ABOUT ME</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}