import {
  useDarkModeStore,
  useFeedModalStore,
  useSelectedPostStore,
} from "@/stores/stores";
import { useStore } from "zustand";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const Postheader = dynamic(() => import("../Post/Header"), { ssr: false });

export default function Feed() {
  const { darkMode } = useStore(useDarkModeStore);
  const { feedModal, setFeedModal } = useStore(useFeedModalStore);
  const { selectedPost, setSelectedPost } = useStore(useSelectedPostStore);
  const router = useRouter();

  const handleClick = () => {
    router.replace(`/post/${selectedPost?.postId}`);
    setFeedModal(false);
    setSelectedPost(null);
  }
  return (
    <>
      {selectedPost && feedModal && (
        <div
          className={` fixed left-0 top-0 z-[99999999] h-screen w-full  select-none !overflow-x-hidden !overflow-y-hidden  bg-black bg-opacity-60 shadow-sm  ${
            feedModal ? "animate-fadeIn" : "animate-fadeOut"
          }`}
          aria-modal="true"
          role="dialog"
        >
          <div className="mx-auto h-full max-w-[500px] text-center ">
            <div
              className="flex h-full flex-col items-center justify-center"
              onClick={() => setSelectedPost(null)}
            >
              <div
                className={`flex min-w-[300px] flex-col rounded-lg  p-5 ${
                  darkMode ? "!bg-black text-white" : "!bg-white text-black"
                } `}
              >
                <Postheader post={selectedPost}>
                  <button
                    onClick={() => {
                      setFeedModal(false);
                      setSelectedPost(null);
                    }}
                  >
                    <AiOutlineClose size={20} />
                  </button>
                </Postheader>
                <button
                  onClick={handleClick}
                  title={`/post/${selectedPost.postId}`}
                  name={`/post/${selectedPost.postId}`}
                >
                  <Image
                    src={selectedPost?.image as string}
                    width={500}
                    height={500}
                    sizes="(max-width: 1300px) 100vw, 500px"
                    quality={100}
                    placeholder="blur"
                    blurDataURL={
                      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpbiR1mYB2A46H2ooooEf/2Q=="
                    }
                    priority
                    className=" aspect-square h-[500px] w-fit rounded-lg object-cover"
                    alt={selectedPost?.author ?? "user post image"}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
