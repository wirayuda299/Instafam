import { useDarkModeStore } from "@/stores/stores";
import { useStore } from "zustand";
import type { FC } from "react";
import type { UseFormHandleSubmit, FieldValues } from "react-hook-form";

type PostFormProps = {
  defaultValues: {
    captions: string;
  };
  updatePost: (data: any) => void;
  register: any;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
};

const PostForm: FC<PostFormProps> = (props) => {
  const { defaultValues, updatePost, register, handleSubmit } = props;
  const { darkMode } = useStore(useDarkModeStore);
  return (
    <form className="flex w-full p-3" onSubmit={handleSubmit(updatePost)}>
      <input
        type="text"
        className={`w-full rounded-lg bg-[#a8a8a817] px-3 py-2 ${
          !darkMode ? "text-black" : "text-white"
        }`}
        placeholder="Edit post"
        spellCheck="false"
        role="search"
        defaultValue={defaultValues.captions}
        {...register("updated", { required: true })}
      />
      <button
        className={`p-2 ${!darkMode ? "text-black" : "text-white"}`}
        type="submit"
        name="update"
        title="update"
        onClick={() => handleSubmit(updatePost)}
      >
        <span>Update</span>
      </button>
    </form>
  );
};
export default PostForm;
