import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

const UserRecommendations: FC<{ reccomend: IUser[] }> = ({ reccomend }) => {
  return (
    <div className="h-full w-full overflow-y-auto">
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
              quality={50}
            />
            <div className="flex flex-col items-start justify-center">
              <h2 className="text-sm font-semibold ">{user.username}</h2>
              <p className=" text-xs text-slate-500">{user.name}</p>
            </div>
          </div>
          <Link className="ml-auto" href={`/profile/${user?.username}`}>
            <span className="text-xs font-light text-blue-600">View</span>
          </Link>
        </div>
      ))}
    </div>
  );
};
export default UserRecommendations;
