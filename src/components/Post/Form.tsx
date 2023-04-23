import { useDarkModeStore } from "@/stores/stores";
import { useStore } from "zustand";
import Buttons from "../Buttons/Buttons";

type Props = {
  defaultValues: {
    captions: string;
  };
  updatePost: (data: any) => void;
  register: any;
  handleSubmit: any;
};
export default function PostForm(props: Props) {
  const { defaultValues, updatePost, register, handleSubmit } = props;
  const { darkMode } = useStore(useDarkModeStore);
  return (
    <form className="flex w-full p-3" onSubmit={handleSubmit(updatePost)}>
      <input
        type="text"
        className={`w-full rounded-lg bg-[#a8a8a817] px-3 py-2 ${
          darkMode ? "text-white" : "text-black"
        }`}
        placeholder="Edit post"
        spellCheck="false"
        role="search"
        defaultValue={defaultValues.captions}
        {...register("updated", { required: true })}
      />
      <Buttons
        className={`p-2 ${darkMode ? " text-white" : " text-black"}`}
        type="submit"
        name="update"
        title="update"
        onClick={() => handleSubmit(updatePost)}
      >
        <span>Update</span>
      </Buttons>
    </form>
  );
}
