"use client";

import Image, { type ImageLoader, type ImageProps } from "next/image";
import { photos, photoSrc, type PhotoKey } from "@/lib/images";

/** Resize through Unsplash's CDN (AVIF/WebP at the exact width requested by next/image). */
const unsplashLoader: ImageLoader = ({ src, width, quality }) =>
  `${src}?w=${width}&q=${quality ?? 70}&auto=format&fit=crop`;

type PhotoProps = Omit<ImageProps, "src" | "alt" | "loader" | "width" | "height"> & {
  name: PhotoKey;
  alt?: string;
};

export function Photo({ name, alt, fill, style, ...rest }: PhotoProps) {
  const photo = photos[name];
  const size = fill ? { fill: true } : { width: photo.width, height: photo.height };
  return (
    <Image
      loader={unsplashLoader}
      src={photoSrc(photo)}
      alt={alt ?? photo.alt}
      {...size}
      style={{ backgroundColor: photo.color, ...style }}
      {...rest}
    />
  );
}
