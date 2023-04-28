import { db } from "@/config/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import type { Session } from "next-auth";

export async function getMessage(session: Session | null) {
  try {
    const q = query(
      collection(db, "messages"),
      where("room.id", "array-contains", `${session?.user.uid}`)
    )
    const response = await getDocs(q)
    const result = response.docs.map((item) => ({
      docId: item.id,
      data: item.data(),

    }))
    const receiver = result.map((item) => ({
      id: item.data.room.receiver.id,
      image: item.data.room.receiver.image,
      name: item.data.room.receiver.name,
      docId: item.docId,
      message: item.data.message,
    }));
    const senderData = result.map((item) => ({
      id: item.data.room.sender.id,
      image: item.data.room.sender.image,
      name: item.data.room.sender.name,
      docId: item.docId,
      message: item.data.message,
    }));
    return {
      receiver,
      senderData
    }

  } catch (error: any) {
    console.log(error.message);


  }


}