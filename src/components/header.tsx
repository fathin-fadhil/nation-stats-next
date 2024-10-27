import { Globe2 } from "lucide-react";

export function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-10 flex h-14 items-center border-b-[1px] bg-white/50 px-4 backdrop-blur-lg lg:px-6">
      <a className="flex items-center justify-center" href="#">
        <Globe2 className="h-6 w-6" />
        <span className="ml-2 text-2xl font-bold">NationStats</span>
      </a>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <a
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="#"
        >
          Features
        </a>
        <a
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="#"
        >
          About
        </a>
        <a
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="#"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
