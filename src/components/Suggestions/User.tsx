import { IUser } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
export default function UserRecommendations({
  reccomend,
}: {
  reccomend: IUser[];
}) {
  return (
    <>
      {reccomend?.map((user: any) => (
        <div
          key={user.uid}
          className="mb-2 mt-5 flex w-full items-center justify-between space-x-2"
        >
          <div className="flex items-center space-x-2 pb-3">
            <Image
              className=" rounded-full"
              src={user?.image}
              alt={user?.name ?? ""}
              width={40}
              height={40}
              sizes="40px"
              placeholder="blur"
              blurDataURL={
                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBaKKKAP//Z"
              }
              priority
              quality={50}
            />
            <div className="flex flex-col items-start justify-center">
              <span className="text-sm font-semibold ">
                {user.username}
              </span>
              <p className=" text-xs text-slate-500">{user.name}</p>
            </div>
          </div>
          <Link className="ml-auto" href={`/profile/${user?.username}`}>
            <span className="text-xs font-light text-blue-600">View</span>
          </Link>
        </div>
      ))}
    </>
  );
}
