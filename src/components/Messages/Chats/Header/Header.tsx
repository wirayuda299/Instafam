import { useDarkModeStore } from "@/stores/stores";
import { DataMessage } from "@/types/DataMessage";
import Image from "next/image";
import { useStore } from "zustand";
import { useStateContext } from "@/stores/StateContext";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

type Props = {
  selectedChat: DataMessage | null;
};
export default function ChatHeader({ selectedChat }: Props) {
  const { darkMode } = useStore(useDarkModeStore);
  const {
    state: { receiverDrawer },
    Dispatch,
  } = useStateContext();
  return (
    <header
      className={`sticky top-0 flex w-full items-center justify-between border-b-2 border-gray-400 border-opacity-50 p-4 pt-5 lg:hidden ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center space-x-2">
        {selectedChat ? (
          <>
            <Image
              src={selectedChat?.image as string}
              width={40}
              priority
              height={40}
              className="rounded-full"
              alt={selectedChat?.name ?? "user"}
            />
            <h2>{selectedChat?.name}</h2>
          </>
        ) : null}
      </div>
      <button
        className={"lg:hidden"}
        name={"back"}
        title={"back"}
        onClick={() => {
          Dispatch({
            type: "TOGGLE_RECEIVER_DRAWER",
            payload: {
              receiverDrawer: !receiverDrawer,
            },
          });
        }}
      >
        {receiverDrawer ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>
    </header>
  );
}
