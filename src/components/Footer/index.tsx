import Link from "next/link";
type FooterProps = {
  name: string;
  link: string;
};

type Props = {
  children?: React.ReactNode;
  classNames?: string;
};

export default function Footer({ children, classNames }: Props) {
  const footerlists: FooterProps[] = [
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Help",
      link: "/help",
    },
    {
      name: "Api",
      link: "/api",
    },
    {
      name: "Privacy",
      link: "/privacy",
    },
    {
      name: "Terms",
      link: "/terms",
    },
    {
      name: "Locations",
      link: "/locations",
    },
    {
      name: "Language",
      link: "/language",
    },
    {
      name: "Instafam Verified",
      link: "/verfied-instafam",
    },
  ];
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
