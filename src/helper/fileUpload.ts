import { ChangeEvent } from "react";
import toast from "react-hot-toast";
import { encode } from "blurhash";

type Params = {
  e: ChangeEvent<HTMLInputElement>;
  setPreviewUrl: (postImageModal: string) => void;
  setBlurhash: (blurhash: string) => void;
}
type UploadFile = ({ e, setPreviewUrl }: Params) => Promise<void>;
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


const loadImage = async (src: any) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src;
  });

const getImageData = (image: any) => {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d");
  context?.drawImage(image, 0, 0);
  return context?.getImageData(0, 0, image.width, image.height);
};

const encodeImageToBlurhash = async (imageUrl: any) => {
  const image = await loadImage(imageUrl);
  const imageData = getImageData(image);
  if (!imageData) return;
  return encode(imageData?.data, imageData?.width, imageData?.height, 4, 4);
};

export const handleInputImage: UploadFile = async (args) => {
  const { e, setPreviewUrl, setBlurhash } = args;
  try {
    let selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    const result = await filterImage(selectedFile);
    if (result?.unsafe) {
      toast.error("Image is not allowed");
      return;
    }
    const data = await loadImage(URL.createObjectURL(selectedFile));
    const imageData = getImageData(data);
    if (!imageData) return;
    
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target) {
        const blurhash = await encodeImageToBlurhash(event.target.result);
        if (!blurhash) return;
        setBlurhash(blurhash);
        return setPreviewUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(selectedFile);
  } catch (error: any) {
    console.log(error.message);
  }
};
