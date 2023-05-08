import { db } from "@/config/firebase";
import { useStateContext } from "@/stores/StateContext";
import { useDarkModeStore } from "@/stores/stores";
import { IUser } from "@/types/user";
import { onSnapshot, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { type FC, useEffect, useState } from "react";
import { useStore } from "zustand";
const Empty = dynamic(() => import("@/components/Notifications/Empty"), {
  ssr: false,
});

const NotificationUser = dynamic(
  () => import("@/components/Notifications/NotificationUser"),
  {
    ssr: false,
  }
);

const NotificationsDrawer:FC = () => {
  const { darkMode } = useStore(useDarkModeStore);
  const {
    state: { notificationDrawer },
  } = useStateContext();
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
  }, [db, notificationDrawer]);

  return (
    <>
      {notificationDrawer ? (
        <section
          className={`fixed z-50 hidden transition-all  duration-300 ease-out md:block ${
            darkMode ? "bg-black" : "bg-white"
          } ${
            notificationDrawer
              ? "animate-slideIn lg:animate-slideIn"
              : "animate-slideOut lg:animate-slideOutWidth"
          }`}
        >
          <div className=" h-full w-full ">
            <div className="w-[400px]">
              <h1 className="border-b border-gray-400 border-opacity-40 p-5 py-5 text-2xl font-semibold ">
                Notifications
              </h1>
              <div
                className={`h-screen w-full px-3 py-5 ${
                  darkMode ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                {user?.followers?.length === 0 && <Empty />}
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
          </div>
        </section>
      ) : null}
    </>
  );
}
export default  NotificationsDrawer