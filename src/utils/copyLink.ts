import { toast } from "react-hot-toast";
import { z } from "zod";
const urlSchema = z.string().url();

type CopyLink = (url: string) => void;

export const copyLink: CopyLink = (url) => {
  try {
    const isValid = urlSchema.parse(url);
    if (!isValid) throw new Error("Invalid url");
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Link copied to clipboard");
      })
      .catch((err) => {
        console.error(`Error copying ${url} to clipboard: ${err}`);
      });
  } catch (error: any) {
    console.log(error.message);
  }
};
