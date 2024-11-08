import { twMerge } from "tailwind-merge";
import Image from "next/image";

export default function Avatar({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={40}
      height={40}
      className={twMerge("rounded-full", className)}
    />
  );
}
