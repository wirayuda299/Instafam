import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlinePlusSquare,
} from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import Image from "next/image";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useDrawerStore } from "@/stores/stores";
import { useStore } from "zustand";
const ListItem = dynamic(() => import("./ListItem"));

export default function NavbarLists({ session }: any) {
  const { pathname } = useRouter();
  const { drawer } = useStore(useDrawerStore)

  const navList = [
    {
      id: 1,
      title: "Home",
      path: "/",
      icon: <AiOutlineHome className="text-3xl text-black dark:text-white" />,
    },
    {
      id: 2,
      title: "Search",
      path: "",
      icon: <AiOutlineSearch className="text-3xl text-black dark:text-white" />,
    },
    {
      id: 3,
      title: "Explore",
      path: "/explore",
      icon: (
        <MdOutlineExplore className="text-3xl text-black dark:text-white" />
      ),
    },
    {
      id: 4,
      title: "Messages",
      path: "/messages",
      icon: <RiMessengerLine className="text-3xl text-black dark:text-white" />,
    },
    {
      id: 5,
      title: "Notifications",
      path: "/notifications",
      icon: <AiOutlineHeart className="text-3xl text-black dark:text-white" />,
    },
    {
      id: 6,
      title: "Create",
      path: "/create",
      icon: (
        <AiOutlinePlusSquare className="text-3xl text-black dark:text-white" />
      ),
    },
    {
      id: 7,
      title: "Profile",
      path: `/profile/${session?.user.username}`,
      icon: (
        <Image
          className={`h-7 w-7 border object-cover sm:h-8 sm:w-8 md:border-0 ${
            drawer ? "!w-full" : ""
          } rounded-full`}
          src={session?.user?.image || ""}
          width={50}
          height={50}
          priority
          quality={50}
          alt={session?.user?.name || "user profile"}
        />
      ),
    },
  ];
  return (
    <ul className="flex w-full flex-row items-center justify-around dark:bg-black sm:items-start md:flex-col md:justify-center md:space-y-2 lg:space-y-4">
      {navList.map((list) => (
        <ListItem
          key={list.id}
          list={list}
          path={list.path}
          pathname={pathname}
          session={session}
        />
      ))}
    </ul>
  );
}
