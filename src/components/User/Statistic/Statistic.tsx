import { IUserPostProps } from "@/types/post";
import { IUser } from "@/types/user";
import { Session } from "next-auth";
import Image from "next/image";
interface IProps {
  users: IUser | undefined;
  posts: IUserPostProps[] | [];
  session: Session | null;
  refreshData: () => void;
}

export default function Statistic({
  session,
  users,
  posts,
  refreshData,
}: IProps) {
  const data = [
    {
      id: 1,
      title: "Posts",
      value: posts?.length,
    },
    {
      id: 2,
      title: "Followers",
      value: users && users?.followers.length,
    },
    {
      id: 3,
      title: "Following",
      value: users && users?.following.length,
    },
  ];
  return (
    <div className="w-full">
      <div className="w-full text-black dark:text-white">
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
                  />
                  <div className="w-full">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center sm:gap-5">
                      <h1 className="flex-1 text-left text-2xl font-semibold xs1:pb-3 xs1:text-4xl sm:mb-5 sm:pb-0">
                        {users ? users?.username : ""}
                      </h1>
                      {session?.user.uid !== users?.uid ? (
                        <button
                          name="Follow unfollow"
                          title="follow unfollow"
                          className="w-full truncate rounded bg-blue-600 px-5 py-1 text-xs text-white md:py-2"
                          onClick={async () => {
                            const { handleFollow } = await import(
                              "@/helper/follow"
                            );
                            const followArgs = {
                              id: users?.uid as string,
                              uid: session?.user.uid as string,
                              followedByName: session?.user.username as string,
                              refreshData,
                              ssr: true,
                            };
                            handleFollow(followArgs);
                          }}
                        >
                          {users?.followers.find(
                            (foll: { followedBy: string | undefined }) =>
                              foll.followedBy === session?.user.uid
                          )
                            ? "Unfollow"
                            : "Follow"}
                        </button>
                      ) : null}
                    </div>

                    <ul
                      title="Statistic"
                      className={`mt-2 hidden items-center justify-start space-x-3 sm:flex`}
                    >
                      {data.map((item) => (
                        <li
                          title={item.title}
                          className="mt-1 text-center text-sm font-medium"
                          key={item.id}
                        >
                          <div className="flex items-center space-x-2 text-lg font-semibold">
                            <span className="font-semibold">{item.value}</span>
                            <span>{item.title}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile statistic start */}
        <ul
          title="Statistic"
          className={`mt-5 flex w-full items-center justify-evenly space-x-3 border-t border-gray-400 py-5 sm:hidden sm:px-5`}
        >
          {data.map((item) => (
            <li
              title={item.title}
              className="mt-2 text-center text-sm font-semibold"
              key={item.id}
            >
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{item.value}</span>
                <span>{item.title}</span>
              </div>
            </li>
          ))}
        </ul>
        {/* Mobile statistic end */}
      </div>
    </div>
  );
}
