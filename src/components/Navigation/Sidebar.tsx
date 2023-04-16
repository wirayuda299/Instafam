import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useDrawerStore } from "@/stores/stores";
import { useStore } from "zustand";
const ExtraMenus = dynamic(() => import("./ExtraMenus"));
const NavbarList = dynamic(() => import("./Lists"));
const ExtraMenuBtn = dynamic(() => import("./ExtraMenuBtn"));
const NavHeader = dynamic(() => import("./Header"));
export default function Sidebar() {
  const { drawer } = useStore(useDrawerStore)
  const { data: session } = useSession();
  
  return (
    <aside
      className={`ease fixed bottom-0 left-0 z-50 flex h-12 w-full items-center transition-width duration-300 md:static md:z-10 md:h-screen md:w-fit md:border-r md:border-opacity-50 md:dark:border-r-gray-600  ${
        drawer ? "!w-20" : " lg:w-64 "
      }`}
    >
      <nav className="rel flex w-full flex-col justify-center bg-white p-1 dark:bg-black dark:text-white md:h-full md:p-3 lg:justify-between">
       <NavHeader />
        <div>
          <NavbarList session={session} />
          <ExtraMenus />
        </div>
        <ExtraMenuBtn />
      </nav>
    </aside>
  );
}
