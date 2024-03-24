import { type NavItem } from "@/types";
import CopyClipboard from "../icons/CopyClipboard";
import Dashboard from "../icons/Dashboard";

export const NavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: Dashboard(),
    href: "/classes",
    color: "text-sky-500",
  },
  {
    title: "Classes",
    icon: CopyClipboard(),
    href: "/classes",
    color: "text-orange-500",
    isChidren: true,
    children: [
      {
        title: "Example-01",
        icon: CopyClipboard(),
        color: "text-red-500",
        href: "/example/employees",
      },
    ],
  },
];
