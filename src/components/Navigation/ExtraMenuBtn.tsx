import {
  useDarkModeStore,
  useDrawerStore,
  useExtraListStore,
} from "@/stores/stores";
import { AiOutlineClose } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { useStore } from "zustand";

export default function ExtraMenuBtn() {
  const { setExtraList, extraList } = useStore(useExtraListStore);
  const { drawer, setDrawer } = useStore(useDrawerStore);
  const { darkMode } = useStore(useDarkModeStore);
  const handleClick = () => {
    setExtraList(!extraList);
    setDrawer(false);
  };

  return (
    <button
      type="button"
      className="hidden md:block"
      name="extra menu"
      title="extra menus"
      onClick={handleClick}
    >
      <div className="ease flex items-center space-x-2 px-3 text-base transition-all duration-300 sm:text-lg">
        {extraList ? (
          <AiOutlineClose
            className={`text-xl md:text-2xl ${
              darkMode ? "text-white" : "text-black"
            }`}
            size={30}
          />
        ) : (
          <RxHamburgerMenu
            className={`text-xl md:text-2xl ${
              darkMode ? "text-white" : "text-black"
            }`}
            size={30}
          />
        )}
        <span className={`${drawer ? "hidden" : "hidden lg:block"}`}>More</span>
      </div>
    </button>
  );
}
