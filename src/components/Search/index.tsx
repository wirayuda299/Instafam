import { AiOutlineSearch } from "react-icons/ai";
import { memo, useEffect } from "react";
import Form from "./Form";
import { useDarkModeStore, useDrawerStore } from "@/stores/stores";
import { useStore } from "zustand";

function SearchDrawer() {
  const { drawer, setDrawer } = useStore(useDrawerStore);
  const { darkMode } = useStore(useDarkModeStore);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setDrawer(false);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setDrawer(false);
      });
    };
  }, []);

  return (
    <>
      {drawer ? (
        <section
          className={`fixed z-50  transition-all duration-300 ease-out ${
            darkMode ? "bg-black" : "bg-white"
          }  ${
            drawer
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
}
export default memo(SearchDrawer);
