import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Image from "next/image";
const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset && source
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export type ImageComponentProps = {
  image: string;
  width?: string;
  height?: string;
}

export function PostPreviewComponent({ image }: ImageComponentProps) {
  const url = urlFor(image)?.url();
  if (!url) return null;
  return (
    <Image className="sm:max-w-[370px]"
      src={url}
      alt={"Cover Image"}
      width={800}
      height={500}
      loading="lazy"
      placeholder="blur"
      blurDataURL={urlFor(image)?.width(10).height(10).blur(10).url()} // Low-res preview
    />
  )
}
export function DetailImageComponent({ image, width, height }: ImageComponentProps) {
  const url = urlFor(image)?.url();
  if (!url) return null;
  return (
    <Image className=""
      src={url}
      alt={"Cover Image"}
      width={800}
      height={500}
      style={{
        width: width || "100%",
        height: height || "auto",
      }}
      loading="lazy"
      placeholder="blur"
      blurDataURL={urlFor(image)?.width(10).height(10).blur(10).url()} // Low-res preview
    />
  )
}
export function ImageRoundedComponent({ image, width, height }: ImageComponentProps) {
  const url = urlFor(image)?.url();
  if (!url) return null;
  return (
    <Image className="flex rounded-full object-cover aspect-square"
      src={url}
      alt={"Cover Image"}
      width={800}
      height={500}
      style={{
        width: width || "100%",
        height: height || "auto",
      }}
      loading="lazy"
      placeholder="blur"
      blurDataURL={urlFor(image)?.width(10).height(10).blur(10).url()} // Low-res preview
    />
  )
}
export function IconComponent({ image }: ImageComponentProps) {
  const url = urlFor(image)?.url();
  if (!url) return null;
  return (
    <Image className="flex w-6 h-6 object-cover"
      src={url}
      alt={"Cover Image"}
      width={800}
      height={500}
      placeholder="blur"
      blurDataURL={urlFor(image)?.width(10).height(10).blur(10).url()} // Low-res preview
    />
  )
}