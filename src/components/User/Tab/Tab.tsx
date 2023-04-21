import { useDarkModeStore } from "@/stores/stores";
import { useEffect, useRef, useState } from "react";
import { BsGrid3X3Gap, BsBookmark, BsPersonSquare } from "react-icons/bs";
import { useStore } from "zustand";

type ChangeTab = (tabId: number) => void;

type Props = {
  activeTab: number;
  handleTabChange: ChangeTab;
};
export default function Tab({ activeTab, handleTabChange }: Props) {
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
    },
  ];
  const [position, setPosition] = useState<number>(btn1.current?.offsetLeft!);

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
            title={tab.id.toString()}
            onClick={() => handleTabChange(tab.id)}
            className={`tab-${tab.id}`}
          >
            <span>{tab.icon}</span>
          </button>
        ))}
        <span
          className={`ease absolute left-0 top-0 h-0.5 w-16 rounded-full bg-gray-500 transition-all duration-300`}
          style={{
            left: position - 8,
          }}
        ></span>
      </div>
    </div>
  );
}
