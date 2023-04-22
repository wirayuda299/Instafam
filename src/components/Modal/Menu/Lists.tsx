import { IUserPostProps } from "@/types/post";
import { IUser } from "@/types/user";
import Link from "next/link";
type Props = {
  buttonLists: {
    id: number;
    name: string;
    event: () => void;
  }[];
  selectedPost: IUserPostProps | null;
  user: IUser | null;
  darkMode: boolean;
  setMenuModal: (menuModal: boolean) => void;
};

export default function Lists({
  buttonLists,
  selectedPost,
  user,
  darkMode,
  setMenuModal,
}: Props) {
  return (
    <div>
      {buttonLists.map((button) => (
        <li
          key={button.id}
          className={`!w-full rounded-none border-b border-gray-500 border-opacity-10 py-3 text-sm font-semibold transition-all  duration-300 ease-out hover:rounded-lg ${
            darkMode ? "hover:bg-[#a8a8a817]" : "hover:bg-[#a5a5a517]"
          } md:py-4 md:text-base ${
            button.id === 1 || button.id === 2 ? "text-red-600" : ""
          }`}
        >
          {selectedPost?.postedById === user?.uid && button.id === 1 ? (
            <Link
              href={`/post/${selectedPost?.postId}/edit`}
              onClick={() => setMenuModal(false)}
            >
              {button.name}
            </Link>
          ) : (
            <>
              {button.id === 4 ? (
                <Link
                  href={`/post/${selectedPost?.postId}`}
                  onClick={button.event}
                >
                  {button.name}
                </Link>
              ) : (
                <button
                  type="button"
                  name={button.name}
                  title={button.name}
                  key={button.id}
                  onClick={button.event}
                >
                  {button.name}
                </button>
              )}
            </>
          )}
        </li>
      ))}
    </div>
  );
}
