import { toast } from "react-hot-toast";

type CopyLink = (url: string) => void;
export const copyLink: CopyLink = (url) => {
  try {
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
