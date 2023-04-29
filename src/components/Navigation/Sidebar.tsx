import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import {
  useDarkModeStore,
  useDrawerStore,
  useExtraListStore,
  usePostCreateModalStore,
  useResultStore,
} from "@/stores/stores";
import { useStore } from "zustand";
import { useRouter } from "next/router";
import { useEffect } from "react";
const ExtraMenus = dynamic(() => import("./ExtraMenus"));
const NavbarList = dynamic(() => import("./Lists"));
const ExtraMenuBtn = dynamic(() => import("./ExtraMenuBtn"));
const NavHeader = dynamic(() => import("../Header/NavHeader"));

export default function Sidebar() {
  const { data: session } = useSession();
  const { darkMode } = useStore(useDarkModeStore);
  const { setExtraList, extraList } = useStore(useExtraListStore);
  const { drawer, setDrawer } = useStore(useDrawerStore);
  const { pathname } = useRouter();
  const { setPostCreateModal } = useStore(usePostCreateModalStore);
  const { setResult } = useStore(useResultStore);

  const toggler = () => {
    setResult([]);
    setDrawer(false);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setExtraList(false);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setExtraList(false);
      });
    };
  }, []);
  
  if (!session) return null;

  const handleClick = () => {
    setExtraList(!extraList);
    setDrawer(false);
  };

  return (
    <aside
      className={`${
        darkMode ? "border-r-gray-600 bg-black" : "bg-white"
      } ease fixed bottom-0 left-0 z-50 flex h-14 w-full items-center transition-width duration-300 md:static md:z-10 md:h-screen md:w-fit md:border-r md:border-opacity-50   ${
        drawer ? "!w-20" : " lg:w-64 "
      }`}
    >
      <nav className="rel flex w-full flex-col justify-between p-1 md:h-full md:p-3 lg:justify-between">
        <NavHeader />
        <div>
          <NavbarList
            session={session}
            darkMode={darkMode}
            drawer={drawer}
            handleClick={toggler}
            pathname={pathname}
            setDrawer={setDrawer}
            setPostCreateModal={setPostCreateModal}
            setResult={setResult}
          />
          <ExtraMenus />
        </div>
        <ExtraMenuBtn
          darkMode={darkMode}
          drawer={drawer}
          extraList={extraList}
          handleClick={handleClick}
        />
      </nav>
    </aside>
  );
}
