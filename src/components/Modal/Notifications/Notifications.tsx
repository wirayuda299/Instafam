import Empty from "@/components/Notifications/Empty";
import NotificationUser from "@/components/Notifications/NotificationUser";
import useUser from "@/hooks/useUser";
import { useDarkModeStore, useNotificationModalStore } from "@/stores/stores";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useStore } from "zustand";

export default function NotificationsModal() {
  const { darkMode } = useStore(useDarkModeStore);
  const { notificationModal, setNotificationModal } = useStore(useNotificationModalStore);
  const { data: session } = useSession()
  const { user } = useUser(session?.user?.uid as string)

  useEffect(() => {
    window.addEventListener("resize", () => {
      setNotificationModal(false);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setNotificationModal(false);
      });
    };
  }, []);

  if (!notificationModal) return null;


  return createPortal(
    <div className={` fixed md:hidden left-0 top-0 z-[99] h-screen w-full select-none  !overflow-y-auto !overflow-x-hidden  shadow-sm lg:hidden  ${notificationModal ? "animate-fadeIn" : "animate-fadeOut hidden"
      } ${darkMode ? "bg-black" : "bg-white"}`}
      aria-modal="true"
      role="dialog"
    >
      <div className="relative w-full h-full">
        <div
          className={`sticky top-0 z-30 flex w-full items-center border-b border-gray-500 border-opacity-50 px-3 py-3 ${darkMode ? "bg-black text-white" : "bg-white text-black"
            }`}
        >
          <div className="flex place-items-center w-full ">
            <button
              type="button"
              name="back"
              title="back"
              className="text-left "
              onClick={() => setNotificationModal(false)}
            >
              <AiOutlineArrowLeft size={25} />
            </button>
            <h1 className="text-center w-full font-semibold">
              Notifications
            </h1>
          </div>
        </div>
        <div>
          <Empty user={user} />
          {user?.followers?.map((follower) => (
            <NotificationUser
              user={user}
              key={follower.followedByName}
              darkMode={darkMode}
              follower={follower} session={session} />
          ))}
        </div>
      </div>

    </div>,
    document.getElementById("modal") as Element
  )
}
