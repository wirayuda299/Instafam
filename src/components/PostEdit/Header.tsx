import { IUserPostProps } from "@/types/post";
import Image from "next/image";

type Props = {
  posts: IUserPostProps;
  getCreatedDate: (post: any | undefined) => string | undefined;
};

export default function PostEditHeader({ posts, getCreatedDate }: Props) {
  return (
    <header className="ease flex w-full items-start border-gray-500 border-opacity-50 bg-white px-3 py-3 transition-all duration-300 dark:bg-black">
      <div className="flex flex-1 items-start space-x-2 border-b border-gray-500 border-opacity-50 pb-3">
        <div className="flex cursor-pointer space-x-2">
          <Image
            src={posts?.postedByPhotoUrl ?? ""}
            width={40}
            height={40}
            priority
            alt={posts?.author}
            className="rounded-full bg-gradient-to-bl from-pink-600 to-orange-600 p-0.5"
          />
          <div className="cursor-pointer">
            <h4 className="pr-1 font-semibold"> {posts?.author} </h4>
            <p className="text-xs text-gray-500">{getCreatedDate(posts)}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
