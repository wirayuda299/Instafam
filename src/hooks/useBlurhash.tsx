import { IUserPostProps } from "@/types/post";
import { decode } from "blurhash";
import { useEffect, useState } from "react";

export default function useBlurhash(post: IUserPostProps) {
  const [blurHash, setBlurHash] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (post?.blurDataUrl) {
      const canvas = document.createElement("canvas");
      const blurHash = post.blurDataUrl;
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

  return { blurHash, setBlurHash };
}
