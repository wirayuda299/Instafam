import Image from "next/image";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import type { FC } from "react";
import { useDrawerContext } from "@/stores/Drawer/DrawerStates";

const ChatHeader: FC<{ selectedChat: DataMessage | null }> = ({
  selectedChat,
}) => {
  const {
    drawerStates: { receiverDrawer },
    drawerDispatch,
  } = useDrawerContext();

  return (
    <header className="sticky top-0 flex w-full items-center justify-between border-b-2 border-gray-400 border-opacity-50 bg-white p-4 pt-5 text-black dark:bg-black dark:text-white lg:hidden ">
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
        className="lg:hidden"
        name="back"
        title="back"
        onClick={() => {
          drawerDispatch({
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
};
export default ChatHeader;
