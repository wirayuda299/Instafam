import { useDrawerContext } from "@/stores/Drawer/DrawerStates";
import { useStateContext } from "@/stores/Global/StateContext";
import { useDarkModeStore } from "@/stores/stores";
import { useSession } from "next-auth/react";
import Image from "next/image";
import type { FC } from "react";
import { useStore } from "zustand";

type UsersChatProps = {
  receiver: DataMessage[];
  sender: DataMessage[];
};

const UsersChat: FC<UsersChatProps> = ({ receiver, sender }) => {
  const { darkMode } = useStore(useDarkModeStore);
  const { data: session } = useSession();
  const receiverId = receiver.map((item) => item.id);
  const { Dispatch } = useStateContext();
  const { drawerDispatch } = useDrawerContext();

  if (!session) return null;

  const messagesReceiver = receiver.map((item) => item.message);
  const messagesSender = sender.map((item) => item.message);

  if (messagesReceiver.length === 0 && messagesSender.length === 0) return null;

  const handleClick = (user: DataMessage | null) => {
    user &&
      Dispatch({
        type: "SET_SELECTED_CHAT",
        payload: {
          selectedChat: user,
        },
      });
    drawerDispatch({
      type: "TOGGLE_RECEIVER_DRAWER",
      payload: {
        receiverDrawer: false,
      },
    });
  };

  return (
    <div className="h-screen w-full overflow-y-auto">
      {receiverId.includes(session?.user.uid as string) && (
        <>
          {sender
            .filter((send) => send.id !== session?.user.uid)
            .map((send, i) => (
              <>
                <div
                  key={i}
                  onClick={() => handleClick(send)}
                  className={`ease flex cursor-pointer items-center justify-between border-b-2 border-gray-400 border-opacity-50 transition-all duration-500   ${
                    darkMode
                      ? "from-gray-700 p-3 hover:bg-gradient-to-r"
                      : "from-gray-200 p-3 hover:bg-gradient-to-r "
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Image
                      src={send.image}
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt={send.name}
                    />
                    <h2>{send.name}</h2>
                  </div>
                </div>
              </>
            ))}
        </>
      )}
      {receiver
        .filter((item) => item.id !== session?.user.uid)
        .map((receive, i) => (
          <div
            key={i}
            onClick={() => {
              Dispatch({
                type: "SET_SELECTED_CHAT",
                payload: {
                  selectedChat: receive,
                },
              });
            }}
            className={`ease flex cursor-pointer items-center justify-between border-b-2 border-gray-400 border-opacity-50 transition-all duration-500   ${
              darkMode
                ? "from-gray-700 p-3 hover:bg-gradient-to-r"
                : "from-gray-200 p-3 hover:bg-gradient-to-r "
            } ${receive.id === session?.user.uid ? "hidden" : "block"}`}
          >
            <div className="flex items-center space-x-2">
              <Image
                src={receive.image}
                width={50}
                height={50}
                className="rounded-full"
                alt={receive.name}
              />
              <h2>{receive.name}</h2>
            </div>
          </div>
        ))}
    </div>
  );
};
export default UsersChat;
