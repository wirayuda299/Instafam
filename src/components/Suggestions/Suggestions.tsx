import dynamic from "next/dynamic";
import Image from "next/image";
import { memo } from "react";
import { IUser } from "@/types/user";
import { useSession } from "next-auth/react";

const Footer = dynamic(() => import("@/components/Footer"));
const UserRecommendation = dynamic(() => import("./User"), {
  ssr: true,
});
const Buttons = dynamic(() => import("../Buttons/Buttons"));

type Props = {
  reccomend: IUser[];
};

function Suggestions({ reccomend }: Props) {
  const { data: session } = useSession();

  return (
    <section className=" hidden h-screen min-w-[384px] lg:block">
      <div className=" w-full max-w-sm p-5">
        <div className="mb-2 flex items-center justify-around space-x-2 md:justify-between">
          <div className="mb-2 flex items-center space-x-3">
            <Image
              className=" rounded-full"
              src={session?.user?.image ?? ""}
              alt={session?.user?.username ?? ""}
              width={45}
              height={45}
              sizes="45px"
              placeholder="blur"
              blurDataURL={
                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpbiR1mYB2A46H2ooooEf/2Q=="
              }
              priority
              quality={50}
            />
            <span className="text-base font-semibold ">
              {session?.user?.username}
            </span>
          </div>
          <div>
            <Buttons
              type="button"
              name="switch accounts"
              title="switch accounts"
              className="text-xs font-semibold text-blue-600"
            >
              Switch
            </Buttons>
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
      <Footer />
    </section>
  );
}
export default memo(Suggestions);
