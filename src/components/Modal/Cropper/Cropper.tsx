import { useDarkModeStore } from "@/stores/stores";
import { type FC, useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useStore } from "zustand";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import type { Area } from "@/components/ImageCropper/ImageCropper";
import { getCroppedImg } from "react-cropper-custom";
import { useStateContext } from "@/stores/StateContext";
const FileUpload = dynamic(() => import("@/components/FileUpload/FileUpload"), {
  ssr: false,
});

const ImageCropper = dynamic(
  () => import("@/components/ImageCropper/ImageCropper"),
  {
    ssr: false,
  }
);

const Cropper: FC = () => {
  const { darkMode } = useStore(useDarkModeStore);
  const {
    Dispatch,
    state: { postCreateModal, previewUrl },
  } = useStateContext();
  const [zoom, setZoom] = useState(1);
  const router = useRouter();

  async function onCropComplete(croppedArea: Area) {
    if (!previewUrl) return;
    try {
      const canvasSize = {
        width: 1200,
        height: 1200 * 1,
      };
      const image = await getCroppedImg(previewUrl, croppedArea, canvasSize);
      Dispatch({
        type: "SET_CROPPED_IMAGE",
        payload: {
          croppedImage: image,
        },
      });
      return;
    } catch (e: any) {
      console.error(e.message);
    }
  }

  const handleClick = () => {
    Dispatch({
      type: "TOGGLE_POST_CREATE_MODAL",
      payload: {
        postCreateModal: false,
      },
    });
    router.push("/create");
    Dispatch({
      type: "SET_PREVIEW_URL",
      payload: {
        previewUrl: "",
      },
    });
  };

  if (!postCreateModal) return null;

  return createPortal(
    <div
      className={` ${
        darkMode ? " text-white" : " text-black"
      } fixed left-0 top-0  z-50 h-screen w-full select-none !overflow-hidden bg-black  bg-opacity-50 shadow-sm `}
      aria-modal="true"
      role="dialog"
    >
      <button
        className="absolute right-3 top-32 rounded-lg border-2  bg-white font-semibold text-black sm:top-3 "
        onClick={() => {
          Dispatch({
            type: "TOGGLE_POST_CREATE_MODAL",
            payload: {
              postCreateModal: false,
            },
          });
          Dispatch({
            type: "SET_PREVIEW_URL",
            payload: {
              previewUrl: "",
            },
          });
          Dispatch({
            type: "SET_CROPPED_IMAGE",
            payload: {
              croppedImage: "",
            },
          });
        }}
      >
        <AiOutlineClose size={30} className="font-semibold" />
      </button>
      <div className="mx-auto h-full max-w-lg sm:w-full ">
        {previewUrl ? (
          <ImageCropper
            darkMode={darkMode}
            handleClick={handleClick}
            img={previewUrl}
            onCropComplete={onCropComplete}
            setZoom={setZoom}
            zoom={zoom}
          />
        ) : (
          <div className="flex h-full  w-full items-center justify-center">
            <FileUpload img={previewUrl} />
          </div>
        )}
      </div>
    </div>,
    document.getElementById("modal") as Element
  );
};
export default Cropper;
