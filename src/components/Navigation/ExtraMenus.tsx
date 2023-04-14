import { extraListToggler } from "@/store/extraListToggler";
import { useSession } from "next-auth/react";
import { AiOutlineWarning } from "react-icons/ai";
import { BsFillGearFill, BsFillMoonStarsFill } from "react-icons/bs";
import { RxCountdownTimer } from "react-icons/rx";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { handleSignOut } from "@/helper/signout";
interface INavProps {
  id: number;
  title: string;
  path: string;
  icon: JSX.Element | string;
}

export default function ExtraMenus() {
  const [extraListOpen, setExtraListOpen] = useRecoilState(extraListToggler);
  const { data: session } = useSession();
  const extraList: INavProps[] = [
    {
      id: 1,
      icon: <BsFillGearFill className="text-2xl text-black dark:text-white" />,
      path: "/settings",
      title: "Settings",
    },

    {
      id: 2,
      icon: (
        <BsFillMoonStarsFill className="text-2xl text-black dark:text-white" />
      ),
      path: "/switch-appearance",
      title: "Switch Appearance",
    },
    {
      id: 3,
      icon: (
        <RxCountdownTimer className="text-2xl text-black dark:text-white" />
      ),
      path: "/activity",
      title: "Activity",
    },
    {
      id: 4,
      icon: (
        <AiOutlineWarning className="text-2xl text-black dark:text-white" />
      ),
      path: "/report",
      title: "Report",
    },
    {
      id: 5,
      icon: "",
      path: "/switch-account",
      title: "Switch Account",
    },
    {
      id: 6,
      icon: "",
      path: "",
      title: "Log Out",
    },
  ];

  useEffect(() => {
    window.addEventListener("resize", () => {
      setExtraListOpen(false);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setExtraListOpen(false);
      });
    };
  }, []);

  return (
    <div
      className={` relative w-full flex-col justify-center space-y-1 lg:space-y-3  ${
        extraListOpen ? "flex animate-fadeIn" : "hidden animate-fadeOut"
      }`}
    >
      <div
        className={`md:bg-opacity-85  -left-0 w-full rounded-md bg-white py-4 dark:bg-black dark:bg-opacity-95 dark:text-white sm:w-44 md:-top-[330px] md:w-60 lg:-top-[300px]  ${
          extraListOpen ? " absolute  z-[999] block " : "hidden"
        }`}
      >
        <ul className="w-full px-2">
          {extraList.map((list) => (
            <li
              key={list.id}
              className="ease w-fit truncate rounded-full border-b  px-5  py-2 transition-all duration-300 hover:bg-[#a8a8a817] hover:bg-gray-200 dark:border-b-0 dark:hover:bg-[#b9b9b917] md:w-full md:py-3"
              title={list.title}
            >
              <button
                onClick={() =>
                  list.id === 6 ? handleSignOut(session) : undefined
                }
                className="flex w-full items-center justify-between gap-2 space-x-2"
                type="button"
                name={list.title}
                title={list.title}
              >
                <span className="text-sm font-semibold md:text-base md:font-medium">
                  {list.title}
                </span>
                <span>{list.icon}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
