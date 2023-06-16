import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import Logo from "../Logo/Logo";
import { useDrawerContext } from "@/stores/Drawer/DrawerStates";

const playfair = Playfair_Display({
  fallback: ["sans-serif"],
  subsets: ["latin"],
  preload: true,
  weight: "700",
  display: "swap",
});

const NavHeader = () => {
  const {
    drawerStates: { notificationDrawer, isSearchDrawerOpen },
  } = useDrawerContext();

  return (
    <header
      className={`hidden w-full flex-col pl-6 md:flex md:pl-2.5 ${playfair.className}`}
    >
      <Link
        href="/"
        className={`text-3xl font-semibold transition-transform lg:pt-5`}
      >
        {isSearchDrawerOpen || notificationDrawer ? (
          <Logo />
        ) : (
          <>
            <h1 className="hidden lg:block">Instafams</h1>
            <span className="block lg:hidden">
              <Logo />
            </span>
          </>
        )}
      </Link>
    </header>
  );
};
export default NavHeader;
