import { useResultStore } from "@/stores/stores";
import { useTransition } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useStore } from "zustand";

export default function useSearchUser() {
  const { register, handleSubmit, resetField } = useForm();
  const {  setResult } = useStore(useResultStore);
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: FieldValues) => {
    resetField("search");
    try {
      if(data.search === ""){
        toast.error("Please enter a username or name");
      }
      const response = await fetch(`api/search-user?search=${data.search}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",    
      },
      );
      const result = await response.json();
      if (result) {
        startTransition(() => {
          setResult(result);
        });
      }
      if (result.length < 1) {
        toast.error("No user found");
      }
    } catch (error: any) {
      return new Error(error.message);
    }
  };
  return {
    register,
    handleSubmit,
    onSubmit,
    setResult,
    resetField,
    isPending,
  };
}
