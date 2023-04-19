import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useDarkModeStore, useDrawerStore } from "@/stores/stores";
import { useStore } from "zustand";
const ExtraMenus = dynamic(() => import("./ExtraMenus"));
const NavbarList = dynamic(() => import("./Lists"));
const ExtraMenuBtn = dynamic(() => import("./ExtraMenuBtn"));
const NavHeader = dynamic(() => import("./Header"));

export default function Sidebar() {
  const { drawer } = useStore(useDrawerStore);
  const { data: session } = useSession();
  const { darkMode } = useStore(useDarkModeStore);

  return (
    <>
      {session ? (
        <aside
          className={`${
            darkMode ? "border-r-gray-600 bg-black" : "bg-white"
          } ease fixed bottom-0 left-0 z-50 flex h-12 w-full items-center transition-width duration-300 md:static md:z-10 md:h-screen md:w-fit md:border-r md:border-opacity-50   ${
            drawer ? "!w-20" : " lg:w-64 "
          }`}
        >
          <nav className="rel flex w-full flex-col justify-between p-1 md:h-full md:p-3 lg:justify-between">
            <NavHeader />
            <div>
              <NavbarList session={session} />
              <ExtraMenus />
            </div>
            <ExtraMenuBtn />
          </nav>
        </aside>
      ) : null}
    </>
  );
}
