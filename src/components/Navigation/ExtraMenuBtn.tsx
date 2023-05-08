import type { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";

type Props = {
  extraList: boolean;
  handleClick: () => void;
  drawer: boolean;
  notificationdrawer: boolean;
};

const ExtraMenuBtn:FC<Props> = (props) =>{
  const { extraList, handleClick, drawer, notificationdrawer } = props;

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
          <AiOutlineClose className={`text-xl md:text-2xl `} size={30} />
        ) : (
          <RxHamburgerMenu className={`text-xl md:text-2xl `} size={30} />
        )}
        <span
          className={`${
            drawer || notificationdrawer ? "hidden" : "hidden lg:block"
          }`}
        >
          More
        </span>
      </div>
    </button>
  );
}
export default ExtraMenuBtn
