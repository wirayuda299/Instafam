import { useDarkModeStore } from "@/stores/stores";
import { DataMessage } from "@/types/DataMessage";
import Image from "next/image";
import { useStore } from "zustand";

type Props = {
  selectedChat: DataMessage | null;
};
export default function ChatHeader({ selectedChat }: Props) {
  const { darkMode } = useStore(useDarkModeStore);
  return (
    <header
      className={`absolute left-0 pt-5 top-0 hidden w-full items-center justify-between border-b-2 border-gray-400 border-opacity-50 p-4 md:flex ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center space-x-2">
        <Image
          src={selectedChat?.image as string}
          width={40}
          priority
          height={40}
          className="rounded-full"
          alt={selectedChat?.name ?? "user"}
        />
        <h2>{selectedChat?.name}</h2>
      </div>
    </header>
  );
}
