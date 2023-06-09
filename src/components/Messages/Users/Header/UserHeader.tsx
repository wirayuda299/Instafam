import { useModalContext } from "@/stores/Modal/ModalStatesContext";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsChatText } from "react-icons/bs";
import { useDrawerContext } from "@/stores/Drawer/DrawerStates";

const UserHeader = () => {
  const { drawerDispatch } = useDrawerContext();
  const { modalDispatch } = useModalContext();
  return (
    <header className="w-full border-b-2 border-gray-400 border-opacity-50 py-6">
      <div className="flex items-center justify-between">
        <div className="flex w-full items-center justify-between space-x-2 px-3">
          <button
            onClick={() => {
              drawerDispatch({
                type: "TOGGLE_RECEIVER_DRAWER",
                payload: {
                  receiverDrawer: false,
                },
              });
            }}
            className="md:hidden"
            name="back"
            title="back"
          >
            <AiOutlineArrowLeft size={20} />
          </button>
          <h2 className="flex-1 text-xl font-semibold">Message</h2>
          <button
            name="open modal"
            title="open modal"
            onClick={() => {
              modalDispatch({
                type: "TOGGLE_MESSAGE_MODAL",
                payload: {
                  messageModal: true,
                },
              });
            }}
          >
            <BsChatText className="text-2xl" />
          </button>
        </div>
      </div>
    </header>
  );
};
export default UserHeader;
