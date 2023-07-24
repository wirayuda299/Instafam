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
import type { FC } from "react";

const NavItem = dynamic(() => import("./NavItem"), { ssr: true });

type NavLinkProps = {
  session: Session | null;
  handleClick: () => void;
  pathname: string;
  drawer: boolean;
  notificationDrawer: boolean;
  handleNotificationDrawer: () => void;
  openCreateModal: () => void;
};

const NavLink: FC<NavLinkProps> = (props) => {
  const {
    session,
    handleClick,
    pathname,
    drawer,
    handleNotificationDrawer,
    notificationDrawer,
    openCreateModal,
  } = props;

  const navList = [
    {
      id: 'home',
      title: "Home",
      path: "/",
      icon: <AiOutlineHome className={` text-3xl`} />,
    },
    {
      id: 'search-drawers',
      title: "Search",
      path: "",
      icon: <AiOutlineSearch className={` text-3xl`} />,
    },
    {
      id: 'trending',
      title: "Trending",
      path: "/trending",
      icon: <MdOutlineExplore className={` text-3xl`} />,
    },
    {
      id: 'messages',
      title: "Messages",
      path: "/messages",
      icon: <RiMessengerLine className={` text-3xl`} />,
    },
    {
      id: 'notifications',
      title: "Notifications",
      path: "",
      icon: <AiOutlineHeart className={` text-3xl`} />,
    },
    {
      id: 'create',
      title: "Create",
      path: "",
      icon: <AiOutlinePlusSquare className={` text-3xl`} />,
      event: () => openCreateModal(),
    },
    {
      id: 'profile',
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
    notificationDrawer,
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
};

export default NavLink;
