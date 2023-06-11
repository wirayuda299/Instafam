import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { IUser } from "@/types/user";
import { useDarkModeStore } from "@/stores/stores";
import { useStore } from "zustand";
import { useStateContext } from "@/stores/StateContext";
import type { FC } from "react";

interface ResultsProps {
  results: IUser[];
  handleDrawerToggler: () => void;
  customs?: string;
}

const Results: FC<ResultsProps> = (props) => {
  const { results, handleDrawerToggler, customs } = props;
  const { darkMode } = useStore(useDarkModeStore);
  const {
    state: { resultDrawer },
    Dispatch,
  } = useStateContext();
  if (!resultDrawer) return null;

  return (
    <>
      <div
        className={`result flex h-full w-full justify-center  px-5 ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        } transition-all md:px-0 ${results.length < 1 ? "hidden" : "block"} ${
          customs ? customs : ""
        }`}
      >
        <div
          className={`w-full ${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          {results?.length === 0 ? (
            <div className="flex items-center justify-center">
              <p className="text-sm font-semibold">No results found</p>
            </div>
          ) : (
            <>
              {results &&
                results?.map((result) => (
                  <div
                    className={`mb-3 flex w-full items-center justify-between border-b border-gray-500 border-opacity-50 py-2 pb-5 ${
                      darkMode ? "bg-black text-white" : "bg-white text-black"
                    }`}
                    key={result.uid}
                  >
                    <Link
                      href={`/profile/${result.username}`}
                      onClick={handleDrawerToggler}
                      className="flex items-center justify-center space-x-3"
                    >
                      <Image
                        src={result.image}
                        width={40}
                        height={40}
                        priority
                        className="h-10 w-10 rounded-full"
                        alt="profile"
                        placeholder="blur"
                        blurDataURL={
                          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAACAAMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpbiR1mYB2A46H2ooooEf/2Q=="
                        }
                      />
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold">
                          {result.username}
                          <span className="block text-xs">{result.name}</span>
                        </p>
                      </div>
                    </Link>
                    <button
                      type="button"
                      name="close"
                      title="close"
                      onClick={() =>
                        Dispatch({
                          type: "SET_RESULT",
                          payload: {
                            result: results.filter(
                              (user) => user.uid !== result.uid
                            ),
                          },
                        })
                      }
                    >
                      <AiOutlineClose size={20} />
                    </button>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Results;
