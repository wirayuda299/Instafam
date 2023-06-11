import "react-cropper-custom/dist/index.css";
import type { Dispatch, FC, SetStateAction } from "react";
import { Cropper } from "react-cropper-custom";

export type Area = {
  width: number;
  height: number;
  x: number;
  y: number;
};

type ImageCropperProps = {
  img: string;
  zoom: number;
  setZoom: Dispatch<SetStateAction<number>>;
  onCropComplete: (area: Area) => void;
  darkMode: boolean;
  handleClick: () => void;
};
const ImageCropper: FC<ImageCropperProps> = (props) => {
  const { img, zoom, setZoom, onCropComplete, darkMode, handleClick } = props;

  return (
    <div className="flex h-full  !w-full items-center justify-center">
      <div
        className={`flex w-full max-w-[500px] items-center justify-center rounded-md`}
      >
        <div className="relative h-full w-full ">
          <div className="wrapper relative flex max-w-lg items-center justify-center rounded-sm">
            <Cropper
              src={img || ""}
              zoom={zoom}
              aspect={1}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <button
            type="button"
            name="done"
            title="done"
            className={`mt-3 w-full  rounded-md py-2 text-center ${
              darkMode ? "bg-black text-white" : "bg-gray-200 text-black"
            }`}
            onClick={handleClick}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
export default ImageCropper;
