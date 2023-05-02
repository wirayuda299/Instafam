import { useStateContext } from "@/stores/StateContext";
import { RiMessengerLine } from "react-icons/ri";

export default function EmptyMessages() {
  const { Dispatch } = useStateContext()
  return (
    <div className="p-5 text-center ">
      <button className="rounded-full border-2 border-black p-6">
        <RiMessengerLine className="text-5xl" size={50} />
      </button>
      <h1 className="pt-3 text-2xl font-semibold">Your Message</h1>
      <p className="text-gray-500">
        Send private photos and messages to a friend or group
      </p>
      <button
        className="mt-3 rounded-md bg-blue-600 px-5 py-2 font-semibold text-white"
        onClick={() => {
          Dispatch({
            type: 'TOGGLE_MESSAGE_MODAL',
            payload: {
              messageModal: true
            }
          })
        }}
      >
        Send Message
      </button>
    </div>
  );
}
