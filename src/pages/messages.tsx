import { db } from "@/config/firebase";
import useUser from "@/hooks/useUser";
import { IUser } from "@/types/user";
import {
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { BsSend } from "react-icons/bs";
import Image from "next/image";
export default function Messages() {
  const { data: session } = useSession();
  const { user } = useUser(session?.user?.uid as string);
  const [followingLists, setFollowingLists] = useState<IUser[]>([]);
  const [open, setOpen] = useState(false);

  const sendMessages = async () => {
    try {
      await updateDoc(doc(db, "messages", "1234@4321"), {
        messages: arrayUnion({
          message: "Hello",
          sender: "1234",
          receiver: "4321",
          timestamp: Date.now(),
        }),
      }).then(() => {
        console.log("Document successfully written!");
      });
    } catch (error) {
      console.log("Error writing document: ", error);
    }
  };

  return (
    <>
      <Head>
        <title>Messages &#8226; Instafam</title>
      </Head>
      <div className="h-full w-full">
        <div className="grid h-screen w-full place-items-center">
          <div
            className={`${
              user && user?.following.length < 1 ? "hidden" : "block"
            }`}
          >
            <button className="btn-active btn" onClick={() => setOpen(true)}>
              Create new message
            </button>
          </div>
        </div>

        {/* <ul className={`${open ? 'block' : 'hidden'}`}>
          {followingLists?.map((user) => (
            <li key={user.uid} className="flex items-center justify-between p-2">
              <div className="flex items-center">
                <Image src={user.image} width={40} height={40} className="rounded-full" alt=""/>
                <p className="ml-2">{user.username}</p>
              </div>
              <button className="btn btn-active" onClick={sendMessages}>
                <BsSend />
              </button>
            </li>
          ))
          }
          
        </ul> */}
      </div>
    </>
  );
}
