import { useDarkModeStore } from "@/stores/stores";
import Image from "next/image";
import { useStore } from "zustand";
type Receiver = {
  id: string;
  image: string;
  name: string;
  docId: string;
};

type Props = {
  receiver: Receiver[];
  selectUser: (user: Receiver) => void;
};

export default function UsersChat({ receiver, selectUser }: Props) {
  const { darkMode } = useStore(useDarkModeStore)
  return (
    <div className="h-screen w-full overflow-y-auto">
      {receiver.map((item) => (
        <div
          key={item.id}
          onClick={() => selectUser(item)}
          className={`flex cursor-pointer items-center justify-between border-b-2 border-gray-400 border-opacity-50 transition-all ease duration-500   ${darkMode ? 'from-gray-700 p-3 hover:bg-gradient-to-r' : 'from-gray-200 p-3 hover:bg-gradient-to-r '}`}
        >
          <div className="flex items-center space-x-2">
            <Image
              src={item.image}
              width={50}
              height={50}
              className="rounded-full"
              alt={item.name}
            />
            <h2>{item.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}
