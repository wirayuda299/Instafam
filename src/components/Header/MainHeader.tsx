import Link from "next/link";
import { AiOutlineClose, AiOutlineHeart } from "react-icons/ai";
import { Playfair_Display } from "next/font/google";
import { useStore } from "zustand";
import { useDarkModeStore, useUserReceiverDrawerStore } from "@/stores/stores";
import { useSession } from "next-auth/react";
import Buttons from "../Buttons/Buttons";
import { RxHamburgerMenu } from "react-icons/rx";
import { useRouter } from "next/router";

const playfair = Playfair_Display({
  fallback: ["sans-serif"],
  subsets: ["latin"],
  preload: true,
  weight: "700",
  display: "swap",
  adjustFontFallback: true,
});
export default function Header() {
  const { darkMode } = useStore(useDarkModeStore);
  const { data: session } = useSession();
  const { setUserReceiverDrawer, userReceiverDrawer } = useStore(
    useUserReceiverDrawerStore
  );
  const { pathname } = useRouter();
  return (
    <>
      {session ? (
        <header
          className={`relative h-14 w-full border-b border-gray-500 border-opacity-50 px-5 md:hidden ${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <div className="flex h-full w-full items-center justify-between space-x-2">
            <div className="w-full">
              <Link
                href="/"
                className={`text-xl md:text-2xl ${playfair.className}`}
              >
                <h1>Instafams</h1>
              </Link>
            </div>
            <Buttons
              className="relative"
              name="notifications"
              title="notifications"
            >
              <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
              <AiOutlineHeart size={25} />
            </Buttons>

            {pathname === "/messages" ? (
              <Buttons onClick={() => setUserReceiverDrawer(true)}>
                {userReceiverDrawer ? (
                  <AiOutlineClose size={20} />
                ) : (
                  <RxHamburgerMenu size={20} />
                )}
              </Buttons>
            ) : null}
          </div>
        </header>
      ) : null}
    </>
  );
}
