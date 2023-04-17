import { useResultStore } from "@/stores/stores";
import { useTransition } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useStore } from "zustand";

export default function useSearchUser() {
  const { register, handleSubmit, resetField } = useForm();
  const { result, setResult } = useStore(useResultStore);
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: FieldValues) => {
    resetField("search");
    try {
      const response = await fetch(`api/search-user?search=${data.search}`, {
        method: "GET",
        referrerPolicy: "no-referrer",
        signal: new AbortController().signal,
        cache: "force-cache",
      });
      const result = await response.json();
      if (result) {
        startTransition(() => {
          setResult(result);
        });
      }
    } catch (error: any) {
      toast.error(error.message);
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
