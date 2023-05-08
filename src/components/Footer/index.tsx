import { footerlists } from "@/data/footerLists";
import Link from "next/link";
import type { FC, ReactNode} from "react";


type Props = {
  children: ReactNode;
  classNames: string;
};

const Footer: FC<Partial<Props>> = ({ children, classNames }) => {
  return (
    <footer className="w-full px-5 ">
      <ul className={classNames}>
        {footerlists.map((list) => (
          <li
            title={list.name}
            key={list.name}
            className="cursor-pointer underline-offset-0 hover:underline hover:underline-offset-2"
          >
            <Link href={list.link} title={list.name} as={list.link}>
              {list.name}
            </Link>
          </li>
        ))}
      </ul>
      {children}
    </footer>
  );
}

export default Footer
