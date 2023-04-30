import { useDarkModeStore } from "@/stores/stores";
import { RiNotificationOffLine } from "react-icons/ri";
import { useStore } from "zustand";

export default function Empty() {
  const { darkMode } = useStore(useDarkModeStore);
  return (
    <>
      <div className={`flex flex-col items-center justify-center h-full ${darkMode ? 'text-white' : 'text-black'}`}>
        <RiNotificationOffLine size={50} />
        <h1 className="text-xl font-semibold mt-3 text-gray-500">No notifications</h1>
      </div>
    </>
  )
}
