import dynamic from "next/dynamic";
import Image from "next/image";
import { type FC, memo } from "react";
import { useSession } from "next-auth/react";

const Footer = dynamic(() => import("@/components/Footer"));
const UserRecommendation = dynamic(() => import("./User"), {
  ssr: true,
});

const Suggestions: FC<{ reccomend: IUser[] }> = ({ reccomend }) => {
  const { data: session } = useSession();

  return (
    <section className=" hidden h-screen min-w-[384px] lg:block">
      <div className=" w-full max-w-sm p-5 ">
        <div className="mb-2 flex items-center  justify-around space-x-2 md:justify-between">
          <div className="mb-2 flex items-center space-x-3">
            <Image
              className=" rounded-full"
              src={session?.user?.image ?? ""}
              alt={session?.user?.username ?? ""}
              width={45}
              height={45}
              sizes="45px"
              priority
              quality={50}
            />
            <h4 className="text-base font-semibold ">
              {session?.user?.username}
            </h4>
          </div>
          <div className={"flex items-center justify-center space-x-2"}>
            <button
              title="Log Out"
              name={"log out"}
              className="mb-4 text-center text-xs font-semibold text-blue-600"
              onClick={async () => {
                const { signOut } = await import("next-auth/react");
                await signOut({
                  callbackUrl: "/auth/signin",
                  redirect: true,
                });
              }}
            >
              Log Out
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-semibold text-gray-500">
            Recommendation for you
          </p>
          <button
            type="button"
            name="see all"
            title="see all"
            className="text-xs dark:text-blue-600 "
          >
            See all
          </button>
        </div>
        <UserRecommendation reccomend={reccomend} />
      </div>
      <Footer classNames="flex flex-wrap gap-3 text-xs  text-gray-500 transition-all ease  justify-start">
        <p className="mt-5 w-full text-xs text-gray-500">
          © 2023 INSTAFAM by{" "}
          <a href="https://instafam.vercel.app" className="pr-1">
            Instafam
          </a>
          from <a href="https://instafam.vercel.app">INSTAFAM</a>
        </p>
      </Footer>
    </section>
  );
};
export default memo(Suggestions);
