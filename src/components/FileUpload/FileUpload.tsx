import { AiOutlineCloudUpload } from "react-icons/ai";

import { useStateContext } from "@/stores/Global/StateContext";
import { handleInputImage } from "@/helper/imageUpload";

const FileUpload = () => {
  const { Dispatch } = useStateContext();

  return (
    <div className="flex h-full  w-full items-center justify-center">
      <div className={`flex w-full max-w-[500px] items-center justify-center `}>
        <div className="mx-auto flex w-full max-w-xl justify-center">
          <label
            htmlFor="dropzone-file"
            className="flex h-80 w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-200 shadow-2xl dark:border dark:border-gray-500 dark:border-opacity-30 dark:bg-black  dark:bg-opacity-95 "
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
              accept="image/*, .png, .jpg, .jpeg, .gif"
              required
              className="hidden "
              onChange={(e) => handleInputImage(e, Dispatch)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
