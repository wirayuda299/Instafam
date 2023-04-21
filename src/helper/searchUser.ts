import { getCsrfToken } from "next-auth/react";
import { FieldValues, UseFormResetField } from "react-hook-form";
import toast from "react-hot-toast";


type Args = {
  data: FieldValues;
  resetField:UseFormResetField<FieldValues>
}

export const onSubmit = async (props:Args) => {
  const { data, resetField } = props;
  resetField("search");
  try {
    const token = await getCsrfToken();
    if (!token) {
      throw new Error("No CSRF token found");
    }
    if (data.search === "") {
      toast.error("Please enter a username or name");
    }
    const response = await fetch(`api/search-user?search=${data.search}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const result = await response.json();
    if (result) return result
    if (result.length < 1) {
      toast.error("No user found");
    }
  } catch (error: any) {
    return new Error(error.message);
  }
};