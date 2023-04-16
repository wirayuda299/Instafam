import { AiOutlineCloudUpload } from "react-icons/ai";

type Props = {
  setPreviewUrl: React.Dispatch<React.SetStateAction<string>>;
  img: string | undefined;
};

export default function FileUpload({ img, setPreviewUrl }: Props) {
  return (
    <div
      className={` w-full items-center justify-center sm:min-w-[500px] ${
        img === "" ? "flex" : "hidden"
      }`}
    >
      <div className="mx-auto flex w-full max-w-xl justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex h-80 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-gray-300  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
            accept="video/*,image/*, .png, .jpg, .jpeg, .gif, .mp4, .mov, .webm"
            required
            className="hidden "
            onChange={async (e) => {
              const { handleInputImage } = await import("@/helper/fileUpload");
              const args = {
                e,
                setPreviewUrl,
                img,
              };
              await handleInputImage(args);
            }}
          />
        </label>
      </div>
    </div>
  );
}
