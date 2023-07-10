import dynamic from "next/dynamic";
import { AiOutlineSearch } from "react-icons/ai";
import { memo } from "react";

import { useDrawerContext } from "@/stores/Drawer/DrawerStates";
const Form = dynamic(() => import("./Form"), { ssr: false });

const SearchDrawer = () => {
  const {
    drawerStates: { isSearchDrawerOpen },
  } = useDrawerContext();

  if (!isSearchDrawerOpen) return null;


  return (
    <section
      id="search-drawer"
      className={`ease fixed z-[1] bg-white transition-all duration-150 dark:bg-black ${
        isSearchDrawerOpen
          ? "animate-slideIn lg:animate-slideIn"
          : "animate-slideOut lg:animate-slideOutWidth"
      }`}
    >
      <div className=" h-full w-full ">
        <div className="w-64 border-b p-5">
          <h2 className="py-5 text-2xl font-semibold">Search</h2>
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
