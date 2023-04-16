import { Session } from "next-auth";

type Props = {
  likesCount: string[];
  session: Session | null;
};
export default function Likes({ likesCount, session }: Props) {

  
  return (
    <>
      {likesCount && likesCount.length > 0 ? (
        <div className="mb-4 mt-1 flex px-1 text-xs font-light tracking-wider ">
          {likesCount.includes(session?.user?.uid as string) ? (
            <p className="flex items-center gap-1 space-x-1">
              {likesCount.length > 1 ? "You  " : "liked by You "}
              <span
                className={`${likesCount.length - 1 < 1 ? "hidden" : "block"}`}
              >
                and {likesCount.length - 1} others
              </span>
            </p>
          ) : (
            <span>
              {likesCount.length} {likesCount.length > 1 ? "likes" : "like"}
            </span>
          )}
        </div>
      ) : null}
    </>
  );
}
