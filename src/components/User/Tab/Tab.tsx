import { BsGrid3X3Gap, BsBookmark, BsPersonSquare } from "react-icons/bs";

type ChangeTab = (tabId: number) => void;

type Props = {
  activeTab: number;
  handleTabChange: ChangeTab;
};
export default function Tab({ activeTab, handleTabChange }: Props) {
  const tabValue = [
    {
      id: 1,
      icon: <BsGrid3X3Gap size={25} className="text-black dark:text-white" />,
    },
    {
      id: 2,
      icon: <BsBookmark size={25} className="text-black dark:text-white" />,
    },
    {
      id: 3,
      icon: <BsPersonSquare size={25} className="text-black dark:text-white" />,
    },
  ];

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex w-full items-center justify-around gap-x-5 py-3 pb-5">
        {tabValue.map((tab) => (
          <button
            key={tab.id}
            type="button"
            name="tab"
            title={tab.id.toString()}
            className={`${
              activeTab === tab.id
                ? "border-b-2 border-gray-500 border-opacity-50"
                : ""
            }`}
            onClick={() => handleTabChange(tab.id)}
          >
            <span>{tab.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
