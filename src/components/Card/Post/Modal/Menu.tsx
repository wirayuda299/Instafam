import useUser from "@/hooks/useUser";
import { PostSchema } from "@/schema/PostSchema";
import { userSchema } from "@/schema/User";
import { SessionSchema } from "@/schema/comment";
import { reportModal } from "@/store/modal";
import { selectedPostState } from "@/store/selectedPost";
import { IUserPostProps } from "@/types/post";
import { IUser } from "@/types/user";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { useRecoilState } from "recoil";
import { z } from "zod";
type Props = {
  post: IUserPostProps;
  session: Session | null;
  users: IUser | null;
  refreshData: () => void;
  ssr: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};
const modalSchema = z.object({
  post: PostSchema,
  session: SessionSchema,
  users: userSchema.nullish(),
  refreshData: z.function().args(z.void()).returns(z.void()),
  ssr: z.boolean(),
  isMenuOpen: z.boolean(),
  setIsMenuOpen: z.function().args(z.boolean()).returns(z.void()),
});
export default function Modal({
  post,
  session,
  refreshData,
  ssr,
  isMenuOpen,
  setIsMenuOpen,
}: Props) {
  const isValid = modalSchema.parse({
    post,
    session,
    refreshData,
    ssr,
    isMenuOpen,
    setIsMenuOpen,
  });
  const [selectedPost, setSelectedPost] = useRecoilState(selectedPostState);
  if (!isValid) throw new Error("Invalid Props for Modal Component");
  const { push } = useRouter();
  const [isReportModalOpen, setIsReportModalOpen] = useRecoilState(reportModal);
  const { user } = useUser(session?.user.uid as string);

  const handleCLose = () => {
    setIsMenuOpen(false);
    setSelectedPost(null);
  };

  const buttonLists = [
    {
      id: 1,
      name: post.postedById === session?.user.uid ? "Edit" : "Report",
      event: () => {
        post.postedById === user?.uid
          ? push(`/post/${post.postId}/edit`)
          : setIsReportModalOpen(true);
      },
    },
    {
      id: 2,
      name:
        post.postedById === session?.user.uid
          ? "Delete"
          : user?.following.find(
              (user: { userId: string }) => user.userId === post.postedById
            )
          ? "Unfollow"
          : "Follow",
      event: async () => {
        if (post.postedById === session?.user.uid) {
          const { deletePost } = await import("@/helper/deletePost");
          const deletePostsArgs = {
            post,
            refreshData,
            ssr: true,
            session,
          };
          deletePost(deletePostsArgs).then(() => setIsMenuOpen(false));
        } else {
          const { handleFollow } = await import("@/helper/follow");
          const followArgs = {
            id: post.postedById as string,
            uid: session?.user.uid as string,
            followedByName: session?.user.username as string,
            refreshData,
            ssr,
          };
          await handleFollow(followArgs);
        }
      },
    },
    {
      id: 3,
      name: "Copy Link",
      event: async () => {
        const { copyLink } = await import("@/util/copyLink");
        copyLink(`${process.env.NEXTAUTH_URL}/post/${post.postId}`);
      },
    },
    {
      id: 4,
      name: "Go to post",
      event: () => push(`/post/${post.postId}`),
    },

    {
      id: 5,
      name: "Share to",
      event: async () => {
        const { share } = await import("@/util/share");
        share(post, `${process.env.NEXTAUTH_URL}/post/${post.postId}`);
      },
    },
    {
      id: 6,
      name: "Cancel",
      event: handleCLose,
    },
  ];

  return (
    <div
      className={` fixed left-0 top-0 z-[99999999] h-screen w-full  select-none !overflow-x-hidden !overflow-y-hidden bg-black  bg-opacity-60 text-black shadow-sm shadow-white outline-none dark:text-white ${
        isMenuOpen ? "animate-popUp" : "hidden animate-fadeOut"
      }`}
      aria-modal="true"
      role="dialog"
    >
      <div className="mx-auto h-full max-w-lg">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="flex min-w-[400px] flex-col rounded-lg bg-white p-5 text-black dark:bg-black dark:text-white">
            {buttonLists.map((button) => (
              <button
                type="button"
                name={button.name}
                title={button.name}
                key={button.id}
                onClick={button.event}
                className={`rounded-lg py-3 text-sm font-semibold transition-all duration-300 ease-out hover:bg-[#a8a8a817] md:py-4 md:text-base ${
                  button.id === 1 || button.id === 2 ? "text-red-600" : ""
                }`}
              >
                {button.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
