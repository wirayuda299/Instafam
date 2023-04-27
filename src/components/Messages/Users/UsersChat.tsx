import { Chats } from "@/pages/messages";
import { useDarkModeStore } from "@/stores/stores";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useStore } from "zustand";
type Receiver = {
  id: string;
  image: string;
  name: string;
  docId: string;
  message: Chats[]
};

type Props = {
  receiver: Receiver[];
  selectUser: (user: Receiver) => void;
  sender: Receiver[]
  setUserReceiverDrawer: (userReceiverDrawer: boolean) => void
};

export default function UsersChat({ receiver, selectUser, sender, setUserReceiverDrawer }: Props) {
  const { darkMode } = useStore(useDarkModeStore)
  const { data: session } = useSession()
  const receiverId = receiver.map((item) => item.id);
  if (!session) return null
  const messagesReceiver = receiver.map((item) => item.message);
  const messagesSender = sender.map((item) => item.message);
  if (messagesReceiver.length === 0 && messagesSender.length === 0) return null

  const handleClick = (user:Receiver | null) => {
    if(user) {
      selectUser(user)
      setUserReceiverDrawer(false)
    }
  }
  

  return (
    <div className="h-screen w-full overflow-y-auto">
      {receiverId.includes(session?.user.uid as string) && (
        <>
          {sender.map(send => (
            <>
              <div
                key={send.id}
                onClick={() => handleClick(send)}
                className={`flex cursor-pointer items-center justify-between border-b-2 border-gray-400 border-opacity-50 transition-all ease duration-500   ${darkMode ? 'from-gray-700 p-3 hover:bg-gradient-to-r' : 'from-gray-200 p-3 hover:bg-gradient-to-r '}`}
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
      <>
        {receiver.map((item) => (
          <div
            key={item.id}
            onClick={() => selectUser(item)}
            className={`flex cursor-pointer items-center justify-between border-b-2 border-gray-400 border-opacity-50 transition-all ease duration-500   ${darkMode ? 'from-gray-700 p-3 hover:bg-gradient-to-r' : 'from-gray-200 p-3 hover:bg-gradient-to-r '} ${item.id === session?.user.uid ? 'hidden' : 'block'}`}
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
      </>
    </div>
  );
}
