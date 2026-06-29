import Image, { type ImageProps } from "next/image";
import { publicAsset } from "@/lib/paths";

type AppImageProps = Omit<ImageProps, "src"> & {
  /** Path relative to the public folder, e.g. `images/broscience.svg`. */
  src: string;
};

export default function AppImage({ src, alt, ...props }: AppImageProps) {
  return (
    <Image src={publicAsset(src)} alt={alt} unoptimized {...props} />
  );
}
