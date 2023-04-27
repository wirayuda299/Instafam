import Buttons from "@/components/Buttons/Buttons";
import { IUserPostProps } from "@/types/post";
import Link from "next/link";
import { useRouter } from "next/router";
type Props = {
  buttonLists: {
    id: number;
    name: string;
    event: () => void;
  }[];
  selectedPost: IUserPostProps | null;
  session: any;
  darkMode: boolean;
  setMenuModal: (menuModal: boolean) => void;
};

export default function Lists(props: Props) {
  const { buttonLists, selectedPost, session, darkMode, setMenuModal } = props;
  const { pathname } = useRouter();

  return (
    <div>
      {buttonLists.map((button) => (
        <li
          key={button.id}
          className={`!w-full rounded-none border-b border-gray-500 border-opacity-10 py-3 text-sm font-semibold transition-all duration-300  ease-out last:border-none hover:rounded-lg ${
            darkMode ? "hover:bg-[#a8a8a817]" : "hover:bg-[#a5a5a517]"
          } md:py-4 md:text-base ${
            button.id === 1 || button.id === 2 ? "text-red-600" : ""
          } ${pathname === "/post/[id]" && button.id === 4 ? "hidden" : ""}`}
        >
          {selectedPost?.postedById === session?.user.uid && button.id === 1 ? (
            <Link
              href={`/post/${selectedPost?.postId}/edit`}
              onClick={() => setMenuModal(false)}
            >
              {button.name}
            </Link>
          ) : (
            <>
              {button.id === 4 ? (
                <>
                  {pathname !== "/post/[id]" ? (
                    <Link
                      href={`/post/${selectedPost?.postId}`}
                      onClick={button.event}
                    >
                      {button.name}
                    </Link>
                  ) : null}
                </>
              ) : (
                <Buttons
                  type="button"
                  name={button.name}
                  title={button.name}
                  key={button.id}
                  onClick={button.event}
                >
                  {button.name}
                </Buttons>
              )}
            </>
          )}
        </li>
      ))}
    </div>
  );
}
