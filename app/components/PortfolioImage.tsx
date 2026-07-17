import NextImage, { type ImageProps } from "next/image";
import { assetPath } from "@/lib/asset-path";

export default function PortfolioImage(props: ImageProps) {
  const src = typeof props.src === "string" ? assetPath(props.src) : props.src;

  return <NextImage {...props} src={src} />;
}
