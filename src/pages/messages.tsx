import {
  useDarkModeStore,
  useMessageModalStore,
  useUserReceiverDrawerStore,
} from "@/stores/stores";
import { useState } from "react";
import { useStore } from "zustand";
import dynamic from "next/dynamic";
import type { Session } from "next-auth";
import { getServerSession } from "next-auth";
import type { GetServerSidePropsContext } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { DataMessage } from "@/types/DataMessage";

const UsersChat = dynamic(
  () => import("@/components/Messages/Users/UsersChat"),
  {
    ssr: false,
  }
);
const UserHeader = dynamic(
  () => import("@/components/Messages/Users/Header/UserHeader"),
  {
    ssr: false,
  }
);
const Chats = dynamic(() => import("@/components/Messages/Chats/Chats"), {
  ssr: false,
});
const ChatHeader = dynamic(
  () => import("@/components/Messages/Chats/Header/Header"),
  {
    ssr: false,
  }
);

const EmptyMessages = dynamic(
  () => import("@/components/Messages/EmptyMessages/EmptyMessages"),
  {
    ssr: false,
  }
);

type Props = {
  sessions: Session | null;
  sender: DataMessage[]
  receiver: DataMessage[];
}

export default function Messages({ sessions, receiver, sender }: Props) {
  const { setMessageModal } = useStore(useMessageModalStore);
  const [selectedChat, setSelectedChat] = useState<DataMessage | null>(null);

  const { userReceiverDrawer, setUserReceiverDrawer } = useStore(useUserReceiverDrawerStore);
  const { darkMode } = useStore(useDarkModeStore);
  const selectUser = (user: DataMessage) => {
    setSelectedChat(user);
  };

  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="mx-auto flex h-screen items-center justify-between overflow-hidden">
        {receiver.length === 0 ? (
          <EmptyMessages />
        ) : (
          <>
            <aside
              className={`ease fixed top-0 z-50 h-full w-full max-w-sm border-r border-gray-400 border-opacity-50 transition-all  duration-300 lg:static lg:z-0 ${userReceiverDrawer ? "left-0" : "-left-full"
                } ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
            >
              <UserHeader setMessageModal={setMessageModal} />
              <UsersChat
                receiver={receiver}
                selectUser={selectUser}
                sender={sender}
                setUserReceiverDrawer={setUserReceiverDrawer}
              />
            </aside>
            <div
              className={`h-full w-full  ${selectedChat === null ? "hidden" : "block"
                }`}
            >
              <div className="relative h-full w-full">
                <ChatHeader selectedChat={selectedChat} />
                <Chats session={sessions} selectedChat={selectedChat} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }
  const { getMessage } = await import('@/helper/getMessage')
  const message = await getMessage(session);

  return {
    props: {
      sessions: session,
      receiver: JSON.parse(JSON.stringify(message?.receiver)) as DataMessage[],
      sender: JSON.parse(JSON.stringify(message?.senderData)) as DataMessage[],

    },
  }
}
