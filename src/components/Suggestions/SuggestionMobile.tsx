import { useDarkModeStore } from "@/stores/stores";
import { IUser } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "zustand";

export default function SuggestionMobile({ user }: { user: IUser }) {
  const { darkMode } = useStore(useDarkModeStore);

  return (
    <div
      className={`flex h-44 w-44 flex-col ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      } relative items-center justify-center rounded-lg border p-5 shadow-md`}
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
}
