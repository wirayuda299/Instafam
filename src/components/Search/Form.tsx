import useSearchUser from "@/hooks/useSearchUser";
import { ReactNode } from "react";
import dynamic from "next/dynamic";
import {
  useDarkModeStore,
  useDrawerStore,
  useResultStore,
} from "@/stores/stores";
import { useStore } from "zustand";
const FormResult = dynamic(() => import("./Results"), { ssr: true });

const defaultValues = {
  search: "",
};

type Props = {
  height: string;
  children: ReactNode;
};

export default function Form({ height, children }: Props) {
  const { handleSubmit, onSubmit, register, isPending } = useSearchUser();
  const { result, setResult } = useStore(useResultStore);
  const { setDrawer } = useStore(useDrawerStore);
  const { darkMode } = useStore(useDarkModeStore);
  
  const handleDrawerToggler = () => {
    setResult([]);
    setDrawer(false);
  };
  return (
    <>
      <form
        className={`mt-5 rounded-sm  ${height} ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className={`w-full pb-5  ${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          } `}
        >
          <div
            className={`${
              darkMode ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <div className="flex w-full items-center justify-between rounded-md bg-[#b9b9b917] px-3">
              <input
                type="search"
                placeholder="search user"
                autoComplete="off"
                autoFocus={false}
                alt="search user"
                security="restricted"
                className="w-full bg-transparent py-2 text-xs focus:border-0 focus:outline-none focus:ring-0 md:text-sm"
                defaultValue={defaultValues.search}
                {...register("search")}
              />
              {children}
            </div>
            <FormResult
              handleDrawerToggler={handleDrawerToggler}
              results={result}
              isPending={isPending}
              setResults={setResult}
              customs={`h-screen mt-5 -left-1 fixed z-50 top-16 md: h-full  md:top-0 md:left-0 md:w-full md:z-0  md:transition-all md:duration-300 md:ease-in-out md:static ${
                darkMode ? "bg-black text-white" : "bg-white text-black"
              }`}
            />
          </div>
        </div>
      </form>
    </>
  );
}
