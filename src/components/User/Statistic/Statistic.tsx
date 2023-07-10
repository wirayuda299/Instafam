import Image from "next/image";
import dynamic from "next/dynamic";
import { FC, memo } from "react";
import type { Session } from "next-auth";

const UserInfo = dynamic(() => import("../Info/Info"));
const DesktopStatistic = dynamic(() => import("./Desktop"));
const StatisticMobile = dynamic(() => import("./Mobile"));

type Props = {
  users: IUser | null;
  posts: IUserPostProps[] | [];
  session: Session | null;
  refreshData: () => void;
};

const Statistic: FC<Props> = ({ session, users, posts, refreshData }) => {
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
  return (
    <div className="flex w-full items-center space-x-3 border-b border-gray-500 border-opacity-50 md:justify-center md:space-x-10">
      <div className="w-full">
        <div className="text-black dark:text-white">
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
                      className="h-24 w-24 rounded-full border p-1 xs1:h-28 xs1:w-28 lg:h-32 lg:w-32"
                    />
                    <div className="w-full">
                      <UserInfo
                        refreshData={refreshData}
                        session={session}
                        users={users}
                      />
                      <div className="flex sm:flex-col-reverse">
                        <div className="w-full">
                          {users?.uid === session?.user?.uid ? (
                            <button
                              name="sign out"
                              type="button"
                              title="sign out"
                              className="mt-2 w-full rounded-md  bg-blue-500 py-1 text-center text-white md:hidden"
                              onClick={async () => {
                                const { signOut } = await import(
                                  "next-auth/react"
                                );
                                signOut({
                                  callbackUrl: `${process.env.NEXTAUTH_URL}/auth/signin`,
                                  redirect: true,
                                });
                              }}
                            >
                              Log Out
                            </button>
                          ) : null}
                        </div>
                        <DesktopStatistic data={data} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <StatisticMobile data={data} />
        </div>
      </div>
    </div>
  );
};
export default memo(Statistic);
