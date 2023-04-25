import { AiOutlineClose } from "react-icons/ai"
import Buttons from "../Buttons/Buttons"
import { Dispatch, SetStateAction } from "react"
import { Cropper } from "react-cropper-custom";
import "react-cropper-custom/dist/index.css";

export type Area = {
  width: number;
  height: number;
  x: number;
  y: number;
};

type Props = {
  img: string
  zoom: number
  setZoom: Dispatch<SetStateAction<number>>
  onCropComplete: (area: Area) => void
  darkMode: boolean
  setPostImageModal: (postImageModal: string) => void
  setCroppedImg: (croppedImg: string) => void
  handleClick: () => void
}
export default function ImageCropper(props: Props) {
  const { img, zoom, setZoom, onCropComplete, darkMode, setPostImageModal, setCroppedImg, handleClick } = props
  return (
    <div className="!w-full flex  justify-center items-center h-full">
      <div className={`flex w-full items-center justify-center rounded-md max-w-[500px]`}>
        <div className="relative h-full w-full ">
          <div className="wrapper relative flex max-w-lg items-center justify-center rounded-sm">
            <Cropper
              src={img || ""}
              zoom={zoom}
              aspect={1}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <Buttons
              name="delete"
              title="delete"
              type="button"
              className={`absolute border-2 rounded-md -right-3 -top-3  ${darkMode ? "bg-white text-black" : "bg-black text-white"}`}
              onClick={() => {
                setPostImageModal("")
                setCroppedImg("")
              }}
            >
              <AiOutlineClose size={25} />
            </Buttons>
          </div>
          <Buttons
            className={`text-center w-full  py-2 rounded-md mt-3 ${darkMode ? "text-white bg-black" : "bg-gray-200 text-black"}`}
            onClick={handleClick}>
            Done
          </Buttons>
        </div>
      </div>
    </div>
  )
}
