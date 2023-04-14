import Image from "next/image";
import { imagesState } from "@/store/images";
import { useRecoilValue, useRecoilState } from "recoil";
import { useSession } from "next-auth/react";
import { captionsState } from "@/store/captions";
import { z } from "zod";
interface Props {
  handlePost: () => Promise<void>;
  loading: boolean;
}
const captionsSchema = z.object({
  handlePost: z.function().args(z.any()).returns(z.any()),
  loading: z.boolean(),
});
export default function Captions({ handlePost, loading }: Props) {
  const [captions, setCaptions] = useRecoilState(captionsState);
  const img = useRecoilValue(imagesState);
  const { data: session } = useSession();
  const isValid = captionsSchema.parse({ handlePost, loading });
  if (!isValid) throw new Error("Invalid Props");
  return (
    <div
      id="create-post"
      className={`max-h-full w-full rounded-md bg-white p-2 pb-10 shadow-lg dark:border-gray-500 dark:bg-black md:pb-0 ${
        !img ? "hidden" : "block"
      }`}
    >
      <div className="flex w-full items-center space-x-2 border-b p-2">
        <Image
          className="rounded-full p-3"
          src={session?.user?.image || ""}
          alt={session?.user?.username || ""}
          width={60}
          loading="lazy"
          placeholder="blur"
          blurDataURL={session?.user?.image || ""}
          height={60}
        />
        <p className="text-sm font-semibold dark:text-white md:text-lg">
          {session?.user?.username}
        </p>
      </div>
      <div className="w-full p-3">
        <textarea
          spellCheck="false"
          className="w-full resize-none focus:outline-none dark:bg-transparent dark:text-white"
          value={captions}
          placeholder="Your caption"
          name="caption"
          onChange={(e) => setCaptions(e.target.value)}
          cols={60}
          rows={10}
        ></textarea>
        <button
          disabled={loading}
          name="post"
          type="button"
          title="post"
          onClick={handlePost}
          className="ease h-16 w-full rounded-md bg-black bg-opacity-90 text-lg font-semibold uppercase text-white transition-all duration-300 hover:bg-opacity-100 dark:bg-white dark:bg-opacity-50 dark:text-black"
        >
          {loading ? (
            <div className="flex w-full items-center justify-center space-x-3">
              <span>Uploading... </span>
            </div>
          ) : (
            "Post"
          )}
        </button>
      </div>
    </div>
  );
}
