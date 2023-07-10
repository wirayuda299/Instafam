import { getCreatedDate } from "@/utils/postDate";
import type { Session } from "next-auth";
import Image from "next/image";
import ChatForm from "../Form/ChatForm";
import { db } from "@/config/firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { type FC, useEffect, useState } from "react";

import { Chats as ChatsType } from "@/types/Chats";

type ChatsProps = {
  session: Session | null;
  selectedChat: DataMessage | null;
};
const Chats: FC<ChatsProps> = ({ session, selectedChat }) => {
  const [chats, setChats] = useState<ChatsType[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "messages", `${selectedChat?.docId}`),
      (snapshot) => {
        if (snapshot.exists()) {
          setChats(snapshot.data().room.chats);
        }
      }
    );
    return () => unsub();
  }, [selectedChat, db]);

  return (
    <>
      {selectedChat ? (
        <div className=" h-screen w-full  pb-20 md:pb-10">
          <div className="h-full  w-full ">
            {chats?.map((item) => (
              <div
                key={item.createdAt}
                className={`flex flex-row items-center p-3 ${
                  item.sender.id === session?.user.uid
                    ? " justify-end"
                    : "justify-start"
                }`}
              >
                <div className="flex max-w-sm flex-col">
                  <div
                    className={`flex items-center gap-x-4 space-x-3 ${
                      item.sender.id !== session?.user.uid
                        ? "flex-row-reverse"
                        : ""
                    }`}
                  >
                    <p
                      className={` rounded-2xl px-5 py-2 ${
                        item.sender.id === session?.user.uid
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
            <section className="md: left-0 z-0 hidden w-full md:absolute md:bottom-0 md:block">
              <ChatForm selectedChat={selectedChat} session={session} />
            </section>
          </div>
          <br />
          <br />
          <br />
        </div>
      ) : null}
    </>
  );
};

export default Chats;
