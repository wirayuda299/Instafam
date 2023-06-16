import { AiOutlineWarning } from "react-icons/ai";
import { BsMoonFill } from "react-icons/bs";
import { BiSun } from "react-icons/bi";
import { useStore } from "zustand";
import { useDarkModeStore } from "@/stores/stores";
import { useModalContext } from "@/stores/Modal/ModalStatesContext";
import { useDrawerContext } from "@/stores/Drawer/DrawerStates";

const ExtraMenus = () => {
  const {
    drawerStates: { isExtraListOpen },
  } = useDrawerContext();
  const { modalDispatch } = useModalContext();
  const { darkMode, setDarkMode } = useStore(useDarkModeStore);

  const changeTheme = () => {
    localStorage.setItem("theme", darkMode ? "light" : "dark");
    setDarkMode(!darkMode);
  };

  if (!isExtraListOpen) return null;
  const ExtraMenusLists = [
    {
      id: 1,
      icon: darkMode ? <BiSun /> : <BsMoonFill />,
      path: "/switch-appearance",
      title: "Switch Appearance",
      event: () => changeTheme(),
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
  return (
    <>
      <div
        className={` relative w-full flex-col justify-center space-y-1 lg:space-y-3  ${
          isExtraListOpen ? "flex animate-fadeIn" : "hidden animate-fadeOut"
        }`}
      >
        <div
          className={`md:bg-opacity-85  ${
            darkMode ? "bg-black text-white" : "!bg-white text-black"
          }  -left-0 w-full rounded-md py-4 dark:bg-opacity-95  sm:w-44 md:-top-[120px] md:w-60 lg:-top-[140px]  ${
            isExtraListOpen ? " absolute  z-[999] block " : "hidden"
          }`}
        >
          <ul className="w-full px-2">
            {ExtraMenusLists.map((list) => (
              <li
                key={list.id}
                className={`ease w-fit truncate rounded-full  border-b  px-5 py-2 transition-all duration-300   dark:border-b-0  md:w-full md:py-3 ${
                  darkMode
                    ? "border-none text-white hover:bg-[#b9b9b917]"
                    : "hover:bg-gray-200"
                } ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
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
                  <span
                    className={`text-2xl ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {list.icon}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ExtraMenus;
