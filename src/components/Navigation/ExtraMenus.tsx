import { AiOutlineWarning } from "react-icons/ai";
import { BsMoonFill } from "react-icons/bs";
import { BiSun } from "react-icons/bi";
import { FC, useEffect, useState } from "react";

import { useModalContext } from "@/stores/Modal/ModalStatesContext";

type ExtraMenuProps = {
  isOpen: boolean;
};

const ExtraMenus: FC<ExtraMenuProps> = ({ isOpen }) => {
  const { modalDispatch } = useModalContext();
  const [theme, setTheme] = useState<string | null>("");
    useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const selectedTheme =
      theme || localStorage.theme || (prefersDarkMode ? "dark" : "light");

    document.documentElement.classList.toggle("dark", selectedTheme === "dark");
    localStorage.theme = selectedTheme;
  }, [theme]);
  const ExtraMenusLists = [
    {
      id: 1,
      icon: theme === "dark" ? <BiSun /> : <BsMoonFill />,
      path: "/switch-appearance",
      title: "Switch Appearance",
      event: () => setTheme(theme === "dark" ? "light" : "dark"),
    },

    {
      id: 2,
      icon: <AiOutlineWarning />,
      path: "/report",
      title: "Report",
      event: () =>
        modalDispatch({
          type: "SHOW_REPORT_MODAL",
          payload: {
            showReportModal: true,
          },
        }),
    },

    {
      id: 3,
      icon: "",
      path: "",
      title: "Log Out",
      event: async () => {
        const { signOut } = await import("next-auth/react");
        await signOut({
          callbackUrl: "/auth/signin",
          redirect: true,
        });
      },
    },
  ];

  if (!isOpen) return null;

  return (
      <div
        className={`relative w-full flex-col justify-center space-y-1 bg-white dark:bg-black lg:space-y-3  ${
          isOpen ? "flex animate-fadeIn" : "hidden animate-fadeOut"
        }`}
      >
        <div
          className={`md:bg-opacity-85 -left-0 w-full rounded-md bg-white py-4 text-black dark:bg-black dark:bg-opacity-95 dark:text-white  sm:w-44 md:-top-[120px] md:w-60 lg:-top-[140px]  ${
            isOpen ? " absolute  z-[999] block " : "hidden"
          }`}
        >
          <ul className="w-full px-2" id="extraLists">
            {ExtraMenusLists.map((list) => (
              <li
                key={list.id}
                className="ease w-fit truncate rounded-full  border-b  bg-white px-5 py-2 text-black  transition-all duration-300 hover:bg-gray-200 dark:border-b-0 dark:border-none  dark:bg-black dark:text-white  dark:hover:bg-[#b9b9b917] md:w-full md:py-3"
                title={list.title}
                onClick={list.event}
              >
                <button
                  className="flex w-full items-center justify-between gap-2 space-x-2"
                  type="button"
                  name={list.title}
                  title={list.title}
                >
                  <span className="text-sm font-semibold md:text-base md:font-medium">
                    {list.title}
                  </span>
                  <span className="text-2xl text-black dark:text-white ">
                    {list.icon}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
};

export default ExtraMenus;
