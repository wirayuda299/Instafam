import { atom } from "recoil";

export const imagesState = atom({
  key: "imagesState",
  default: '',
});

export const croppedImageState = atom({
  key: "croppedImageState",
  default: '',
});
