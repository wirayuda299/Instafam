import { useDarkModeStore } from "@/stores/stores";
import { FieldValues, useForm } from "react-hook-form";
import { SlPaperPlane } from "react-icons/sl";
import { useStore } from "zustand";

type Props = {
  sendMessage: (e: FieldValues) => Promise<void>
}

export default function ChatForm({sendMessage}:Props) {
  const { register, handleSubmit } = useForm();
  const {darkMode} = useStore(useDarkModeStore)
  return (
    <div className={`fixed bottom-16 right-0 md:absolute md:bottom-0 left-0 w-full rounded-full border-2 border-gray-500 border-opacity-40  ${darkMode ? 'bg-black' : 'bg-white '}`}>
    <form
      className="flex items-center justify-between px-5 py-4"
      onSubmit={handleSubmit(sendMessage)}
    >
      <input
        type="text"
        autoComplete="off"
        className="flex-1 outline-none bg-transparent"
        placeholder="Type a message"
        {...register("message", {required: true, min: 1, max: 200})}
      />
      <button>
        <SlPaperPlane className="text-2xl" />
      </button>
    </form>
  </div>
  )
}
