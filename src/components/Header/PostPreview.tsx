import { useDarkModeStore } from "@/stores/stores";
import { IUserPostProps } from "@/types/post";
import { useStore } from "zustand";
import Postheader from "../Header/PostHeader";

type Props = {
  post: IUserPostProps;
  children: any;
};
export default function PreviewHeader(props: Props) {
  const { post, children } = props;
  const { darkMode } = useStore(useDarkModeStore);
  return (
    <div
      className={`absolute -top-0 flex w-full !overflow-x-hidden border-b border-gray-500 border-opacity-50 px-2 py-3 transition-all duration-300  ${darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
    >
      <div className="flex flex-1 items-start space-x-2 ">
        <Postheader post={post} />
      </div>
      {children}
    </div>
  );
}
