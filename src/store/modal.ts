import { atom} from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false
});

export const reportModal = atom({
  key: "reportModal",
  default: false,
})