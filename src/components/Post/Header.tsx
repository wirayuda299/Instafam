import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCreatedDate } from "@/util/postDate";
import { IUserPostProps } from "@/types/post";
import { BsThreeDots } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { selectedPostState } from "@/store/selectedPost";

type HeaderProps = {
  post: IUserPostProps;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  isMenuOpen: boolean;
};

export default function Postheader({
  post,
  setIsMenuOpen,
  isMenuOpen,
}: HeaderProps) {
  const [selectedPost, setSelectedPost] = useRecoilState(selectedPostState);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
    setSelectedPost(post);
  };
  return (
    <div className="relative flex h-fit items-center px-4 py-3">
      <Image
        className="h-8 w-8 rounded-full object-cover"
        alt={post?.author ?? "user profile"}
        width={50}
        height={50}
        src={post?.postedByPhotoUrl || ""}
        placeholder="blur"
        priority
        blurDataURL={
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBaKKKAP//Z"
        }
        sizes="50px"
      />
      <div className="ml-3 flex w-full items-center justify-between ">
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
