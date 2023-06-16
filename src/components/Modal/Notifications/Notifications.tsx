import Empty from "@/components/Notifications/Empty";
import NotificationUser from "@/components/Notifications/NotificationUser";
import { db } from "@/config/firebase";
import { useModalContext } from "@/stores/Modal/ModalStatesContext";
import { useDarkModeStore } from "@/stores/stores";
import { onSnapshot, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { memo, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useStore } from "zustand";

const NotificationsModal = () => {
  const { darkMode } = useStore(useDarkModeStore);
  const {
    modalStates: { notificationModal },
    modalDispatch,
  } = useModalContext();
  const { data: session } = useSession();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "users", `${session?.user?.uid}`),
      (docs) => {
        if (docs.exists()) {
          setUser(docs.data() as IUser);
        }
      }
    );
    return () => {
      unsub();
      setUser(null);
    };
  }, [db, notificationModal]);

  if (!notificationModal) return null;

  return createPortal(
    <div
      className={` fixed left-0 top-0 z-[99] h-screen w-full select-none !overflow-y-auto  !overflow-x-hidden shadow-sm  md:hidden lg:hidden  ${
        notificationModal ? "animate-fadeIn" : "hidden animate-fadeOut"
      } ${darkMode ? "bg-black" : "bg-white"}`}
      aria-modal="true"
      role="dialog"
    >
      <div className="relative h-full w-full">
        <div
          className={`sticky top-0 z-30 flex w-full items-center border-b border-gray-500 border-opacity-50 px-3 py-3 ${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <div className="flex w-full place-items-center ">
            <button
              type="button"
              name="back"
              title="back"
              className="text-left "
              onClick={() => {
                modalDispatch({
                  type: "TOGGLE_NOTIFICATION_MODAL",
                  payload: {
                    notificationModal: false,
                  },
                });
              }}
            >
              <AiOutlineArrowLeft size={25} />
            </button>
            <h1 className="w-full text-center font-semibold">Notifications</h1>
          </div>
        </div>
        <div>
          {user?.followers?.length === 0 && (
            <div className="flex h-screen w-full place-content-center">
              <Empty />
            </div>
          )}
          {user?.followers?.map((follower) => (
            <NotificationUser
              user={user}
              key={follower.followedByName}
              darkMode={darkMode}
              follower={follower}
              session={session}
            />
          ))}
        </div>
      </div>
    </div>,
    document.getElementById("modal") as Element
  );
};
export default memo(NotificationsModal);
