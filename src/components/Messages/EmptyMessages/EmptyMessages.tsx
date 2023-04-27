import Buttons from "@/components/Buttons/Buttons";
import { useMessageModalStore } from "@/stores/stores";
import { RiMessengerLine } from "react-icons/ri";
import { useStore } from "zustand";

export default function EmptyMessages() {
  const { setMessageModal } = useStore(useMessageModalStore);
  return (
    <div className="p-5 text-center ">
      <Buttons className="rounded-full border-2 border-black p-6">
        <RiMessengerLine className="text-5xl" size={50} />
      </Buttons>
      <h1 className="pt-3 text-2xl font-semibold">Your Message</h1>
      <p className="text-gray-500">
        Send private photos and messages to a friend or group
      </p>
      <Buttons
        className="mt-3 rounded-md bg-blue-600 px-5 py-2 font-semibold text-white"
        onClick={() => setMessageModal(true)}
      >
        Send Message
      </Buttons>
    </div>
  )
}
