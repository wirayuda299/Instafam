import { searchDrawer } from "@/store/searchDrawer";
import { useRecoilState } from "recoil";
import { AiOutlineSearch } from "react-icons/ai";
import { memo, useEffect } from "react";
import Form from "./Form";

function SearchDrawer() {
  const [drawerOpen, setDrawerOpen] = useRecoilState(searchDrawer);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setDrawerOpen(false);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setDrawerOpen(false);
      });
    };
  }, []);

  return (
    <section
      className={`fixed z-50 bg-white transition-all duration-300 ease-out dark:bg-black ${
        drawerOpen
          ? "animate-slideIn lg:animate-slideIn"
          : "-left-full hidden animate-slideOut lg:animate-slideOutWidth"
      }`}
    >
      <div className=" h-full w-full text-black dark:text-white">
        <div className="w-64 border-b p-5">
          <h1 className="py-5 text-2xl font-semibold">Search</h1>
          <Form height="h-screen">
            <button type="submit" name="search" title="search">
              <AiOutlineSearch size={20} />
            </button>
          </Form>
        </div>
      </div>
    </section>
  );
}
export default memo(SearchDrawer);
