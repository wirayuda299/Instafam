import Image from "next/image";
import Link from "next/link";
import { getCreatedDate } from "@/util/postDate";
import { IUserPostProps } from "@/types/post";
import { BsThreeDots } from "react-icons/bs";
import { useStore } from "zustand";
import {
  useDarkModeStore,
  useMenuModalStore,
  useSelectedPostStore,
} from "@/stores/stores";
import { imageLoader } from "@/util/imageLoader";

export default function Postheader({ post }: { post: IUserPostProps }) {
  const { setSelectedPost } = useStore(useSelectedPostStore);
  const { menuModal, setMenuModal } = useStore(useMenuModalStore);
  const { darkMode } = useStore(useDarkModeStore);
  const handleClick = () => {
    setMenuModal(!menuModal);
    setSelectedPost(post);
  };
  return (
    <div
      className={`relative flex h-fit items-center px-4 py-3 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Image
        className="h-8 w-8 rounded-full object-cover"
        alt={post?.author ?? "user profile"}
        width={50}
        height={50}
        src={post?.postedByPhotoUrl || ""}
        placeholder="blur"
        priority
        blurDataURL={Buffer.from(post?.postedByPhotoUrl as string).toString()}
        sizes="50px"
      />
      <div className={`ml-3 flex w-full items-center justify-between`}>
        <div>
          <Link
            href={`/profile/${post.author}`}
            className="block text-sm font-semibold leading-tight antialiased"
          >
            {post?.author}
            <span
              className={`block font-thin leading-tight text-gray-500 antialiased xs:text-[10px] sm:text-xs `}
            >
              {getCreatedDate(post)}
            </span>
          </Link>
        </div>
      </div>

      <div>
        <button type="button" name="menu" title="menu" onClick={handleClick}>
          <BsThreeDots className="text-gray-500" size={20} />
        </button>
      </div>
    </div>
  );
}
