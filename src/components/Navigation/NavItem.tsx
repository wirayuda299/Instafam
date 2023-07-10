import { useDrawerContext } from "@/stores/Drawer/DrawerStates";
import Link from "next/link";
import type { FC } from "react";

type Lists = {
  id: string;
title: string;
path: string;
icon: JSX.Element;
}


type ListItemProps = {
  path: string;
  pathname: string;
  list: Lists
  drawer: boolean;
  toggler: () => void;
  handleNotificationDrawer: () => void;
  notificationDrawer: boolean;
  openCreateModal: () => void;
};

const NavItem: FC<ListItemProps> = (props) => {
  const {
    path,
    pathname,
    list,
    drawer,
    toggler,
    notificationDrawer,
    handleNotificationDrawer,
    openCreateModal,
  } = props;

  const {drawerDispatch} = useDrawerContext()


  return (
    <li
      role="listitem"
      key={list.id}
      className={` flex h-full w-fit items-center rounded-full text-base font-light transition-colors duration-700 ease-out hover:bg-gray-200 dark:hover:bg-[#b9b9b917] md:w-full md:p-2.5 ${
        list.id === 'search-drawers' || list.id === 'notifications' ? "hidden md:block" : ""
      }  ${pathname === list.path ? "font-semibold" : ""} 
        `}
    >
      {list.id === 'search-drawers' ? (
        <button
          id={list.id}
          role="button"
          type="button"
          name="search"
          className="flex space-x-2"
          onClick={() => drawerDispatch({type:'TOGGLE_SEARCH_DRAWER', payload:{searchDrawer:true}})}
        >
          {list.icon}
          <span
            className={`${
              drawer || notificationDrawer ? "hidden" : "hidden lg:block"
            }`}
          >
            {list.title}
          </span>
        </button>
      ) : list.id === 'create'? (
        <button
          role="button"
          type="button"
          name="create"
          title="Create Post"
          className="flex space-x-2"
          onClick={openCreateModal}
        >
          <div>{list.icon}</div>
          <span
            className={`${
              drawer || notificationDrawer ? "hidden" : "hidden lg:block"
            }`}
          >
            {list.title}
          </span>
        </button>
      ) : list.id === "notifications" ? (
        <button
          role="button"
          type="button"
          name="Notifications"
          title="Notifications"
          className="flex space-x-2"
          onClick={() => handleNotificationDrawer()}
        >
          <div>{list.icon}</div>
          <span
            className={`${
              drawer || notificationDrawer ? "hidden" : "hidden lg:block"
            }`}
          >
            {list.title}
          </span>
        </button>
      ) : (
        <button name={list.title} title={list.title} type="button">
          <Link
            onClick={toggler}
            className="flex cursor-pointer space-x-2"
            href={path}
            title={list.title}
            prefetch={false}
            as={path}
          >
            {list.icon}
            <span
              className={`${
                drawer || notificationDrawer ? "hidden" : "hidden lg:block"
              }`}
            >
              {list.title}
            </span>
          </Link>
        </button>
      )}
    </li>
  );
};
export default NavItem;
