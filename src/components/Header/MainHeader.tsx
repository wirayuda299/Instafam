import dynamic from "next/dynamic";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
const Form = dynamic(() => import("../Search/Form"), {
  ssr: false,
});
import { GiExitDoor } from "react-icons/gi";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  fallback: ["sans-serif"],
  subsets: ["latin"],
  preload: true,
  weight: "700",
  display: "swap",
  adjustFontFallback: true,
});
export default function Header() {
  return (
    <header className="relative w-full border-b border-gray-500 border-opacity-50 bg-white px-5 dark:bg-black dark:text-white md:hidden">
      <div className="flex w-full items-center justify-between space-x-2">
        <div className="w-full">
          <Link
            href="/"
            className={`text-xl md:text-2xl ${playfair.className}`}
          >
            <h1>Instafams</h1>
          </Link>
        </div>
        <Form height="h-min">
          <button type="submit" name="Search" title="search">
            <AiOutlineSearch size={20} />
          </button>
        </Form>
        <button
          name="sign out"
          type="button"
          title="sign out"
          onClick={async () => {
            const { signOut } = await import("next-auth/react");
            signOut({
              callbackUrl: `${process.env.NEXTAUTH_URL}/auth/signin`,
              redirect: true,
            });
          }}
        >
          <GiExitDoor size={28} />
        </button>
      </div>
    </header>
  );
}
