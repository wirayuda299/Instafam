import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useDarkModeStore } from "@/stores/stores";
import { useStore } from "zustand";
import { useRouter } from "next/router";
import { useStateContext } from "@/stores/StateContext";
const ExtraMenus = dynamic(() => import("./ExtraMenus"));
const NavLink = dynamic(() => import("./NavLink"));
const ExtraMenuBtn = dynamic(() => import("./ExtraMenuBtn"));
const NavHeader = dynamic(() => import("../Header/NavHeader"));
import ChatForm from "@/components/Messages/Form/ChatForm";
export default function Sidebar() {
  const { data: session } = useSession();
  const { pathname } = useRouter();
  const {
    state: {
      isExtraListOpen,
      isSearchDrawerOpen,
      notificationDrawer,
      selectedChat,
    },
    Dispatch,
  } = useStateContext();
  const { darkMode } = useStore(useDarkModeStore);

  if (!session) return null;

  const toggler = () => {
    Dispatch({
      type: "SET_RESULT",
      payload: {
        result: [],
      },
    });
    Dispatch({
      type: "TOGGLE_SEARCH_DRAWER",
      payload: {
        searchDrawer: false,
      },
    });
  };

  const handleClick = () => {
    Dispatch({
      type: "TOGGLE_EXTRA_LIST",
      payload: {
        extraList: !isExtraListOpen,
      },
    });
    Dispatch({
      type: "TOGGLE_SEARCH_DRAWER",
      payload: {
        searchDrawer: false,
      },
    });
  };

  const handleNotificationDrawer = () => {
    Dispatch({
      type: "TOGGLE_SEARCH_DRAWER",
      payload: {
        searchDrawer: !isSearchDrawerOpen,
      },
    });
    Dispatch({
      type: "TOGGLE_NOTIFICATION_DRAWER",
      payload: {
        notificationDrawer: !notificationDrawer,
      },
    });
  };

  const handleSearchDrawer = () => {
    Dispatch({
      type: "TOGGLE_SEARCH_DRAWER",
      payload: {
        searchDrawer: !isSearchDrawerOpen,
      },
    });
    Dispatch({
      type: "SET_RESULT",
      payload: {
        result: [],
      },
    });
    Dispatch({
      type: "TOGGLE_NOTIFICATION_DRAWER",
      payload: {
        notificationDrawer: false,
      },
    });
  };

  const openCreateModal = () => {
    Dispatch({
      type: "TOGGLE_POST_CREATE_MODAL",
      payload: {
        postCreateModal: true,
      },
    });
  };

  return (
    <>
      <aside
        className={`
         ease fixed bottom-0 left-0 z-50 flex h-14 w-full items-center transition-width duration-300 md:static md:z-10 md:h-screen md:w-fit md:border-r md:border-opacity-50   ${
           isSearchDrawerOpen || notificationDrawer ? "!w-20" : " lg:w-64 "
         } ${
          darkMode
            ? " border-t border-gray-400 border-opacity-40 bg-black text-white md:border-t-0"
            : "bg-white text-black"
        }`}
      >
        <nav className=" flex w-full flex-col justify-between p-1 md:h-full md:p-3 ">
          <NavHeader />
          <div>
            {pathname === "/messages" && selectedChat ? (
              <div className={"absolute bottom-14 block w-full md:hidden"}>
                <ChatForm selectedChat={selectedChat} session={session} />
              </div>
            ) : null}
            <NavLink
              darkMode={darkMode}
              handleNotificationDrawer={handleNotificationDrawer}
              handleSearchDrawer={handleSearchDrawer}
              notificationDrawer={notificationDrawer}
              session={session}
              drawer={isSearchDrawerOpen}
              handleClick={toggler}
              pathname={pathname}
              openCreateModal={openCreateModal}
            />
            <ExtraMenus />
          </div>
          <ExtraMenuBtn
            notificationdrawer={notificationDrawer}
            drawer={isSearchDrawerOpen}
            extraList={isExtraListOpen}
            handleClick={handleClick}
          />
        </nav>
      </aside>
    </>
  );
}
