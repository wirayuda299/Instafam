import { db } from "@/config/firebase";
import { useDarkModeStore } from "@/stores/stores";
import { DataMessage } from "@/types/DataMessage";
import type { Session } from "next-auth";
import type { FC } from "react";
import { type FieldValues, useForm } from "react-hook-form";
import { SlPaperPlane } from "react-icons/sl";
import { useStore } from "zustand";

type ChatFormProps = {
  selectedChat: DataMessage | null;
  session: Session | null;
};

const ChatForm: FC<ChatFormProps> = ({ selectedChat, session }) => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  const sendMessage = async (e: FieldValues) => {
    const message = e.message;
    const { doc, setDoc, arrayUnion } = await import("firebase/firestore");
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
  const { darkMode } = useStore(useDarkModeStore);

  return (
    <div
      className={` w-full rounded-full border-2 border-gray-500 border-opacity-40 md:absolute md:bottom-0  ${
        darkMode ? "bg-black" : "bg-white "
      }`}
    >
      <form
        className="flex items-center justify-between px-5 py-4"
        onSubmit={handleSubmit(sendMessage)}
      >
        <input
          type="text"
          autoComplete="off"
          className="flex-1 bg-transparent outline-none"
          placeholder="Type a message"
          {...register("message", { required: true, min: 1, max: 200 })}
          {...(errors.root?.type === "required" && (
            <span>This field is required</span>
          ))}
        />
        <button name="send" title="send">
          <SlPaperPlane className="text-2xl" />
        </button>
      </form>
    </div>
  );
};
export default ChatForm;
