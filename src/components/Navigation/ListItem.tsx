import Link from "next/link";
import Buttons from "../Buttons/Buttons";
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
  session: any;
  drawer: boolean;
  setDrawer: (value: boolean) => void;
  darkMode: boolean;
  toggler: () => void;
  setResult: (value: IUser[]) => void;
  setPostCreateModal: (value: boolean) => void;
};

export default function ListItem(props: ListItemProps) {
  const {
    path,
    pathname,
    list,
    session,
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
      className={` h-full w-fit rounded-full p-2 text-base font-light transition-colors duration-700 ease-out md:w-full md:p-3  ${
        list.id === 2 || list.id === 5 ? "hidden md:block" : ""
      }  ${pathname === list.path ? "font-semibold" : ""} ${
        darkMode ? "md:hover:bg-[#b9b9b917]" : "md:hover:bg-gray-200 "
      }`}
    >
      {list.id === 2 ? (
        <Buttons
          role="button"
          type="button"
          name="search"
          className="flex space-x-2"
          disabled={session ? false : true}
          onClick={() => {
            setDrawer(!drawer);
            setResult([]);
          }}
        >
          {list.icon}
          <span className={`${drawer ? "hidden" : "hidden lg:block"}`}>
            {list.title}
          </span>
        </Buttons>
      ) : list.id === 6 ? (
        <Buttons
          role="button"
          type="button"
          name="search"
          className="flex space-x-2"
          disabled={session ? false : true}
          onClick={() => setPostCreateModal(true)}
        >
          {list.icon}
          <span className={`${drawer ? "hidden" : "hidden lg:block"}`}>
            {list.title}
          </span>
        </Buttons>
      ) : (
        <Buttons
          disabled={session ? false : true}
          name={list.title}
          title={list.title}
          type="button"
        >
          <Link
            onClick={toggler}
            className="flex cursor-pointer space-x-2"
            role="link"
            shallow
            href={path}
            title={list.title}
          >
            {list.icon}
            <span className={`${drawer ? "hidden" : "hidden lg:block"}`}>
              {list.title}
            </span>
          </Link>
        </Buttons>
      )}
    </li>
  );
}
