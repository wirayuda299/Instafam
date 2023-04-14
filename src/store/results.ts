import { atom } from "recoil";
import { DocumentData } from "firebase/firestore";
type Results = DocumentData[];
export const resultsState = atom({
  key: "resultsState",
  default: [] as Results,
});
