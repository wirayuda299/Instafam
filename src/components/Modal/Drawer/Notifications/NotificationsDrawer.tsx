import Empty from "@/components/Notifications/Empty";
import NotificationUser from "@/components/Notifications/NotificationUser";
import { db } from "@/config/firebase";
import useUser from "@/hooks/useUser";
import { useDarkModeStore, useNotificationDrawerStore } from "@/stores/stores";
import { IUser } from "@/types/user";
import { onSnapshot, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useStore } from "zustand";

export default function NotificationsDrawer() {
  const { darkMode } = useStore(useDarkModeStore);
  const { notificationDrawer, setNotificationDrawer } = useStore(useNotificationDrawerStore)
  const { data: session } = useSession()
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
    return () => unsub();
  }, [db, notificationDrawer]);


  useEffect(() => {
    window.addEventListener("resize", () => {
      setNotificationDrawer(false);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setNotificationDrawer(false);
      });
    };
  }, []);


  return (
    <>
      {notificationDrawer ? (
        <section
          className={`fixed z-50 hidden md:block  transition-all duration-300 ease-out ${darkMode ? "bg-black" : "bg-white"
            } ${notificationDrawer
              ? "animate-slideIn lg:animate-slideIn"
              : "animate-slideOut lg:animate-slideOutWidth"
            }`}
        >
          <div className=" h-full w-full ">
            <div className="w-[400px]">
              <h1 className="py-5 text-2xl font-semibold border-b border-gray-400 border-opacity-40 p-5 ">Notifications</h1>
              <div className={`h-screen w-full px-3 py-5 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
                {user?.followers?.length === 0 && <Empty />}
                {user?.followers?.map((follower) => (
                  <NotificationUser
                    user={user}
                    key={follower.followedByName}
                    darkMode={darkMode}
                    follower={follower} session={session} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
