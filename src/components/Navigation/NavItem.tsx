import Link from "next/link";
import type { FC } from "react";
type ListItemProps = {
  path: string;
  pathname: string;
  list: {
    id: number;
    title: string;
    path: string;
    icon: JSX.Element;
  };
  drawer: boolean;
  toggler: () => void;
  handleSearchDrawer: () => void;
  handleNotificationDrawer: () => void;
  notificationDrawer: boolean;
  openCreateModal: () => void;
  darkMode: boolean;
};

const NavItem:FC<ListItemProps> =(props) => {
  const {
    path,
    pathname,
    list,
    drawer,
    toggler,
    handleSearchDrawer,
    darkMode,
    notificationDrawer,
    handleNotificationDrawer,
    openCreateModal,
  } = props;

  return (
    <li
      role="listitem"
      key={list.id}
      className={` flex h-full w-fit items-center rounded-full text-base font-light transition-colors duration-700 ease-out md:w-full md:p-2.5  ${
        list.id === 2 || list.id === 5 ? "hidden md:block" : ""
      }  ${pathname === list.path ? "font-semibold" : ""} 
        } ${darkMode ? "hover:bg-[#b9b9b917]" : "hover:bg-gray-200"}`}
    >
      {list.id === 2 ? (
        <button
          role="button"
          type="button"
          name="search"
          className="flex space-x-2"
          onClick={() => handleSearchDrawer()}
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
      ) : list.id === 6 ? (
        <button
          role="button"
          type="button"
          name="search"
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
      ) : list.id === 5 ? (
        <button
          role="button"
          type="button"
          name="Notifications"
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
}
export default NavItem
