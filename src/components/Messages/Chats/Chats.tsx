type Chats = {
  createdAt: number;
  message: string;
  sender: {
    id: string;
    image: string;
    name: string;
  };
};
import { getCreatedDate } from "@/util/postDate";
import type { Session } from "next-auth";
import Image from "next/image";
import ChatForm from "../Form/ChatForm";
import { db } from "@/config/firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
type Receiver = {
  id: string;
  image: string;
  name: string;
  docId: string;
};

type Props = {
  session: Session | null;
  selectedChat: Receiver | null
};
export default function Chats({ session, selectedChat }: Props) {
  const [chats, setChats] = useState<Chats[]>([]);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "messages", `${selectedChat?.docId}`), (snapshot) => {
      if(snapshot.exists()) {
        setChats(snapshot.data().room.chats);
      }
    });
    return () => unsub();
  }, [selectedChat, db]);
  

  return (
    <div className="h-full w-full max-h-screen pb-44 md:pb-12">
      <div className="h-full w-full overflow-y-auto md:pt-20">
        {chats?.map((item) => (
          <div
            key={item.createdAt}
            className={`flex flex-row items-center p-3 ${item.sender.id === session?.user.uid
                ? " justify-end"
                : "justify-start"
              }`}
          >
            <div className="flex max-w-sm flex-col">
              <div
                className={`flex items-center gap-x-4 space-x-3 ${item.sender.id !== session?.user.uid ? "flex-row-reverse" : ""
                  }`}
              >
                <p
                  className={` rounded-2xl px-5 py-2 ${item.sender.id === session?.user.uid
                      ? "bg-gray-200 text-black"
                      : "bg-blue-600 text-white"
                    }`}
                >
                  {item.message}
                </p>
                <Image
                  src={item.sender.image}
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt={item.sender.name ?? "sender"}
                />
              </div>
              <p className="text-xs text-gray-500">
                {getCreatedDate(item.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <ChatForm selectedChat={selectedChat} session={session}/>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}
