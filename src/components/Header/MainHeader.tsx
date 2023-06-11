import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { Playfair_Display } from "next/font/google";
import { useStore } from "zustand";
import { useDarkModeStore } from "@/stores/stores";
import { useSession } from "next-auth/react";
import { BiSun } from "react-icons/bi";
import { BsMoonFill } from "react-icons/bs";
import { useStateContext } from "@/stores/StateContext";

const playfair = Playfair_Display({
  fallback: ["sans-serif"],
  subsets: ["latin"],
  preload: true,
  weight: "700",
  display: "swap",
  adjustFontFallback: true,
});
const Header = () => {
  const { darkMode, setDarkMode } = useStore(useDarkModeStore);
  const { data: session } = useSession();
  const { Dispatch } = useStateContext();

  const changeTheme = () => {
    localStorage.setItem("theme", darkMode ? "light" : "dark");
    setDarkMode(!darkMode);
  };
  if (!session) return null;

  return (
    <header
      className={`relative h-14 w-full border-b border-gray-500 border-opacity-50 px-5 md:hidden ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
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
          name={`switch to ${darkMode ? "light" : "dark"}`}
          title={`switch to ${darkMode ? "light" : "dark"}`}
          onClick={() => changeTheme()}
        >
          {darkMode ? (
            <BiSun
              className={`animate-rotateOnView text-2xl ${
                darkMode ? "text-white" : "text-black"
              }`}
            />
          ) : (
            <BsMoonFill
              className={`animate-rotateOnView text-2xl ${
                darkMode ? "text-white" : "text-black"
              }`}
            />
          )}
        </button>
        <button
          className="relative"
          name="notifications"
          title="notifications"
          onClick={() => {
            Dispatch({
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
