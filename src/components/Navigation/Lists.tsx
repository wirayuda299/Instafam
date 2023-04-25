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
import { useDarkModeStore, useDrawerStore, usePostCreateModalStore, useResultStore } from "@/stores/stores";
import { useStore } from "zustand";
const ListItem = dynamic(() => import("./ListItem"), { ssr: true });

export default function NavbarLists({ session }: any) {
  const { pathname } = useRouter();
  const { setPostCreateModal } = useStore(usePostCreateModalStore);
  const { drawer, setDrawer } = useStore(useDrawerStore);
  const { setResult } = useStore(useResultStore);
  const { darkMode } = useStore(useDarkModeStore);

  const toggler = () => {
    setResult([]);
    setDrawer(false);
  };

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
        <Image
          className={`h-7 w-7 border object-cover sm:h-8 sm:w-8 md:border-0 ${
            drawer ? "!w-full" : ""
          } rounded-full`}
          src={session?.user?.image || ""}
          width={50}
          height={50}
          priority
          placeholder="blur"
          blurDataURL={session?.user?.image || ""}
          quality={40}
          alt={session?.user?.name || "user profile"}
        />
      ),
    },
  ];

  return (
    <>
      {session ? (
        <ul className="flex w-full flex-row items-center justify-around sm:items-start md:flex-col  md:space-y-2 lg:space-y-4">
          {navList.map((list) => (
            <ListItem
              key={list.id}
              list={list}
              path={list.path}
              pathname={pathname}
              session={session}
              darkMode={darkMode}
              toggler={toggler}
              drawer={drawer}
              setDrawer={setDrawer}
              setPostCreateModal={setPostCreateModal}
              setResult={setResult}
            />
          ))}
        </ul>
      ) : null}
    </>
  );
}
