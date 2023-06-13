import { useDarkModeStore } from "@/stores/stores";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { useStore } from "zustand";

const SuggestionMobile: FC<{ user: IUser }> = ({ user }) => {
  const { darkMode } = useStore(useDarkModeStore);

  return (
    <div
      className={`flex aspect-square h-44 w-44 flex-col border border-gray-400 border-opacity-10 shadow-xl ${
        darkMode ? "bg-black   text-white" : "bg-white text-black"
      } relative items-center justify-center rounded-lg p-5 shadow-md`}
    >
      <Image
        src={user.image}
        width={50}
        height={50}
        className="rounded-full"
        loading="lazy"
        placeholder="blur"
        blurDataURL={user.image}
        alt={user.username}
      />
      <h2
        className="mt-2 w-full truncate text-center font-bold"
        title={user.username}
      >
        {user.username}
      </h2>
      <Link
        className="mt-2 h-7 w-32 rounded-md  bg-blue-500 text-center text-white "
        href={`/profile/${user.username}`}
      >
        View Profile
      </Link>
    </div>
  );
};
export default SuggestionMobile;
