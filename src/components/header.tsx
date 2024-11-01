import { Globe2 } from "lucide-react";
import Link from "next/link";
import { NavbarDropdown } from "./navbar-dropdown";

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-10 flex h-14 items-center border-b-[1px] bg-white/50 px-4 backdrop-blur-lg lg:px-6">
      <Link className="flex items-center justify-center" href="/">
        <Globe2 className="h-6 w-6" />
        <span className="ml-2 text-2xl font-bold">NationsStat</span>
      </Link>
      <nav className="flex w-full items-end justify-end sm:hidden">
        <NavbarDropdown />
      </nav>
      <nav className="ml-auto hidden gap-4 sm:flex sm:gap-6">
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/"
        >
          Home
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/#features"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/#fun-fact"
        >
          Fun Fact
        </Link>
      </nav>
    </header>
  );
}
