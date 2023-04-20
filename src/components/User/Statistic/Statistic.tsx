import { IUserPostProps } from "@/types/post";
import { IUser } from "@/types/user";
import { Session } from "next-auth";
import Image from "next/image";
import dynamic from "next/dynamic";
import { memo } from "react";
import { useStore } from "zustand";
import { useDarkModeStore } from "@/stores/stores";
const UserInfo = dynamic(() => import("../Info/Info"));
const DesktopStatistic = dynamic(() => import("./Desktop"));
const StatisticMobile = dynamic(() => import("./Mobile"));

type Props = {
  users: IUser | null;
  posts: IUserPostProps[] | [];
  session: Session | null;
  refreshData: () => void;
};

function Statistic({ session, users, posts, refreshData }: Props) {
  const data = [
    {
      id: 1,
      title: "Posts",
      value: posts?.length,
    },
    {
      id: 2,
      title: "Followers",
      value: users?.followers.length,
    },
    {
      id: 3,
      title: "Following",
      value: users?.following.length,
    },
  ];
  const { darkMode } = useStore(useDarkModeStore);
  return (
    <div className="w-full">
      <div className={`${darkMode ? "text-white" : "text-black"}`}>
        <div className="flex w-full flex-col items-center justify-between sm:flex-row sm:justify-around">
          <div className="flex flex-wrap items-center justify-start sm:space-x-5">
            <div className="py-5">
              <div className="pb-5 md:pb-10">
                <div className="flex w-full items-center justify-evenly gap-6 xs1:space-x-10">
                  <Image
                    src={users ? users?.image : ""}
                    alt={users ? users?.username : ""}
                    width={500}
                    height={500}
                    sizes="(max-width: 500px) 100vw, 500px"
                    priority
                    className="h-24 w-24 rounded-full border p-1 xs1:h-28 xs1:w-28"
                    placeholder="blur"
                    blurDataURL={
                      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpbiR1mYB2A46H2ooooEf/2Q=="
                    }
                  />
                  <div className="w-full">
                    <UserInfo
                      refreshData={refreshData}
                      session={session}
                      users={users}
                    />
                    <DesktopStatistic data={data} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <StatisticMobile data={data} />
      </div>
    </div>
  );
}
export default memo(Statistic);
