import dynamic from "next/dynamic";
import { AiOutlineSearch } from "react-icons/ai";
import { memo, useEffect, useRef } from "react";

import { useDrawerContext } from "@/stores/Drawer/DrawerStates";
const Form = dynamic(() => import("./Form"), { ssr: false });

const SearchDrawer = () => {
  const {
    drawerStates: { isSearchDrawerOpen },drawerDispatch
  } = useDrawerContext();
  const searchRef = useRef<HTMLDivElement>(null)
  
   useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click",handleClickOutside);
      };
   }, []);  

  function handleClickOutside(e: MouseEvent) {
    e.stopPropagation()    

    if (!e.target || !searchRef.current) return 
    
    const isTargetClicked = e.clientX > 330
    const search = searchRef.current.id === 'search'

    if (isTargetClicked || !search) return drawerDispatch({ type: 'TOGGLE_SEARCH_DRAWER', payload: { searchDrawer: false } })
    
  }

  if (!isSearchDrawerOpen) return null;


  return (
    <section
      ref={searchRef}
      id="search"
      className={`ease search-drawer fixed z-[1] bg-white transition-all duration-150 dark:bg-black ${
        isSearchDrawerOpen
          ? "animate-slideIn lg:animate-slideIn"
          : "animate-slideOut lg:animate-slideOutWidth"
      }`}
    >
      <div className=" h-full w-full "   id="search-drawer-parent">
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
