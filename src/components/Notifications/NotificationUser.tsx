import type { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

import { useDrawerContext } from "@/stores/Drawer/DrawerStates";

type NotificationDrawerProps = {
  follower: Pick<IUser, "followers">["followers"][0];
  session: Session | null;
  user: IUser;
};

const NotificationUser: FC<NotificationDrawerProps> = ({
  follower,
  session,
  user,
}) => {
  const { drawerDispatch } = useDrawerContext();
  return (
    <div className="mt-4 flex items-center space-x-2 px-4">
      <Image
        src={follower.followedImage}
        width={40}
        height={40}
        className="rounded-full"
        alt={follower.followedByName}
        priority
      />
      <div className="text-sm ">
        <div>
          <div className="flex flex-wrap place-items-center space-x-3">
            <Link
              href={`/profile/${follower.followedByName}`}
              onClick={() => {
                drawerDispatch({
                  type: "TOGGLE_NOTIFICATION_DRAWER",
                  payload: {
                    notificationDrawer: false,
                  },
                });
              }}
            >
              <h1 className="dark:text-whitetext-black">
                {follower.followedByName}
              </h1>
              <span className="truncate text-xs text-gray-500">
                started following you
              </span>
            </Link>
            <button
              className="mt-2 rounded-md bg-blue-500 px-5 py-1"
              onClick={async () => {
                const { handleFollow } = await import("@/helper/follow");
                const followArgs = {
                  id: follower.followedBy,
                  uid: session?.user?.uid as string,
                  followedByName: session?.user?.username as string,
                  followedImage: session?.user?.image as string,
                  followedDate: Date.now(),
                };
                await handleFollow(followArgs);
              }}
            >
              <span className="text-xs text-white">
                {user.following.find(
                  (user) => user.userId === follower.followedBy
                )
                  ? "Following"
                  : "Follow"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotificationUser;
