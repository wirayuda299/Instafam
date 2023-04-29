import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { Session } from "next-auth";
import { BsPersonCircle } from "react-icons/bs";

const NavItem = dynamic(() => import("./NavItem"), { ssr: true });

type Props = {
  session: Session | null;
  setPostCreateModal: (postCreateModal: boolean) => void;
  setDrawer: (drawer: boolean) => void;
  darkMode: boolean;
  handleClick: () => void;
  pathname: string;
  setResult: (result: any) => void;
  drawer: boolean;
};

export default function NavLink(props: Props) {
  const {
    session,
    setPostCreateModal,
    setDrawer,
    darkMode,
    handleClick,
    pathname,
    setResult,
    drawer,
  } = props;

  const navList = [
    {
      id: 1,
      title: "Home",
      path: "/",
      icon: (
        <AiOutlineHome
          className={`${darkMode ? "text-white" : "text-black "} text-3xl`}
        />
      ),
    },
    {
      id: 2,
      title: "Search",
      path: "",
      icon: (
        <AiOutlineSearch
          className={`${darkMode ? "text-white" : "text-black "} text-3xl`}
        />
      ),
    },
    {
      id: 3,
      title: "Trending",
      path: "/trending",
      icon: (
        <MdOutlineExplore
          className={`${darkMode ? "text-white" : "text-black "} text-3xl`}
        />
      ),
    },
    {
      id: 4,
      title: "Messages",
      path: "/messages",
      icon: (
        <RiMessengerLine
          className={`${darkMode ? "text-white" : "text-black "} text-3xl`}
        />
      ),
    },
    {
      id: 5,
      title: "Notifications",
      path: "/notifications",
      icon: (
        <AiOutlineHeart
          className={`${darkMode ? "text-white" : "text-black "} text-3xl`}
        />
      ),
    },
    {
      id: 6,
      title: "Create",
      path: "",
      icon: (
        <AiOutlinePlusSquare
          className={`${darkMode ? "text-white" : "text-black "} text-3xl`}
        />
      ),
      event: () => setPostCreateModal(true),
    },
    {
      id: 7,
      title: "Profile",
      path: `/profile/${session?.user.username}`,
      icon: (
        <>
          <Image
            className={`hidden md:block  object-cover h-8 w-8 ${drawer ? "!w-full" : ""
              } rounded-full`}
            src={session?.user?.image || ""}
            width={50}
            height={50}
            priority
            placeholder="blur"
            blurDataURL={session?.user?.image || ""}
            quality={40}
            alt={session?.user?.name || "user"}
          />
          <BsPersonCircle className={`${darkMode ? "text-white" : "text-black "} text-3xl  md:hidden md:pointer-events-none`} />
        </>
      ),
    },
  ];

  return (
    <ul className="flex w-full items-center justify-around md:justify-around md:px-0 md:flex-col  md:space-y-2 lg:space-y-4">
      {navList.map((list) => (
        <NavItem
          key={list.id}
          list={list}
          path={list.path}
          pathname={pathname}
          darkMode={darkMode}
          toggler={handleClick}
          drawer={drawer}
          setDrawer={setDrawer}
          setPostCreateModal={setPostCreateModal}
          setResult={setResult}
        />
      ))}
    </ul>
  );
}
