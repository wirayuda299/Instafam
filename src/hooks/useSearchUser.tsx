import { resultsState } from "@/store/results";
import { useTransition } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";

export default function useSearchUser() {
  const { register, handleSubmit, resetField } = useForm();
  const [results, setResults] = useRecoilState(resultsState);
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: FieldValues) => {
    resetField("search");
    try {
      const response = await fetch(`api/search-user?search=${data.search}`, {
        method: "GET",
        referrerPolicy: "no-referrer",
        signal: new AbortController().signal,
        cache: "no-cache",
      });
      const result = await response.json();
      if (result) {
        startTransition(() => {
          setResults(result);
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
    setResults,
    resetField,
    isPending,
  };
}
