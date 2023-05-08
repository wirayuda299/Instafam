import { AiOutlineSearch } from "react-icons/ai";
import { type FC, memo } from "react";
import { useDarkModeStore } from "@/stores/stores";
import { useStore } from "zustand";
import dynamic from "next/dynamic";
import { useStateContext } from "@/stores/StateContext";
const Form = dynamic(() => import("./Form"), { ssr: false });

const SearchDrawer: FC = () => {
  const {
    state: { isSearchDrawerOpen },
  } = useStateContext();
  const { darkMode } = useStore(useDarkModeStore);

  return (
    <>
      {isSearchDrawerOpen ? (
        <section
          className={`fixed z-50  transition-all duration-300 ease-out ${
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
      ) : null}
    </>
  );
};
export default memo(SearchDrawer);
