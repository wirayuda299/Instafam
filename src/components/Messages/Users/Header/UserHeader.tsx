import Buttons from "@/components/Buttons/Buttons";
import { useUserReceiverDrawerStore } from "@/stores/stores";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsChatText } from "react-icons/bs";
import { useStore } from "zustand";
type Props = {
  setMessageModal: (messageModal: boolean) => void;
};
export default function UserHeader({ setMessageModal }: Props) {
  const {setUserReceiverDrawer, userReceiverDrawer} = useStore(useUserReceiverDrawerStore)
  return (
    <header className="w-full border-b-2 border-gray-400 border-opacity-50 py-6">
      <div className="flex items-center justify-between">
        <div className="flex w-full items-center justify-between space-x-2 px-3">
          <Buttons onClick={() => setUserReceiverDrawer(false)} className="md:hidden">
            <AiOutlineArrowLeft size={20}/>
          </Buttons>
          <h2 className="flex-1 text-xl font-semibold">Message</h2>
          <button onClick={() => setMessageModal(true)}>
            <BsChatText className="text-2xl" />
          </button>
        </div>
      </div>
    </header>
  );
}
