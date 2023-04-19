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
            placeholder="blur"
            blurDataURL={'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpbiR1mYB2A46H2ooooEf/2Q=='}
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
