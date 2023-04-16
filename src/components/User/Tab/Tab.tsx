import { useEffect, useRef, useState } from "react";
import { BsGrid3X3Gap, BsBookmark, BsPersonSquare } from "react-icons/bs";

type ChangeTab = (tabId: number) => void;

type Props = {
  activeTab: number;
  handleTabChange: ChangeTab;
};
export default function Tab({ activeTab, handleTabChange }: Props) {
  const btn1 = useRef<HTMLButtonElement>(null);
  const btn2 = useRef<HTMLButtonElement>(null);
  const btn3 = useRef<HTMLButtonElement>(null);
  const tabValue = [
    {
      id: 1,
      icon: <BsGrid3X3Gap size={25} className="text-black dark:text-white" />,
      ref: btn1,
    },
    {
      id: 2,
      icon: <BsBookmark size={25} className="text-black dark:text-white" />,
      ref: btn2,
    },
    {
      id: 3,
      icon: <BsPersonSquare size={25} className="text-black dark:text-white" />,
      ref: btn3,
    },
  ];
  const [position, setPosition] = useState<number>(btn1.current?.offsetLeft!);

  useEffect(() => {
    switch (activeTab) {
      case 1:
        setPosition(btn1.current?.offsetLeft!);
        break;
      case 2:
        setPosition(btn2.current?.offsetLeft!);
        break;
      case 3:
        setPosition(btn3.current?.offsetLeft!);
        break;
      default:
        setPosition(btn1.current?.offsetLeft!);

    }
  }, [activeTab])



  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex w-full items-center justify-around gap-x-5 py-3 pb-5 relative" role=" tablist
      ">
        {tabValue.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            name="tab"
            ref={tab.ref}
            role="tab"
            title={tab.id.toString()}
            onClick={() => {
              handleTabChange(tab.id)
            }}
            className={`tab-${tab.id}`}

          >
            <span>{tab.icon}</span>
          </button>
        ))}
        <span
          className={`absolute top-0 w-10 h-0.5 left-0 rounded-full bg-white transition-all ease duration-300`}
          style={{
            left: position - 8
          }}
        ></span>
      </div>
    </div>
  );
}
