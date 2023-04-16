import { AiOutlineInstagram } from "react-icons/ai";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { searchDrawer } from "@/store/searchDrawer";
import dynamic from "next/dynamic";
import ExtraMenuBtn from "./ExtraMenuBtn";
import { useSession } from "next-auth/react";
const ExtraMenus = dynamic(() => import("./ExtraMenus"));
const NavbarList = dynamic(() => import("./Lists"));
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  fallback: ["sans-serif"],
  subsets: ["latin"],
  preload: true,
  weight: "700",
});
export default function Sidebar() {
  const drawerOpen = useRecoilValue(searchDrawer);
  const { data: session } = useSession();
  return (
    <aside
      className={`ease fixed bottom-0 left-0 z-50 flex h-12 w-full items-center transition-width duration-300 md:static md:z-10 md:h-screen md:w-fit md:border-r md:border-opacity-50 md:dark:border-r-gray-600  ${drawerOpen ? "!w-20" : " lg:w-64 "
        }`}
    >
      <nav className="rel flex w-full flex-col justify-center bg-white p-1 dark:bg-black dark:text-white md:h-full md:p-3 lg:justify-between">
        <header
          className={`hidden w-full flex-col pl-6 md:flex md:pl-2.5 ${playfair.className}`}
        >
          <Link href="/" className={`text-3xl font-semibold lg:pt-5`}>
            {drawerOpen ? (
              <AiOutlineInstagram size={35} />
            ) : (
              <>
                <h1 className="hidden lg:block">Instafams</h1>
                <span className="block lg:hidden">
                  <AiOutlineInstagram className="text-4xl" />
                </span>
              </>
            )}
          </Link>
        </header>
        <div>
          <NavbarList session={session} />
          <ExtraMenus />
        </div>
        <ExtraMenuBtn />
      </nav>
    </aside>
  );
}
