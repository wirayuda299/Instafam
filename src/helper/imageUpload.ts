import { ActionsType } from "@/types/ActionsTypes";
import { encode } from "blurhash";
import type { ChangeEvent, Dispatch } from "react";
import toast from "react-hot-toast";

type FilterResults = {
  objects: any[];
  unsafe: boolean;
};

export const loadImage = async <T>(src: T) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src as string;
  });

export const getImageData = (image: HTMLImageElement) => {
  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  canvas.width = image.width as number;
  canvas.height = image.height as number;
  const context = canvas.getContext("2d");
  context?.drawImage(image, 0, 0);
  return context?.getImageData(0, 0, image.width, image.height);
};

export const encodeImageToBlurhash = async <T>(imageUrl: T) => {
  const image = (await loadImage(imageUrl)) as HTMLImageElement;
  const imageData = getImageData(image);
  if (!imageData) return;
  return encode(imageData?.data, imageData?.width, imageData?.height, 4, 4);
};

export const filterImage = async (file: File) => {
  try {
    toast.loading("Checking image...");
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
    const result = (await getResult.json()) as FilterResults;

    return result;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const handleInputImage = async (
  e: ChangeEvent<HTMLInputElement>,
  Dispatch: Dispatch<ActionsType>
) => {
  try {
    let selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const result = await filterImage(selectedFile);

    if (result?.unsafe) {
      toast.dismiss();
      toast.error("Image is not allowed");
      return;
    }
    const data = (await loadImage(
      URL.createObjectURL(selectedFile)
    )) as HTMLImageElement;

    const imageData = getImageData(data);

    if (!imageData) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target) {
        toast.dismiss();
        const blurhash = await encodeImageToBlurhash(event.target.result);

        if (!blurhash) return;

        Dispatch({
          type: "SET_BLUR_HASH",
          payload: {
            blurhash: blurhash,
          },
        });
        Dispatch({
          type: "SET_PREVIEW_URL",
          payload: {
            previewUrl: event.target.result as string,
          },
        });
      }
    };
    reader.readAsDataURL(selectedFile);
  } catch (error: any) {
    console.log(error.message);
  }
};
