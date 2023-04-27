import { db } from "@/config/firebase";
import { IUser } from "@/types/user";
import { addDoc, collection } from "firebase/firestore";
import type { Session } from "next-auth";

export async function startNewMessage(session:Session | null, chatRoomSelected:IUser | null) {
  try {
    await addDoc(collection(db, "messages"), {
      room: {
        id: [session?.user.uid, chatRoomSelected?.uid],
        receiver: {
          id: chatRoomSelected?.uid,
          image: chatRoomSelected?.image,
          name: chatRoomSelected?.username,
        },
        sender: {
          id: session?.user.uid,
          image: session?.user.image,
          name: session?.user.username,
        },
        chats: [],
      },
    })
  } catch (error: any) {
    console.log(error.message);
  }
  
}