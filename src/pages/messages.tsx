import { db } from "@/config/firebase";
import { useDarkModeStore, useMessageModalStore, useUserReceiverDrawerStore } from "@/stores/stores";
import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { FieldValues, useForm } from "react-hook-form";
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

type Receiver = {
  id: string;
  image: string;
  name: string;
  docId: string;
};

type Chats = {
  createdAt: number;
  message: string;
  sender: {
    id: string;
    image: string;
    name: string;
  };
};

export default function Messages() {
  const { setMessageModal } = useStore(useMessageModalStore);
  const { data: session } = useSession();
  const [selectedChat, setSelectedChat] = useState<Receiver | null>(null);
  const { resetField } = useForm();
  const [receiver, setReceiver] = useState<Receiver[]>([]);
  const [chats, setChats] = useState<Chats[]>([]);
  const {setUserReceiverDrawer, userReceiverDrawer} = useStore(useUserReceiverDrawerStore)
  const {darkMode} = useStore(useDarkModeStore)

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
        }));
        setReceiver(result);
      }
    );
  }, [db]);

  useEffect(() => {
    onSnapshot(doc(db, "messages", `${selectedChat?.docId}`), (snapshot) => {
      const res = snapshot.data();
      setChats(res?.room?.chats);
    });
  }, [selectedChat]);

  const sendMessage = async (e: FieldValues) => {
    const message = e.message;
    try {
      const q = doc(db, "messages", `${selectedChat?.docId}`);
      await setDoc(
        q,
        {
          room: {
            chats: arrayUnion({
              message: message,
              createdAt: Date.now(),
              sender: {
                id: session?.user.uid,
                image: session?.user.image,
                name: session?.user.name,
              },
            }),
          },
        },
        { merge: true }
      );
      resetField("message");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const selectUser = (user: Receiver) => {
    setSelectedChat(user);
  };

  return (
    <div className="h-screen overflow-y-auto w-full">
      <div className="mx-auto flex h-screen items-center justify-between overflow-hidden">
        <aside className={`h-full w-full max-w-sm border-r border-gray-400 border-opacity-50 fixed top-0 transition-all ease duration-300  z-50 lg:z-0 lg:static ${userReceiverDrawer ? 'left-0' : '-left-full'} ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <UserHeader setMessageModal={setMessageModal} />
          <UsersChat receiver={receiver} selectUser={selectUser} />
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
              <Chats chats={chats} session={session} sendMessage={sendMessage}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
