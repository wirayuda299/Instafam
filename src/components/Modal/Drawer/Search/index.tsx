import { AiOutlineSearch } from "react-icons/ai";
import { memo } from "react";
import { useDarkModeStore } from "@/stores/stores";
import { useStore } from "zustand";
import dynamic from "next/dynamic";
import { useDrawerContext } from "@/stores/Drawer/DrawerStates";
const Form = dynamic(() => import("./Form"), { ssr: false });

const SearchDrawer = () => {
  const {
    drawerStates: { isSearchDrawerOpen },
  } = useDrawerContext();
  const { darkMode } = useStore(useDarkModeStore);
  if (!isSearchDrawerOpen) return null;

  return (
    <section
      className={`ease fixed  z-[1] transition-all duration-150 ${
        darkMode ? "bg-black" : "bg-white"
      } ${
        isSearchDrawerOpen
          ? "animate-slideIn lg:animate-slideIn"
          : "animate-slideOut lg:animate-slideOutWidth"
      }`}
    >
      <div className=" h-full w-full ">
        <div className="w-64 border-b p-5">
          <h1 className="py-5 text-2xl font-semibold">Search</h1>
          <Form height="h-screen ">
            <button type="submit" name="search" title="search">
              <AiOutlineSearch size={20} />
            </button>
          </Form>
        </div>
      </div>
    </section>
  );
};
export default memo(SearchDrawer);
