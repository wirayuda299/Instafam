import { extraListToggler } from "@/store/extraListToggler";
import { searchDrawer } from "@/store/searchDrawer";
import { AiOutlineClose } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { useRecoilState } from "recoil";

export default function ExtraMenuBtn() {
  const [extraListOpen, setExtraListOpen] = useRecoilState(extraListToggler);
  const [drawerOpen, setDrawerOpen] = useRecoilState(searchDrawer);

  const handleClick = () => {
    setExtraListOpen(!extraListOpen);
    setDrawerOpen(false);
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
        {extraListOpen ? (
          <AiOutlineClose className="text-xl md:text-2xl" size={30} />
        ) : (
          <RxHamburgerMenu className="text-xl md:text-2xl" size={30} />
        )}
        <span className={`${drawerOpen ? "hidden" : "hidden lg:block"}`}>
          More
        </span>
      </div>
    </button>
  );
}
