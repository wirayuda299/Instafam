import Link from "next/link";
import { AiOutlineHome, AiOutlineSearch, AiOutlineHeart, AiOutlinePlusSquare } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import Image from "next/image";
import { searchDrawer } from "@/store/searchDrawer";
import { useRecoilState } from "recoil";
import { resultsState } from "@/store/results";
import { useRouter } from "next/router";
import { Session } from "next-auth";

export default function NavbarLists({ session }: { session: Session | null }) {
  const { pathname } = useRouter();
  const [drawerOpen, setDrawerOpen] = useRecoilState(searchDrawer);
  const [results, setResults] = useRecoilState(resultsState);
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
          className={`h-7 w-7 border object-cover sm:h-8 sm:w-8 md:border-0 ${drawerOpen ? "!w-full" : ""
            } rounded-full`}
          src={session?.user?.image || ""}
          width={50}
          height={50}
          placeholder="blur"
          blurDataURL={
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBaKKKAP//Z"
          }
          priority
          quality={50}
          alt={session?.user?.name || "user profile"}
        />
      ),
    },
  ];

  const toggler = () => {
    setResults([]);
    setDrawerOpen(false);
  };

  return (
    <ul className="flex w-full flex-row items-center justify-around dark:bg-black sm:items-start md:flex-col md:justify-center md:space-y-2 lg:space-y-4">
      {navList.map((list) => (
        <li
          role="listitem"
          key={list.id}
          className={` w-fit rounded-full p-2 text-base font-light  hover:bg-[#a8a8a817] hover:bg-gray-200 dark:hover:bg-[#b9b9b917] md:w-full md:p-3 ${list.id === 2 || list.id === 5 ? "hidden md:block" : ""
            } ${list.id === 8 ? "hidden md:block" : ""} ${pathname === list.path ? "font-semibold" : ""
            }`}
        >
          {list.id === 2 ? (
            <button
              role="button"
              type="button"
              name="search"
              title="search"
              disabled={session ? false : true}
              className="flex cursor-pointer space-x-2"
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              {list.icon}
              <span className={`${drawerOpen ? "hidden" : "hidden lg:block"}`}>
                {list.title}
              </span>
            </button>
          ) : (
            <Link
              href={list.path}
              onClick={toggler}
              title={list.title}
              role="link"
              shallow
            >
              <button
                disabled={session ? false : true}
                title={list.title}
                className="flex space-x-2"
                name={list.title}
                type="button"
              >
                {list.icon}
                <span
                  className={`${drawerOpen ? "hidden" : "hidden lg:block"}`}
                >
                  {list.title}
                </span>
              </button>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
