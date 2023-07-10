import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useStateContext } from "@/stores/Global/StateContext";
import { useModalContext } from "@/stores/Modal/ModalStatesContext";
import { useDrawerContext } from "@/stores/Drawer/DrawerStates";
const ExtraMenus = dynamic(() => import("./ExtraMenus"));
const NavLink = dynamic(() => import("./NavLink"));
const ExtraMenuBtn = dynamic(() => import("./ExtraMenuBtn"));
const NavHeader = dynamic(() => import("../Header/NavHeader"));
const ChatForm = dynamic(() => import("@/components/Messages/Form/ChatForm"));

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const { pathname } = useRouter();
  const { state: { selectedChat }, Dispatch} = useStateContext();
  const { drawerStates: { isSearchDrawerOpen, notificationDrawer }, drawerDispatch } = useDrawerContext();
  
  const { modalDispatch } = useModalContext();  

    useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click",handleClickOutside);
      };
  }, []);

  function handleClickOutside(e: MouseEvent) {
    e.stopPropagation()

    if(!e.target) return 
    // @ts-ignore
    const isExtraLists = e.target.id === "extraLists";

    if (!isExtraLists) return setIsOpen(false);

  }
  if (!session) return null;

  const toggler = () => {
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
  };

  const handleNotificationDrawer = () => {
    drawerDispatch({
      type: "TOGGLE_SEARCH_DRAWER",
      payload: {
        searchDrawer: false,
      },
    });
    drawerDispatch({
      type: "TOGGLE_NOTIFICATION_DRAWER",
      payload: {
        notificationDrawer: !notificationDrawer,
      },
    });
  };

  const handleSearchDrawer = () => {
    drawerDispatch({
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
    drawerDispatch({
      type: "TOGGLE_NOTIFICATION_DRAWER",
      payload: {
        notificationDrawer: false,
      },
    });
  };

  const openCreateModal = () => {
    modalDispatch({
      type: "TOGGLE_POST_CREATE_MODAL",
      payload: {
        postCreateModal: true,
      },
    });
  };

  return (
      <aside
        className={`
         ease fixed bottom-0 left-0 z-50 flex h-14 w-full items-center bg-white text-black transition-width duration-300 dark:border-t dark:border-gray-400 dark:border-opacity-40 dark:bg-black dark:text-white md:static md:z-10 md:h-screen md:w-fit md:border-r md:border-opacity-50 dark:md:border-t-0   ${
           isSearchDrawerOpen || notificationDrawer ? "!w-20" : " lg:w-64 "
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
              handleNotificationDrawer={handleNotificationDrawer}
              handleSearchDrawer={handleSearchDrawer}
              notificationDrawer={notificationDrawer}
              session={session}
              drawer={isSearchDrawerOpen}
              handleClick={toggler}
              pathname={pathname}
              openCreateModal={openCreateModal}
            />
            <ExtraMenus isOpen={isOpen} />
          </div>
          <ExtraMenuBtn
            setIsOpen={setIsOpen}
            notificationdrawer={notificationDrawer}
            drawer={isSearchDrawerOpen}
            extraList={isOpen}
          />
        </nav>
      </aside>
  );
};
export default Sidebar;
