import { useDarkModeStore } from "@/stores/stores";
import type { FC } from "react";
import { RiNotificationOffLine } from "react-icons/ri";
import { useStore } from "zustand";

const Empty: FC = () => {
  const { darkMode } = useStore(useDarkModeStore);
  return (
    <>
      <div
        className={`flex h-full flex-col items-center justify-center ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        <RiNotificationOffLine size={50} />
        <h1 className="mt-3 text-xl font-semibold text-gray-500">
          No notifications
        </h1>
      </div>
    </>
  );
};
export default Empty;
