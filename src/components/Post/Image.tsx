import { IUserPostProps } from "@/types/post";
import Image from "next/image";
import useBlurhash from "@/hooks/useBlurhash";

type Props = {
  post: IUserPostProps;
  classNames?: string;
  loading?: string | undefined;
  priority?: boolean;
};
export default function PostImage({ post, classNames, loading }: Props) {
  const { blurHash } = useBlurhash(post);
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
        loading={loading === "lazy" ? "lazy" : "eager"}
        priority={loading === undefined ? true : false}
        className={classNames}
        alt={post?.author ?? "user post image"}
      />
    </>
  );
}
