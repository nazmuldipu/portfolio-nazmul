import Image from 'next/image'
import defaultCardImage from '../../public/nazmul.jpg';

const sanityIoImageLoader = ({ src, width, quality }) => {
    return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`
  }

export default function Banner({imageSrc = defaultCardImage}) {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex-auto max-w-lg md:order-2 h-[450px] overflow-hidden">
                {/* <img src='./nazmul.jpg' alt='nazmul' className='w-full' /> */}
                <Image src={imageSrc} alt="image-alt-text" sizes="320 640 750" layout="responsive" objectFit="cover" priority/>
    
            </div>
            <div className="flex-auto">a</div>
        </div>
    )
}