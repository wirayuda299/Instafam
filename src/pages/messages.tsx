import {
  useDarkModeStore,
} from "@/stores/stores";
import { useState } from "react";
import { useStore } from "zustand";
import dynamic from "next/dynamic";
import type { Session } from "next-auth";
import { getServerSession } from "next-auth";
import type { GetServerSidePropsContext } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { DataMessage } from "@/types/DataMessage";
import { useStateContext } from "@/stores/StateContext";

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
  const [selectedChat, setSelectedChat] = useState<DataMessage | null>(null);
  const { state: { receiverDrawer }, Dispatch } = useStateContext()
  const { darkMode } = useStore(useDarkModeStore);
  const selectUser = (user: DataMessage) => setSelectedChat(user);

  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="mx-auto flex h-screen items-center justify-between overflow-hidden">
        <div className=" md:hidden w-full flex justify-center items-center">
          {!receiverDrawer ? (
            <button
              name="close receiver drawer"
              title="close receiver drawer"
              onClick={() => {
                Dispatch({
                  type: 'TOGGLE_RECEIVER_DRAWER',
                  payload: {
                    receiverDrawer: true
                  }
                })
              }}
              className="bg-blue-600 text-white px-5 rounded-md py-2 font-semibold"
              >
              Open Drawer
            </button>
          ) : null}

        </div>
        {receiver.length === 0 ? (
          <EmptyMessages />
        ) : (
          <>
            <aside
              className={`ease fixed top-0 z-50 h-full w-full max-w-sm border-r border-gray-400 border-opacity-50 transition-all  duration-300 lg:static lg:z-0 ${receiverDrawer ? "left-0" : "-left-full"
                } ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
            >
              <UserHeader />
              <UsersChat
                receiver={receiver}
                selectUser={selectUser}
                sender={sender}
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
