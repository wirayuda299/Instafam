import Link from "next/link";
import { IUser } from "@/types/user";

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
  setDrawer: (value: boolean) => void;
  darkMode: boolean;
  toggler: () => void;
  setResult: (value: IUser[]) => void;
  setPostCreateModal: (value: boolean) => void;
};

export default function NavItem(props: ListItemProps) {
  const {
    path,
    pathname,
    list,
    darkMode,
    drawer,
    setDrawer,
    toggler,
    setResult,
    setPostCreateModal,
  } = props;

  return (
    <li
      role="listitem"
      key={list.id}
      className={` flex items-center md:p-2.5  h-full w-fit rounded-full text-base font-light transition-colors duration-700 ease-out md:w-full  ${
        list.id === 2 || list.id === 5 ? "hidden md:block" : ""
      }  ${pathname === list.path ? "font-semibold" : ""} ${
        darkMode ? "md:hover:bg-[#b9b9b917]" : "md:hover:bg-gray-200 "
      }`}
    >
      {list.id === 2 ? (
        <button
          role="button"
          type="button"
          name="search"
          className="flex space-x-2"
          onClick={() => {
            setDrawer(!drawer);
            setResult([]);
          }}
        >
          {list.icon}
          <span className={`${drawer ? "hidden" : "hidden lg:block"}`}>
            {list.title}
          </span>
        </button>
      ) : list.id === 6 ? (
        <button
          role="button"
          type="button"
          name="search"
          className="flex space-x-2"
          onClick={() => setPostCreateModal(true)}
        >
          <div>{list.icon}</div>
          <span className={`${drawer ? "hidden" : "hidden lg:block"}`}>
            {list.title}
          </span>
        </button>
      ) : (
        <button
          name={list.title}
          title={list.title}
          type="button"
        >
          <Link
            onClick={toggler}
            className="flex cursor-pointer space-x-2"
            role="link"
            as={path}
            shallow
            href={path}
            title={list.title}
          >
            {list.icon}
            <span className={`${drawer ? "hidden" : "hidden lg:block"}`}>
              {list.title}
            </span>
          </Link>
        </button>
      )}
    </li>
  );
}
