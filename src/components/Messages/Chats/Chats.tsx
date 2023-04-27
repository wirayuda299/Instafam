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
import { Session } from "next-auth";
import Image from "next/image";
import ChatForm from "../Form/ChatForm";
import { FieldValues } from "react-hook-form";

type Props = {
  chats: Chats[];
  session: Session | null;
  sendMessage: (e: FieldValues) => Promise<void>
};
export default function Chats({ chats, session, sendMessage }: Props) {
  return (
    <div className="h-full w-full max-h-screen pb-44 md:pb-12">
      <div className="h-full w-full overflow-y-auto ">
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
        <ChatForm sendMessage={sendMessage} />
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}
