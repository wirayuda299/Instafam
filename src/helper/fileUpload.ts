import { ChangeEvent } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

const imageInputSchema = z.object({
  setPreviewUrl: z.function().args(z.any()).returns(z.any()),
  img: z.string(),
});

type Params = {
  e: ChangeEvent<HTMLInputElement>;
  setPreviewUrl: (postImageModal: string) => void;
  img: string | undefined;
};
type UploadFile = ({ e, img, setPreviewUrl }: Params) => Promise<void>;
type FilterImage = (file: File | Blob | undefined) => Promise<any>;

const filterImage: FilterImage = async (file) => {
  try {
    const data = new FormData();
    if (!file) return;
    data.append("image", file, file.name);

    const options = {
      method: "POST",
      headers: {
        "X-RapidAPI-Key": process.env.X_RapidAPI_KEY as string,
        "X-RapidAPI-Host": process.env.X_RapidAPI_HOST as string,
      },
      body: data,
    };
    const getResult = await fetch(
      "https://nsfw-images-detection-and-classification.p.rapidapi.com/adult-content-file",
      options
    );
    const result = await getResult.json();
    return result;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const handleInputImage: UploadFile = async (args) => {
  const { e, img, setPreviewUrl } = args;
  try {
    const isValid = imageInputSchema.parse({ setPreviewUrl, img });
    if (!isValid)
      throw new Error(
        "Invalid data passed to ImageInput, please pass valid data such as string for image and function for setPreviewUrl"
      );
    let selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    const result = await filterImage(selectedFile);

    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target) {
        if (result.unsafe) {
          toast.error(
            "Your uploaded file is contain NSFW content, please upload file that safe for everyone"
          );
          return;
        }
        return setPreviewUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(selectedFile);
  } catch (error: any) {
    console.log(error.message);
  }
};
