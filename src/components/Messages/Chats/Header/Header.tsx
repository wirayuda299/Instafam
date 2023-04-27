import { useDarkModeStore } from "@/stores/stores";
import Image from "next/image"
import { useStore } from "zustand";
type Receiver = {
  id: string;
  image: string;
  name: string;
  docId: string;
};
type Props = {
  selectedChat: Receiver | null
}
export default function ChatHeader({ selectedChat }: Props) {
  const { darkMode } = useStore(useDarkModeStore)
  return (
    <header className={`absolute hidden md:flex left-0 top-0 w-full items-center justify-between border-b-2 border-gray-400 border-opacity-50 p-4 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="flex items-center space-x-2">
        <Image
          src={selectedChat?.image as string}
          width={40}
          height={40}
          className="rounded-full"
          alt={selectedChat?.name ?? "user"}
        />
        <h2>{selectedChat?.name}</h2>
      </div>
    </header>
  )
}
