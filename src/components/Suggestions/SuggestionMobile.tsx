import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

import { useModalContext } from "@/stores/Modal/ModalStatesContext";

const SuggestionMobile: FC<{ user: IUser }> = ({ user }) => {
  const { modalDispatch } = useModalContext();

  return (
    <div
      className="relative flex aspect-square h-44 w-44 flex-col items-center justify-center rounded-lg border border-gray-400 border-opacity-10 bg-white
       p-5 text-black shadow-xl dark:bg-black dark:text-white "
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
      <h3
        className="mt-2 w-full truncate text-center font-bold"
        title={user.username}
      >
        {user.username}
      </h3>
      <Link
        title={user.username}
        onClick={() => {
          if (window.innerWidth >= 1028) {
            modalDispatch({
              type: "SHOW_USERS_MODAL",
              payload: {
                showAllUserModal: false,
              },
            });
          }
          return undefined;
        }}
        className="mt-2 h-7 w-32 rounded-md  bg-blue-500 text-center text-white "
        href={`/profile/${user.username}`}
      >
        View Profile
      </Link>
    </div>
  );
};
export default SuggestionMobile;
