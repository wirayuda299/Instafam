import { tabPosts, tabSavedPosts, tabTaggedPosts } from "@/store/TabToggler";
import { useState, useTransition } from "react";
import { BsGrid3X3Gap, BsBookmark, BsPersonSquare } from "react-icons/bs";
import { useRecoilState } from "recoil";

export default function Tab() {
  const [posts, setPosts] = useRecoilState(tabPosts);
  const [savedPosts, setSavedPosts] = useRecoilState(tabSavedPosts);
  const [taggedPosts, setTaggedPosts] = useRecoilState(tabTaggedPosts);
  const [activeTab, setActiveTab] = useState(1);
  const [isPending, startTransition] = useTransition();

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
  const handleTabClick = (tabId: number) => {
    startTransition(() => {
      setActiveTab(tabId);
    });
    switch (tabId) {
      case 1:
        setPosts(true);
        setSavedPosts(false);
        setTaggedPosts(false);
        break;
      case 2:
        setPosts(false);
        setSavedPosts(true);
        setTaggedPosts(false);
        break;
      case 3:
        setPosts(false);
        setSavedPosts(false);
        setTaggedPosts(true);
        break;
      default:
        break;
    }
  };

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
                ? "border-b-2 border-black pb-1 dark:border-white"
                : ""
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            <span>{tab.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
