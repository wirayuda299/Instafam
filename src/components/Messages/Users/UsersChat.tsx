import { useStateContext } from "@/stores/StateContext";
import { useDarkModeStore } from "@/stores/stores";
import { DataMessage } from "@/types/DataMessage";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useStore } from "zustand";

type Props = {
  receiver: DataMessage[];
  sender: DataMessage[];
};

export default function UsersChat({ receiver, sender }: Props) {
  const { darkMode } = useStore(useDarkModeStore);
  const { data: session } = useSession();
  const receiverId = receiver.map((item) => item.id);
  const { Dispatch } = useStateContext();

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
    Dispatch({
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
            .map((send) => (
              <>
                <div
                  key={send.id}
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
        .map((receive) => (
          <>
            <div
              key={receive.id}
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
          </>
        ))}
    </div>
  );
}
