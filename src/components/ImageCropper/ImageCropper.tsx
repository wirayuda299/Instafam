import "react-cropper-custom/dist/index.css";
import { AiOutlineClose } from "react-icons/ai";
import { Dispatch, SetStateAction } from "react";
import { Cropper } from "react-cropper-custom";
import { useStateContext } from "@/stores/StateContext";

export type Area = {
  width: number;
  height: number;
  x: number;
  y: number;
};

type Props = {
  img: string;
  zoom: number;
  setZoom: Dispatch<SetStateAction<number>>;
  onCropComplete: (area: Area) => void;
  darkMode: boolean;
  handleClick: () => void;
};
export default function ImageCropper(props: Props) {
  const {
    img,
    zoom,
    setZoom,
    onCropComplete,
    darkMode,
    handleClick,
  } = props;
  const {  Dispatch } = useStateContext()

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
            <button
              name="delete"
              title="delete"
              type="button"
              className={`absolute -right-3 -top-3 rounded-md border-2  ${darkMode ? "bg-white text-black" : "bg-black text-white"
                }`}
              onClick={() => {
                Dispatch({
                  type: 'SET_CROPPED_IMAGE',
                  payload: {
                    croppedImage: ''
                  }
                })
              }}
            >
              <AiOutlineClose size={25} />
            </button>
          </div>
          <button
            className={`mt-3 w-full  rounded-md py-2 text-center ${darkMode ? "bg-black text-white" : "bg-gray-200 text-black"
              }`}
            onClick={handleClick}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
