import { IUser } from "@/types/user";
import type { Session } from "next-auth";
import type { FC } from "react";

type Props = {
  users: IUser | null;
  session: Session | null;
  refreshData: () => void;
};
const Info:FC<Props> = ({ users, session, refreshData }) => {
  return (
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
            const { handleFollow } = await import("@/helper/follow");
            const followArgs = {
              id: users?.uid as string,
              uid: session?.user.uid as string,
              followedByName: session?.user.username as string,
              followedImage: session?.user.image as string,
            };
            await handleFollow(followArgs).then(() => refreshData());
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
  );
}
export default Info
