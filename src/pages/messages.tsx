import { db } from "@/config/firebase";
import { useDarkModeStore, useMessageModalStore, useUserReceiverDrawerStore } from "@/stores/stores";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import dynamic from "next/dynamic";
const UsersChat = dynamic(() => import("@/components/Messages/Users/UsersChat"), {
  ssr: false,
});
const UserHeader = dynamic(() => import("@/components/Messages/Users/Header/UserHeader"), {
  ssr: false,
});
const Chats = dynamic(() => import("@/components/Messages/Chats/Chats"), {
  ssr: false,
});
const ChatHeader = dynamic(() => import("@/components/Messages/Chats/Header/Header"), {
  ssr: false,
});

const EmptyMessages = dynamic(() => import("@/components/Messages/EmptyMessages/EmptyMessages"), {
  ssr: false,
});
export type Chats = {
  createdAt: number;
  message: string;
  sender: {
    id: string;
    image: string;
    name: string;
  };
};

type Receiver = {
  id: string;
  image: string;
  name: string;
  docId: string;
  message: Chats[];
};
type Sender = {
  id: string;
  image: string;
  name: string;
  docId: string;
  message: Chats[]

}


export default function Messages() {
  const { setMessageModal } = useStore(useMessageModalStore);
  const { data: session } = useSession();
  const [receiver, setReceiver] = useState<Receiver[]>([]);
  const [sender, setSender] = useState<Sender[]>([]);
  const [selectedChat, setSelectedChat] = useState<Receiver | null>(null);

  const { userReceiverDrawer, setUserReceiverDrawer } = useStore(useUserReceiverDrawerStore)
  const { darkMode } = useStore(useDarkModeStore)

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "messages"),
        where("room.id", "array-contains", `${session?.user.uid}`)
      ),

      (snapshot) => {
        const res = snapshot.docs.map((doc) => ({
          docId: doc.id,
          data: doc.data(),
        }));
        const result = res.map((item) => ({
          id: item.data.room.receiver.id,
          image: item.data.room.receiver.image,
          name: item.data.room.receiver.name,
          docId: item.docId,
          message: item.data.message,
        }));
        const senderData = res.map((item) => ({
          id: item.data.room.sender.id,
          image: item.data.room.sender.image,
          name: item.data.room.sender.name,
          docId: item.docId,
          message: item.data.message,
        }))
        setReceiver(result);
        setSender(senderData)
      }
    );
  }, [db, selectedChat, session]);



  const selectUser = (user: Receiver) => {
    setSelectedChat(user);
  };

  return (
    <div className="h-screen overflow-y-auto w-full">
      <div className="mx-auto flex h-screen items-center justify-between overflow-hidden">
        <aside className={`h-full w-full max-w-sm border-r border-gray-400 border-opacity-50 fixed top-0 transition-all ease duration-300  z-50 lg:z-0 lg:static ${userReceiverDrawer ? 'left-0' : '-left-full'} ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <UserHeader setMessageModal={setMessageModal} />
          <UsersChat
            receiver={receiver}
            selectUser={selectUser}
            sender={sender}
            setUserReceiverDrawer={setUserReceiverDrawer}
          />
        </aside>
        {receiver.length === 0 ? (
          <EmptyMessages />
        ) : (
          <div
            className={`h-full w-full  ${selectedChat === null ? "hidden" : "block"
              }`}
          >
            <div className="relative h-full w-full">
              <ChatHeader selectedChat={selectedChat} />
              <Chats session={session} selectedChat={selectedChat} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

