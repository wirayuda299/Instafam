import { useDarkModeStore } from "@/stores/stores";
import { IUser } from "@/types/user";
import { FC, useState } from "react";
import { createPortal } from "react-dom";
import { type FieldValues, useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useStore } from "zustand";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useStateContext } from "@/stores/StateContext";
import { toast } from "react-hot-toast";

const MessagesModal: FC = () => {
  const {
    Dispatch,
    state: { messageModal, chatRoomSelected },
  } = useStateContext();
  const { handleSubmit, resetField, register } = useForm();
  const [result, setResult] = useState<IUser[] | undefined>([]);
  const { darkMode } = useStore(useDarkModeStore);
  const { replace, asPath, push } = useRouter();
  const { data: session } = useSession();

  const searchUser = async (data: FieldValues) => {
    const { toast } = await import("react-hot-toast");
    try {
      if (data.search === "") {
        toast.error("Please enter a username or name of user");
        return;
      }
      if (!session || !session.user) {
        toast.error("Please login to search user");
        push("/auth/signin");
        return;
      }
      const res = await fetch(`/api/search-user?search=${data.search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result: IUser[] = await res.json();
      if (result.length === 0) {
        toast.error("No user found");
        return;
      }
      setResult(result);
      resetField("search");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const defaultValues = {
    search: "",
  };
  if (!messageModal) return null;

  return createPortal(
    <div
      className={` fixed left-0 top-0 z-[99999999] h-screen w-full  select-none !overflow-hidden   shadow-sm  ${
        messageModal ? "animate-fadeIn" : "animate-fadeOut"
      } ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
      aria-modal="true"
      role="dialog"
    >
      <div className="mx-auto mt-5 h-full max-w-lg text-center">
        <div className="flex justify-center px-3 py-2">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Message</h1>
          </div>
          <button
            onClick={async () => {
              Dispatch({
                type: "TOGGLE_MESSAGE_MODAL",
                payload: {
                  messageModal: false,
                },
              });
              setResult([]);
            }}
          >
            <AiOutlineClose size={30} />
          </button>
        </div>
        <div className="mt-3 rounded-2xl border border-gray-400 border-opacity-50">
          <form
            className="mx-5 flex items-center justify-start  space-x-2 py-3"
            onSubmit={handleSubmit(searchUser)}
          >
            <h2 className="text-lg font-semibold">To :</h2>
            <div>
              <div className="flex w-full items-center justify-between rounded-md  px-3">
                <input
                  type="search"
                  placeholder="search user"
                  autoComplete="off"
                  autoCorrect="off"
                  autoFocus={false}
                  alt="search user"
                  security="restricted"
                  className="w-full bg-transparent py-2 text-xs focus:border-0 focus:outline-none focus:ring-0 md:text-sm"
                  defaultValue={defaultValues.search}
                  {...register("search")}
                />
              </div>
            </div>
          </form>
          {result?.map((user) => (
            <div
              onClick={async () => {
                try {
                  Dispatch({
                    type: "SET_CHAT_ROOM_SELECTED",
                    payload: {
                      chatRoomSelected: user,
                    },
                  });
                  const { startNewMessage } = await import(
                    "@/helper/startNewMessage"
                  );
                  startNewMessage(session, chatRoomSelected).then(() => {
                    Dispatch({
                      type: "TOGGLE_MESSAGE_MODAL",
                      payload: {
                        messageModal: false,
                      },
                    });
                    replace(asPath);
                    setResult([]);
                  });
                } catch (e: any) {
                  toast.error(e.message);
                }
              }}
              key={user.uid}
              className={`relative flex items-center space-x-2  px-4 py-3 ${
                darkMode ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              <Image
                className="h-8 w-8 rounded-full object-cover "
                alt={user.username ?? "user profile"}
                width={50}
                height={50}
                src={user.image || ""}
                priority
                sizes="50px"
                placeholder="blur"
                blurDataURL={
                  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpbiR1mYB2A46H2ooooEf/2Q=="
                }
              />
              <h2 className="font-semibold">{user.username}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.getElementById("modal") as Element
  );
};
export default MessagesModal;
