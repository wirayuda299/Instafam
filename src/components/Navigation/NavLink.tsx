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
  handleClick: () => void;
  pathname: string;
  drawer: boolean;
  notificationDrawer: boolean;
  handleSearchDrawer: () => void;
  handleNotificationDrawer: () => void;
  openCreateModal: () => void;
  darkMode: boolean;
};

export default function NavLink(props: Props) {
  const {
    session,
    handleClick,
    pathname,
    drawer,
    handleNotificationDrawer,
    handleSearchDrawer,
    notificationDrawer,
    openCreateModal,
    darkMode,
  } = props;

  const navList = [
    {
      id: 1,
      title: "Home",
      path: "/",
      icon: <AiOutlineHome className={` text-3xl`} />,
    },
    {
      id: 2,
      title: "Search",
      path: "",
      icon: <AiOutlineSearch className={` text-3xl`} />,
    },
    {
      id: 3,
      title: "Trending",
      path: "/trending",
      icon: <MdOutlineExplore className={` text-3xl`} />,
    },
    {
      id: 4,
      title: "Messages",
      path: "/messages",
      icon: <RiMessengerLine className={` text-3xl`} />,
    },
    {
      id: 5,
      title: "Notifications",
      path: "",
      icon: <AiOutlineHeart className={` text-3xl`} />,
    },
    {
      id: 6,
      title: "Create",
      path: "",
      icon: <AiOutlinePlusSquare className={` text-3xl`} />,
      event: () => openCreateModal(),
    },
    {
      id: 7,
      title: "Profile",
      path: `/profile/${session?.user.username}`,
      icon: (
        <>
          <Image
            className={`hidden h-8  w-8 object-cover md:block ${
              drawer ? "!w-full" : ""
            } rounded-full`}
            src={session?.user?.image || ""}
            width={50}
            height={50}
            placeholder="blur"
            blurDataURL={session?.user?.image || ""}
            quality={40}
            alt={session?.user?.name || "user"}
          />
          <BsPersonCircle
            className={` text-3xl  md:pointer-events-none md:hidden`}
          />
        </>
      ),
    },
  ];
  const navItemProps = {
    openCreateModal,
    handleNotificationDrawer,
    handleSearchDrawer,
    notificationDrawer,
    darkMode,
    pathname,
    toggler: handleClick,
    drawer,
  };

  return (
    <ul className="flex w-full items-center justify-around md:flex-col md:justify-around md:space-y-2  md:px-0 lg:space-y-4">
      {navList.map((list) => (
        <NavItem {...navItemProps} key={list.id} list={list} path={list.path} />
      ))}
    </ul>
  );
}
