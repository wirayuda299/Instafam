import { IUserPostProps } from "@/types/post";
import { atom } from "recoil";

export const selectedPostState = atom({
  key: "selectedPostState",
  default: {} as IUserPostProps | null,
});
