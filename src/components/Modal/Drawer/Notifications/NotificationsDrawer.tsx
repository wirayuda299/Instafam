import { db } from "@/config/firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { useDrawerContext } from "@/stores/Drawer/DrawerStates";
import useClickOutSide from "@/hooks/useClickoutside";
const Empty = dynamic(() => import("@/components/Notifications/Empty"), {
  ssr: false,
});
const NotificationUser = dynamic(
  () => import("@/components/Notifications/NotificationUser"),
  {
    ssr: false,
  }
);

const NotificationsDrawer = () => {
  const {
    drawerStates: { notificationDrawer }, drawerDispatch
  } = useDrawerContext();
  const { data: session } = useSession();
  const [user, setUser] = useState<IUser | null>(null);
  const notif = useRef(null)

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

  useClickOutSide(notif, () => drawerDispatch({
    type:'TOGGLE_NOTIFICATION_DRAWER',
    payload: {
      notificationDrawer:false,
    },
  }))

  if (!notificationDrawer) return null;

  return (
    <section
      className={`ease fixed z-[1] hidden bg-white transition-all  duration-150 dark:bg-black md:block ${
        notificationDrawer
          ? "animate-slideIn lg:animate-slideIn"
          : "animate-slideOut lg:animate-slideOutWidth hidden"
      }`}
    >
      <div className=" h-full w-full" id="notif"
      ref={notif}>
        <div className="w-[400px]">
          <h1 className="border-b border-gray-400 border-opacity-40 p-5 py-5 text-2xl font-semibold ">
            Notifications
          </h1>
          <div className="h-screen w-full bg-white px-3 py-5 text-black dark:bg-black dark:text-white">
            {user?.followers?.length === 0 && <Empty />}
            {user?.followers?.map((follower) => (
              <NotificationUser
                user={user}
                key={follower.followedByName}
                follower={follower}
                session={session}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default NotificationsDrawer;
