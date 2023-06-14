import SuggestionMobile from "@/components/Suggestions/SuggestionMobile";
import { getUserRecommendation } from "@/helper/getUser";
import { useStateContext } from "@/stores/StateContext";
import { useDarkModeStore } from "@/stores/stores";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useStore } from "zustand";

const Recommendations = () => {
  const {
    state: { showAllUserModal },
    Dispatch,
  } = useStateContext();
  const { darkMode } = useStore(useDarkModeStore);
  const { data: session } = useSession();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getusers = async () => {
      try {
        const data = await getUserRecommendation(session?.user.uid as string);
        setUsers(data ?? []);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        console.log(error.message);
      }
    };
    getusers();
  }, [showAllUserModal]);
  if (!showAllUserModal) return null;

  return (
    <>
      {createPortal(
        <div className="fixed top-0 z-50 hidden h-screen w-full overflow-hidden backdrop-blur-sm lg:block">
          <div className="relative flex h-full w-full items-center justify-center bg-black bg-opacity-50 text-white backdrop-blur-md">
            <button
              name="close"
              title="close"
              type="button"
              className="absolute right-5 top-3"
              onClick={() =>
                Dispatch({
                  type: "SHOW_USERS_MODAL",
                  payload: {
                    showAllUserModal: false,
                  },
                })
              }
            >
              <AiOutlineClose size={35} />
            </button>
            <div
              className={`max-h-[35rem] w-full max-w-2xl overflow-y-auto overflow-x-hidden rounded-md border border-gray-400 border-opacity-20 p-5 ${
                darkMode ? "bg-black" : "bg-white"
              }`}
            >
              <div className="grid w-full grid-cols-2 place-items-center gap-5">
                {loading ? (
                  <div className="aspect-square h-44 w-44 animate-pulse bg-black"></div>
                ) : (
                  users.map((user) => (
                    <SuggestionMobile user={user} key={user.uid} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>,
        document.getElementById("modal") as Element
      )}
    </>
  );
};
export default Recommendations;
