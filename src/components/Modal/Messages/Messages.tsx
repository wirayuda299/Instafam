import Buttons from "@/components/Buttons/Buttons";
import Form from "@/components/Search/Form";
import { useDarkModeStore, useMessageModalStore, useResultStore } from "@/stores/stores";
import { IUserPostProps } from "@/types/post";
import { IUser } from "@/types/user";
import { useState } from "react";
import { createPortal } from "react-dom";
import { FieldValues, useForm } from "react-hook-form";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { useStore } from "zustand";
import dynamic from "next/dynamic";
import Image from "next/image";
import CreatedTime from "@/components/Post/CreatedTime";

export default function MessagesModal() {
  const { messageModal, setMessageModal } = useStore(useMessageModalStore);
  const { handleSubmit, resetField, register } = useForm();
  const [result, setResult] = useState<IUser[]>([])
  const { darkMode } = useStore(useDarkModeStore);

  const searchUser = async (data: FieldValues) => {
    try {
      const { onSubmit } = await import("@/helper/searchUser");
      const result = await onSubmit({
        data,
        resetField,
      });
      setResult(result);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const defaultValues = {
    search: "",
  }
  if (!messageModal) return null
  return createPortal(
    <div
      className={` fixed left-0 top-0 z-[99999999] h-screen w-full  select-none !overflow-x-hidden !overflow-y-hidden  bg-white shadow-sm  ${messageModal ? "animate-fadeIn" : "animate-fadeOut"
        }`}
      aria-modal="true"
      role="dialog"
    >
      <div className="max-w-lg mx-auto h-full text-center">
        <div className="flex justify-center py-2 px-3">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Message</h1>
          </div>
          <button onClick={() => {
            setMessageModal(false)
            setResult([])

          }}>
            <AiOutlineClose size={30} />
          </button>
        </div>
        <div className="border">
          <form className="flex space-x-2 justify-start items-center  py-3 mx-5" onSubmit={handleSubmit(searchUser)}>
            <h2 className="text-lg font-semibold">
              To :
            </h2>
            <div>
              <div className="flex w-full items-center justify-between rounded-md  px-3">
                <input
                  type="search"
                  placeholder="search user"
                  autoComplete="off"
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
          {result.map(user => (
            <div
              key={user.uid}
              className={`relative flex space-x-2 items-center  px-4 py-3 ${darkMode ? "bg-black text-white" : "bg-white text-black"
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
  )
}
