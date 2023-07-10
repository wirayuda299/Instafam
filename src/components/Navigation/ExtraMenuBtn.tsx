import type { Dispatch, FC, SetStateAction } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";

type ExtraMenuProps = {
  extraList: boolean;
  setIsOpen:  Dispatch<SetStateAction<boolean>>;
  drawer: boolean;
  notificationdrawer: boolean;
};

const ExtraMenuBtn: FC<ExtraMenuProps> = (props) => {
  const { extraList, setIsOpen, drawer, notificationdrawer } = props;

  return (
    <button
      type="button"
      className="hidden md:block"
      name="extra menu"
      title="extra menus"
      onClick={() => setIsOpen(true)}
    >
      <div className="ease flex items-center space-x-2 px-3 text-base transition-all duration-300 sm:text-lg">
        {extraList ? (
          <AiOutlineClose className={`text-xl md:text-2xl `} size={30} />
        ) : (
          <RxHamburgerMenu id="extraLists" className={`text-xl md:text-2xl `} size={30} />
        )}
        {!drawer || !notificationdrawer ? (
          <span className="hidden lg:block">
            More
          </span>
        ) :null}
      </div>
    </button>
  );
};
export default ExtraMenuBtn;
