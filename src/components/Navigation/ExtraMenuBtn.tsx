import dynamic from "next/dynamic";
import { AiOutlineClose } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
const Buttons = dynamic(() => import("../Buttons/Buttons"), { ssr: false });

type Props = {
  extraList: boolean;
  darkMode: boolean;
  handleClick: () => void;
  drawer: boolean;
};

export default function ExtraMenuBtn(props: Props) {
  const {
    darkMode,
    extraList,
    handleClick,
    drawer,
  } = props

  
  return (
    <Buttons
      type="button"
      className="hidden md:block"
      name="extra menu"
      title="extra menus"
      onClick={handleClick}
    >
      <div className="ease flex items-center space-x-2 px-3 text-base transition-all duration-300 sm:text-lg">
        {extraList ? (
          <AiOutlineClose
            className={`text-xl md:text-2xl ${darkMode ? "text-white" : "text-black"
              }`}
            size={30}
          />
        ) : (
          <RxHamburgerMenu
            className={`text-xl md:text-2xl ${darkMode ? "text-white" : "text-black"
              }`}
            size={30}
          />
        )}
        <span className={`${drawer ? "hidden" : "hidden lg:block"}`}>More</span>
      </div>
    </Buttons>
  );
}
