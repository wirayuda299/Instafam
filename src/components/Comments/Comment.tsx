import { getCreatedDate } from "@/util/postDate";
import Image from "next/image";
import Link from "next/link";

type Props = {
  comments: {
    commentByUid: string;
    comment: string;
    commentByName: string;
    commentByPhoto: string;
    createdAt: string | number;
  }[]
}
export default function Comment({ comments }: Props) {
  return (
    <>
      {comments?.map((comment) => (
        <div
          className="mb-5 flex w-full gap-x-14 pr-2 "
          key={comment?.createdAt}
        >
          <div className="flex items-center space-x-2 px-2 py-2 ">
            <Image
              src={comment?.commentByPhoto}
              width={40}
              height={40}
              alt={comment?.commentByName ?? "comment"}
              sizes="40px"
              className="rounded-full w-8 h-8"
              placeholder="blur"
              blurDataURL={
                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpbiR1mYB2A46H2ooooEf/2Q=="
              }
            />
            <Link
              href={`/profile/${comment?.commentByUid}`}
              className="text-sm font-semibold"
            >
              {comment?.commentByName}
              <small className="block text-left text-xs font-semibold text-gray-500">
                {getCreatedDate(comment.createdAt)}
              </small>
            </Link>
          </div>
          <div className="w-full flex-wrap overflow-hidden">
            <p className=" flex h-full flex-wrap pt-3 text-xs">
              {comment?.comment}
            </p>
          </div>
        </div>
      ))}
    </>
  )
}
