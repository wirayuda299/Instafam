import type { FC, ReactNode } from "react";
import dynamic from "next/dynamic";
import { type FieldValues, useForm } from "react-hook-form";
import { getCsrfToken, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useStateContext } from "@/stores/Global/StateContext";
import { useDrawerContext } from "@/stores/Drawer/DrawerStates";

const FormResult = dynamic(() => import("./Results"), { ssr: true });

const defaultValues = {
  search: "",
};

type FormProps = {
  height: string;
  children: ReactNode;
};

const Form: FC<FormProps> = ({ height, children }) => {
  const { handleSubmit, resetField, register } = useForm();
  const {
    state: { result },
    Dispatch,
  } = useStateContext();
  const { drawerDispatch } = useDrawerContext();
  const router = useRouter();
  const { data: session } = useSession();

  const handleDrawerToggler = () => {
    Dispatch({
      type: "SET_RESULT",
      payload: {
        result: [],
      },
    });
    drawerDispatch({
      type: "TOGGLE_SEARCH_DRAWER",
      payload: {
        searchDrawer: false,
      },
    });
    drawerDispatch({
      type: "TOGGLE_RESULT_DRAWER",
      payload: {
        resultDrawer: false,
      },
    });
  };

  const searchUser = async (data: FieldValues) => {
    const { toast } = await import("react-hot-toast");
    try {
      const token = await getCsrfToken();
      if (!session || !token) {
        toast.error("Please login to search user");
        router.push("/auth/signin");
        return;
      }
      if (data.search === "") {
        toast.error("Please enter a username or name of user");
        return;
      }
      if (data.search.length < 4) {
        toast.error("Please enter at least 4 characters");
        return;
      }
      const res = await fetch(`/api/search-user?search=${data.search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result: IUser[] = await res.json();
      if (result.length === 0) {
        toast.error("No user found");
        return;
      }
      Dispatch({
        type: "SET_RESULT",
        payload: {
          result,
        },
      });
      resetField("search");

      drawerDispatch({
        type: "TOGGLE_RESULT_DRAWER",
        payload: {
          resultDrawer: true,
        },
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <form
        className={`mt-5 rounded-sm  ${height} text-black dark:bg-black dark:text-white `}
        onSubmit={handleSubmit(searchUser)}
      >
        <div className="w-full bg-white pb-5 text-black dark:bg-black dark:text-white  ">
          <div className=" text-black dark:bg-black dark:text-white ">
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
              customs="h-screen fixed z-50 top-0 md: h-full  md:left-0 md:w-full md:z-0  md:transition-all md:duration-300 md:ease-in-out md:static  text-black dark:bg-black dark:text-white "
            />
          </div>
        </div>
      </form>
    </>
  );
};
export default Form;
