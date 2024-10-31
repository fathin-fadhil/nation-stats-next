import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

export function NavbarDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu className="h-6 w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left" align="start">
        <DropdownMenuItem className="p-0">
          <Link
            className="w-full p-2 text-sm font-medium underline-offset-4 hover:underline"
            href="/#features"
          >
            Features
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0">
          <Link
            className="w-full p-2 text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            About
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0">
          <Link
            className="w-full p-2 text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Contact
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
