import urlBuilder from "@sanity/image-url";
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const PROJECT_ID: string = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const DATASET: string = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "";

const urlFor = (source: SanityImageSource): ImageUrlBuilder => {
  return urlBuilder({ projectId: PROJECT_ID, dataset: DATASET }).image(source);
};

interface Props {
  alt: string;
  asset: SanityImageSource;
  maxWidth: any;
}

const SanityImage = ({ alt, asset, maxWidth }: Props): JSX.Element => {
  const imageSizes = [320, 480, 640];
  const srcUrlSet = imageSizes.map((w) => {
    return `${urlFor(asset).width(w).url()}&auto=format ${w}w`;
  });

  return (
    <picture className="block mx-auto max-w-full">
      <img
        alt={alt}
        className="block mx-auto max-w-full"
        loading="eager"
        sizes="(max-width: 768px) 320px, (max-width: 1080px) 480px, 640px"
        src={urlFor(asset).url()}
        srcSet={srcUrlSet.join(", ")}
        style={maxWidth > 0 ? { width: "100%", maxWidth: `${maxWidth}px` } : {}}
      />
    </picture>
  );
};

export default SanityImage;
