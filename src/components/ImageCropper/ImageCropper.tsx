import { Cropper } from "react-cropper-custom";
import "react-cropper-custom/dist/index.css";
import type { Dispatch, FC, SetStateAction } from "react";

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
  handleClick: () => void;
};
const ImageCropper: FC<ImageCropperProps> = (props) => {
  const { img, zoom, setZoom, onCropComplete, handleClick } = props;

  return (
    <div className="flex h-full  !w-full items-center justify-center">
      <div className="flex w-full max-w-[500px] items-center justify-center rounded-md">
        <div className="relative h-full w-full">
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
            className="mt-3 w-full  rounded-md bg-gray-200 py-2 text-center text-black dark:bg-black dark:text-white"
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
