import { useDarkModeStore } from "@/stores/stores";
import { ActionsTypeUsersPage } from "@/types/ActionsTypes";
import { handleTabClick } from "@/utils/handleTabChanges";
import {
  type FC,
  useEffect,
  useRef,
  useState,
  TransitionStartFunction,
  Dispatch,
  SetStateAction,
} from "react";
import { BsGrid3X3Gap, BsBookmark, BsPersonSquare } from "react-icons/bs";
import { useStore } from "zustand";

type Props = {
  activeTab: number;
  startTransition: TransitionStartFunction;
  dispatch: Dispatch<ActionsTypeUsersPage>;
  setActiveTab: Dispatch<SetStateAction<number>>;
};
const Tab: FC<Props> = ({
  activeTab,
  dispatch,
  setActiveTab,
  startTransition,
}) => {
  const btn1 = useRef<HTMLButtonElement>(null);
  const btn2 = useRef<HTMLButtonElement>(null);
  const btn3 = useRef<HTMLButtonElement>(null);
  const { darkMode } = useStore(useDarkModeStore);

  const tabValue = [
    {
      id: 1,
      icon: (
        <BsGrid3X3Gap
          size={25}
          className={`${darkMode ? "text-white" : "text-black"}`}
        />
      ),
      ref: btn1,
      title: "Posts",
    },
    {
      id: 2,
      icon: (
        <BsBookmark
          size={25}
          className={`${darkMode ? "text-white" : "text-black"}`}
        />
      ),
      ref: btn2,
      title: "Saved Posts",
    },
    {
      id: 3,
      icon: (
        <BsPersonSquare
          size={25}
          className={`${darkMode ? "text-white" : "text-black"}`}
        />
      ),
      ref: btn3,
      title: "Tagged Posts",
    },
  ];
  const [position, setPosition] = useState<number>(
    btn1.current?.offsetLeft! - 13
  );

  useEffect(() => {
    switch (activeTab) {
      case 1:
        setPosition(btn1.current?.offsetLeft! - 13);
        break;
      case 2:
        setPosition(btn2.current?.offsetLeft! - 13);
        break;
      case 3:
        setPosition(btn3.current?.offsetLeft! - 13);
        break;
      default:
        setPosition(btn1.current?.offsetLeft! - 13);
    }
  }, [activeTab]);

  return (
    <div className="mx-auto max-w-2xl">
      <div
        className="relative flex w-full items-center justify-around gap-x-5 py-3 pb-5"
        role="tablist"
      >
        {tabValue.map((tab) => (
          <button
            key={tab.id}
            type="button"
            name="tab"
            ref={tab.ref}
            role="tab"
            title={tab.title}
            onClick={() =>
              handleTabClick({
                dispatch,
                setActiveTab,
                startTransition,
                tabId: tab.id,
              })
            }
            className={`tab-${tab.id}`}
          >
            <span>{tab.icon}</span>
          </button>
        ))}
        <span
          className={`ease absolute left-0 top-0 h-0.5 w-16 rounded-full bg-gray-500 transition-all duration-300`}
          style={{
            left: position - 7,
          }}
        ></span>
      </div>
    </div>
  );
};
export default Tab;
