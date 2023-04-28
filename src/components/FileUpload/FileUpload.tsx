import { useDarkModeStore } from "@/stores/stores";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useStore } from "zustand";

type Props = {
  setPreviewUrl: (postImageModal: string) => void;
  img: string | undefined;
  setBlurhash: (blurhash: string) => void;
};

export default function FileUpload({ img, setPreviewUrl,setBlurhash }: Props) {
  const { darkMode } = useStore(useDarkModeStore);
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
                accept="image/*, .png, .jpg, .jpeg, .gif, .mp4, .mov, .webm"
                required
                className="hidden "
                onChange={async (e) => {
                  const { handleInputImage } = await import(
                    "@/helper/fileUpload"
                  );
                  const args = {
                    e,
                    setPreviewUrl,
                    setBlurhash,
                  };
                  await handleInputImage(args);
                }}
              />
            </label>
          </div>
        </div>
      ) : null}
    </>
  );
}
