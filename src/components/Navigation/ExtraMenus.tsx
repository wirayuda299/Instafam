import { signOut } from "next-auth/react";
import { AiOutlineWarning } from "react-icons/ai";
import { BsFillGearFill, BsMoonFill } from "react-icons/bs";
import { RxCountdownTimer } from "react-icons/rx";
import { useEffect } from "react";
import { useStore } from "zustand";
import { useDarkModeStore, useExtraListStore } from "@/stores/stores";
import { BiSun } from "react-icons/bi";
import Buttons from "../Buttons/Buttons";

export default function ExtraMenus() {
  const { setExtraList, extraList } = useStore(useExtraListStore);
  const { setDarkMode, darkMode } = useStore(useDarkModeStore);

  const extraLists = [
    {
      id: 1,
      icon: (
        <BsFillGearFill
          className={`text-2xl ${darkMode ? "text-white" : "text-black"}`}
        />
      ),
      path: "/settings",
      title: "Settings",
      event: () => {
        console.log("Settings");
      },
    },

    {
      id: 2,
      icon: darkMode ? (
        <BsMoonFill
          className={`animate-rotateOnView text-2xl ${
            darkMode ? "text-white" : "text-black"
          }`}
        />
      ) : (
        <BiSun
          className={`animate-rotateOnView text-2xl ${
            darkMode ? "text-white" : "text-black"
          }`}
        />
      ),
      path: "/switch-appearance",
      title: "Switch Appearance",
      event: () => setDarkMode(!darkMode),
    },
    {
      id: 3,
      icon: (
        <RxCountdownTimer
          className={`text-2xl ${darkMode ? "text-white" : "text-black"}`}
        />
      ),
      path: "/activity",
      title: "Activity",
      event: () => {
        console.log("Activity");
      },
    },
    {
      id: 4,
      icon: (
        <AiOutlineWarning
          className={`text-2xl ${darkMode ? "text-white" : "text-black"}`}
        />
      ),
      path: "/report",
      title: "Report",
      event: () => {
        console.log("Report");
      },
    },
    {
      id: 5,
      icon: "",
      path: "/switch-account",
      title: "Switch Account",
      event: () => {
        console.log("Switch Account");
      },
    },
    {
      id: 6,
      icon: "",
      path: "",
      title: "Log Out",
      event: () => {
        signOut({
          callbackUrl: "/auth/signin",
          redirect: true,
        });
      },
    },
  ];

  useEffect(() => {
    window.addEventListener("resize", () => {
      setExtraList(false);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setExtraList(false);
      });
    };
  }, []);

  return (
    <>
      {extraList ? (
        <div
          className={` relative w-full flex-col justify-center space-y-1 lg:space-y-3  ${
            extraList ? "flex animate-fadeIn" : "hidden animate-fadeOut"
          }`}
        >
          <div
            className={`md:bg-opacity-85  ${
              darkMode ? "!bg-black text-white" : "!bg-white text-black"
            }  -left-0 w-full rounded-md py-4 dark:bg-opacity-95  sm:w-44 md:-top-[330px] md:w-60 lg:-top-[300px]  ${
              extraList ? " absolute  z-[999] block " : "hidden"
            }`}
          >
            <ul className="w-full px-2">
              {extraLists.map((list) => (
                <li
                  key={list.id}
                  className={`ease w-fit truncate rounded-full  border-b  px-5 py-2 transition-all duration-300  hover:bg-[#a8a8a817] dark:border-b-0 dark:hover:bg-[#b9b9b917] md:w-full md:py-3 ${
                    darkMode
                      ? "border-none text-white hover:bg-[#b9b9b917]"
                      : "hover:bg-gray-200"
                  } `}
                  title={list.title}
                  onClick={list.event}
                >
                  <Buttons
                    className="flex w-full items-center justify-between gap-2 space-x-2"
                    type="button"
                    name={list.title}
                    title={list.title}
                  >
                    <span className="text-sm font-semibold md:text-base md:font-medium">
                      {list.title}
                    </span>
                    <span>{list.icon}</span>
                  </Buttons>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
