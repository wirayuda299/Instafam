import { IUserPostProps } from "@/types/post";
import Image from "next/image";
import { useEffect, useState } from "react";
import { decode } from "blurhash";

type Props = {
  post: IUserPostProps;
  classNames?: string;
}
export default function PostImage({ post, classNames }: Props) {

  const [blurHash, setBlurHash] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    if (post?.blurDataUrl) {
      const canvas = document.createElement("canvas");
      const blurHash = post.blurDataUrl
      const pixels = decode(blurHash, 32, 32, 1);
      const imageData = new ImageData(pixels, 32, 32);
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.putImageData(imageData, 0, 0);
      const dataUrl = canvas.toDataURL();
      setBlurHash(dataUrl);

    }
  }, [post?.blurDataUrl]);

  return (
    <>
      <Image
        src={post?.image}
        width={1300}
        height={1300}
        sizes="(max-width: 1300px) 100vw, 500px"
        placeholder="blur"
        blurDataURL={`${blurHash}`}
        quality={70}
        priority
        className={classNames}
        alt={post?.author ?? "user post image"}
      />
    </>
  );
}
