import { IUser } from "@/types/user";
import { RiNotificationOffLine } from "react-icons/ri";

export default function Empty({ user }: { user: IUser | null }) {
  return (
    <>
      {user?.followers.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <RiNotificationOffLine size={50} />
          <h1 className="text-xl font-semibold mt-3">No notifications</h1>
        </div>
      )}
    </>
  )
}
