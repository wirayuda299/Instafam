import { useDrawerStore, useResultStore } from "@/stores/stores";
import Link from "next/link";
import { useStore } from "zustand";

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
};

export default function ListItem({
  list,
  path,
  pathname,
  session,
}: ListItemProps) {
  const { drawer, setDrawer } = useStore(useDrawerStore)
  const {  setResult } = useStore(useResultStore);

  const toggler = () => {
    setResult([]);
    setDrawer(false);
  };
  return (
    <li
      role="listitem"
      key={list.id}
      className={` w-fit rounded-full p-2 text-base font-light  hover:bg-[#a8a8a817] hover:bg-gray-200 dark:hover:bg-[#b9b9b917] md:w-full md:p-3 ${list.id === 2 || list.id === 5 ? "hidden md:block" : ""
        } ${list.id === 8 ? "hidden md:block" : ""} ${pathname === list.path ? "font-semibold" : ""
        }`}
    >
      {list.id === 2 ? (
        <button
          role="button"
          type="button"
          name="search"
          title="search"
          disabled={session ? false : true}
          className="flex cursor-pointer space-x-2"
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
      ) : (
        <Link
          onClick={toggler}
          title={list.title}
          role="link"
          shallow
          href={path}
        >
          <button
            disabled={session ? false : true}
            title={list.title}
            className="flex space-x-2"
            name={list.title}
            type="button"
          >
            {list.icon}
            <span className={`${drawer ? "hidden" : "hidden lg:block"}`}>
              {list.title}
            </span>
          </button>
        </Link>
      )}
    </li>
  );
}
