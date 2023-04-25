import MessagesModal from "@/components/Modal/Messages/Messages";
import { useMessageModalStore } from "@/stores/stores";
import { RiMessengerLine } from "react-icons/ri";
import { useStore } from "zustand";

export default function Messages() {
  const { messageModal, setMessageModal } = useStore(useMessageModalStore);
  
  return (
    <div className="h-screen w-full overflow-y-auto">
      <div className="flex justify-center items-center h-screen max-w-lg mx-auto">
        <div className="text-center p-5">
          <button className="border-2 border-black rounded-full p-5">
            <RiMessengerLine className="text-5xl" size={50} />
          </button>
          <h1 className="text-2xl font-semibold pt-3">Your Message</h1>
          <p className="text-gray-500">
            Send private photos and messages to a friend or group
          </p>
          <button className="py-2 bg-blue-600 rounded-md px-5 text-white mt-3 font-semibold" onClick={() => setMessageModal(true)}>
            Send Message
          </button>
        </div>
      </div>
    </div>
  )
}
