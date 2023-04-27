import {
  useCroppedImgStore,
  useDarkModeStore,
  usePostCreateModalStore,
  usePostImageModalStore,
} from "@/stores/stores";
import { useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useStore } from "zustand";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Area } from "@/components/ImageCropper/ImageCropper";
import { getCroppedImg } from "react-cropper-custom";
const FileUpload = dynamic(() => import("@/components/FileUpload/FileUpload"), {
  ssr: false,
});
const Buttons = dynamic(() => import("@/components/Buttons/Buttons"), {
  ssr: false,
});
const ImageCropper = dynamic(
  () => import("@/components/ImageCropper/ImageCropper"),
  {
    ssr: false,
  }
);

export default function Cropper() {
  const { darkMode } = useStore(useDarkModeStore);
  const { postCreateModal, setPostCreateModal } = useStore(
    usePostCreateModalStore
  );
  const { postImageModal, setPostImageModal } = useStore(
    usePostImageModalStore
  );
  const [zoom, setZoom] = useState(1);
  const { setCroppedImg } = useStore(useCroppedImgStore);
  const router = useRouter();

  async function onCropComplete(croppedArea: Area) {
    if (!postImageModal) return;
    try {
      const canvasSize = {
        width: 1200,
        height: 1200 * 1,
      };
      const image = await getCroppedImg(
        postImageModal,
        croppedArea,
        canvasSize
      );
      setCroppedImg(image);
      return;
    } catch (e: any) {
      console.error(e.message);
    }
  }

  const handleClick = () => {
    setPostCreateModal(false);
    router.push("/create");
    setPostImageModal("");
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
      <Buttons
        className="absolute right-3 top-32 rounded-lg border-2  bg-white font-semibold text-black sm:top-3 "
        onClick={() => {
          setPostCreateModal(false);
          setPostImageModal("");
          setCroppedImg("");
        }}
      >
        <AiOutlineClose size={30} className="font-semibold" />
      </Buttons>
      <div className="mx-auto h-full max-w-lg sm:w-full ">
        {postImageModal ? (
          <ImageCropper
            darkMode={darkMode}
            handleClick={handleClick}
            img={postImageModal}
            onCropComplete={onCropComplete}
            setCroppedImg={setCroppedImg}
            setPostImageModal={setPostImageModal}
            setZoom={setZoom}
            zoom={zoom}
          />
        ) : (
          <div className="flex h-full  w-full items-center justify-center">
            <FileUpload
              img={postImageModal}
              setPreviewUrl={setPostImageModal}
            />
          </div>
        )}
      </div>
    </div>,
    document.getElementById("modal") as Element
  );
}
