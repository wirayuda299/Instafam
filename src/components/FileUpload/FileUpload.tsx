import { useDarkModeStore } from "@/stores/stores";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useStore } from "zustand";
import type { ChangeEvent, FC } from "react";
import toast from "react-hot-toast";
import { encode } from "blurhash";
import { useStateContext } from "@/stores/StateContext";

type FilterResults = {
  objects: any[];
  unsafe: boolean;
};
const FileUpload: FC<{ img: string | undefined }> = ({ img }) => {
  const { darkMode } = useStore(useDarkModeStore);
  const { Dispatch } = useStateContext();

  const loadImage = async <T,>(src: T) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (...args) => reject(args);
      img.src = src as string;
    });

  const getImageData = (image: HTMLImageElement) => {
    const canvas = document.createElement("canvas") as HTMLCanvasElement;
    canvas.width = image.width as number;
    canvas.height = image.height as number;
    const context = canvas.getContext("2d");
    context?.drawImage(image, 0, 0);
    return context?.getImageData(0, 0, image.width, image.height);
  };

  const encodeImageToBlurhash = async <T,>(imageUrl: T) => {
    const image = (await loadImage(imageUrl)) as HTMLImageElement;
    const imageData = getImageData(image);
    if (!imageData) return;
    return encode(imageData?.data, imageData?.width, imageData?.height, 4, 4);
  };
  const filterImage = async (file: File) => {
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

  const handleInputImage = async (e: ChangeEvent<HTMLInputElement>) => {
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

  return (
    <>
      {!img ? (
        <div
          className={`flex w-full max-w-[500px] items-center justify-center `}
        >
          <div className="mx-auto flex w-full max-w-xl justify-center">
            <label
              htmlFor="dropzone-file"
              className={`flex h-80 w-full cursor-pointer flex-col items-center justify-center rounded-lg  shadow-2xl ${
                darkMode
                  ? "border border-gray-500 border-opacity-30 bg-black bg-opacity-95"
                  : "bg-gray-200"
              }`}
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <AiOutlineCloudUpload className="h-12 w-12 text-gray-400" />
                <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="block text-center font-semibold">
                    Click to upload
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG or any image extensions.
                  </p>
                </div>
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept="image/*, .png, .jpg, .jpeg, .gif"
                required
                className="hidden "
                onChange={(e) => handleInputImage(e)}
              />
            </label>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FileUpload;
