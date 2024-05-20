import { type NavItem } from "@/lib/types";
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
    title: "Competences",
    icon: Dashboard(),
    href: "/competences",
    color: "text-sky-500",
  },
  {
    title: "Classes",
    icon: CopyClipboard(),
    href: "/classes",
    color: "text-orange-500",
  },
  {
    title: "Evaluations",
    icon: CopyClipboard(),
    href: "/evaluations",
    color: "text-green-500",
  },
];
