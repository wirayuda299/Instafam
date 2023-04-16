import { Cropper, getCroppedImg } from "react-cropper-custom";
import "react-cropper-custom/dist/index.css";
import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import FileUpload from "../FileUpload/FileUpload";

export type Area = {
  width: number;
  height: number;
  x: number;
  y: number;
};

type Props = {
  setCroppedImg: Dispatch<SetStateAction<string>>;
  setImg: Dispatch<SetStateAction<string>>;
  img: string;
};

export default function ImageCropper({ setCroppedImg, img, setImg }: Props) {
  const [zoom, setZoom] = useState(1);

  async function onCropComplete(croppedArea: Area) {
    if (!img) return;
    try {
      const canvasSize = {
        width: 1200,
        height: 1200 * 1,
      };
      const image = await getCroppedImg(img, croppedArea, canvasSize);
      setCroppedImg(image);
      return;
    } catch (e: any) {
      console.error(e.message);
    }
  }
  return (
    <div className="h-full w-full">
      <FileUpload setPreviewUrl={setImg} img={img} />
      {img ? (
        <div className={`flex w-full items-center justify-center rounded-md`}>
          {img ? (
            <div className="relative h-full w-full ">
              <div className="wrapper relative flex h-full max-w-lg items-center justify-center rounded-sm">
                <Cropper
                  src={img}
                  zoom={zoom}
                  aspect={1}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
                <button
                  name="delete"
                  title="delete"
                  type="button"
                  className="absolute -right-3 -top-3 text-black dark:text-white"
                  onClick={() => setImg("")}
                >
                  <AiOutlineClose size={25} />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
