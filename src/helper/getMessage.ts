import { db } from "@/config/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import type { Session } from "next-auth";

type Data = {
  id: string;
  image: string;
  name: string;
  docId: string;
  message: string;
};

type ReturnTypes = {
  receiver: Data[];
  senderData: Data[];
};

export async function getMessage(
  session: Session | null
): Promise<ReturnTypes | undefined> {
  try {
    if (!session) throw new Error("Please login to get message");

    const q = query(
      collection(db, "messages"),
      where("room.id", "array-contains", `${session?.user.uid}`)
    );
    const response = await getDocs(q);
    const result = response.docs.map((item) => ({
      docId: item.id,
      data: item.data(),
    }));
    const receiver = result.map((item) => ({
      id: item.data.room.receiver.id as string,
      image: item.data.room.receiver.image as string,
      name: item.data.room.receiver.name as string,
      docId: item.docId as string,
      message: item.data.message as string,
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
      senderData,
    };
  } catch (error: any) {
    console.log(error.message);
  }
}
