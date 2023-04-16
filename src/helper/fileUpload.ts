import { ChangeEvent } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

const imageInputSchema = z.object({
  setPreviewUrl: z.function().args(z.any()).returns(z.any()),
  img: z.string(),
});

type Params = {
  e: ChangeEvent<HTMLInputElement>
  setPreviewUrl: React.Dispatch<React.SetStateAction<string>>
  img: string | undefined
}
type UploadFile = ({e,img, setPreviewUrl}:Params) => Promise<void>

export const handleInputImage:UploadFile = async (args) => {
  const {e, img, setPreviewUrl} = args
  try {
    const isValid = imageInputSchema.parse({ setPreviewUrl, img });
    if (!isValid)
      throw new Error(
        "Invalid data passed to ImageInput, please pass valid data such as string for image and function for setPreviewUrl"
      );
    let selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    const data = new FormData();
    data.append("image", selectedFile, selectedFile.name);

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
    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target) {
        if (await result.unsafe) {
          toast.error(
            "Your uploaded image is contains adult content, please upload an image that does not contain adult content for the safety of our users."
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