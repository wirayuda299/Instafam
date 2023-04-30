import { db } from "@/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getCsrfToken } from "next-auth/react";
import type { FieldValues, UseFormResetField } from "react-hook-form";
import toast from "react-hot-toast";

type Args = {
  data: FieldValues;
  resetField: UseFormResetField<FieldValues>;
};

export const searchUserByQuery = async (props: Args) => {
  const { data, resetField } = props;
  resetField("search");
  try {
    const token = await getCsrfToken();
    if (!token) {
      throw new Error("No CSRF token found");
    } else if (!data.search) {
      return toast.error("Please enter a name or username");
    } else {
      const q = query(
        collection(db, "users"),
        where("username", "==", data.search)
      );
      const res = await getDocs(q);
      const result = res.docs.map((doc) => doc.data());
      if (result.length === 0) {
        return toast.error("No user found");
      }
      return result ?? [];
    }
  } catch (error: any) {
    return new Error(error.message);
  }
};
