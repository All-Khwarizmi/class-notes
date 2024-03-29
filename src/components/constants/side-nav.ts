import { type NavItem } from "@/types";
import CopyClipboard from "../icons/CopyClipboard";
import Dashboard from "../icons/Dashboard";

export const NavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: Dashboard(),
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    title: "Classes",
    icon: CopyClipboard(),
    href: "/classes",
    color: "text-orange-500",
  },
];
