import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { Playfair_Display } from "next/font/google";
import { useSession } from "next-auth/react";
import { BiSun } from "react-icons/bi";
import { BsMoonFill } from "react-icons/bs";

import { useModalContext } from "@/stores/Modal/ModalStatesContext";
import { useState } from "react";

const playfair = Playfair_Display({
  fallback: ["sans-serif"],
  subsets: ["latin"],
  preload: true,
  weight: "700",
  display: "swap",
  adjustFontFallback: true,
});

const Header = () => {
  const { data: session } = useSession();
  const [theme, setTheme] = useState<string | null>('');
  const { modalDispatch } = useModalContext();

  const changeTheme = () => {};
  if (!session) return null;

  return (
    <header className="relative h-14 w-full border-b border-gray-500 border-opacity-50 bg-white px-5 text-black dark:bg-black dark:text-white md:hidden ">
      <div className="flex h-full w-full items-center justify-between space-x-5">
        <div className="w-full">
          <Link
            href="/"
            className={`text-xl md:text-2xl ${playfair.className}`}
          >
            <h1>Instafams</h1>
          </Link>
        </div>
        <button
          type="button"
          name={`switch theme`}
          title={`switch theme`}
          onClick={() => changeTheme()}
        >
          {theme === "dark" ? (
            <BiSun className="animate-rotateOnView text-2xl text-black dark:text-white" />
          ) : (
            <BsMoonFill className="animate-rotateOnView text-2xl text-black dark:text-white" />
          )}
        </button>
        <button
          className="relative"
          name="notifications"
          title="notifications"
          onClick={() => {
            modalDispatch({
              type: "TOGGLE_NOTIFICATION_MODAL",
              payload: {
                notificationModal: true,
              },
            });
          }}
        >
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
          <AiOutlineHeart size={25} />
        </button>
      </div>
    </header>
  );
};
export default Header;
