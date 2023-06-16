import { useDarkModeStore } from "@/stores/stores";
import { useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useStore } from "zustand";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import type { Area } from "@/components/ImageCropper/ImageCropper";
import { getCroppedImg } from "react-cropper-custom";
import { useStateContext } from "@/stores/Global/StateContext";
import { useModalContext } from "@/stores/Modal/ModalStatesContext";
const FileUpload = dynamic(() => import("@/components/FileUpload/FileUpload"), {
  ssr: false,
});

const ImageCropper = dynamic(
  () => import("@/components/ImageCropper/ImageCropper"),
  {
    ssr: false,
  }
);

const Cropper = () => {
  const { darkMode } = useStore(useDarkModeStore);
  const {
    modalStates: { postCreateModal },
    modalDispatch,
  } = useModalContext();
  const {
    state: { previewUrl },
    Dispatch,
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
    modalDispatch({
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
      } fixed left-0 top-0 z-50 h-screen w-full select-none !overflow-hidden bg-black bg-opacity-50  shadow-sm backdrop-blur-sm`}
      aria-modal="true"
      role="dialog"
    >
      <button
        className="absolute right-0 top-28 z-10 rounded-lg font-semibold  text-white sm:right-3 sm:top-5 "
        onClick={() => {
          modalDispatch({
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
          <FileUpload />
        )}
      </div>
    </div>,
    document.getElementById("modal") as Element
  );
};
export default Cropper;
