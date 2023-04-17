import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { DocumentData } from "firebase/firestore";
import { FiLoader } from "react-icons/fi";
import { IUser } from "@/types/user";
interface Props {
  results: IUser[];
  handleDrawerToggler: () => void;
  setResults: (result: IUser[]) => void;
  isPending: boolean;
  customs?: string;
}

export default function Results({
  results,
  handleDrawerToggler,
  setResults,
  customs,
  isPending,
}: Props) {
  return (
    <div
      className={`result flex h-full w-full justify-center bg-white px-5 text-black transition-all dark:bg-black dark:text-white md:px-0 ${
        results.length < 1 ? "hidden" : "block"
      } ${customs ? customs : ""}`}
    >
      <div className="w-full">
        {isPending && (
          <div role="status" className="flex items-center justify-center">
            <FiLoader size={25} />
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {results.map((result) => (
          <div
            className="mb-3 flex w-full justify-between border-b pb-5"
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
                setResults(results.filter((user) => user.uid !== result.uid))
              }
            >
              <AiOutlineClose size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
