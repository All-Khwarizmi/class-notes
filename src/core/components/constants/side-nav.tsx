import { type NavItem } from "@/lib/types";
import CopyClipboard from "../icons/CopyClipboard";
import Dashboard from "../icons/Dashboard";
import { User, BookmarkCheck, Presentation } from "lucide-react";
export const NavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: Dashboard(),
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    title: "Profile",
    icon: <User size={24} />,
    href: "/profile",
    color: "text-sky-500",
  },
  {
    title: "Competences",
    icon: <BookmarkCheck size={24} />,
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
    title: "Cours",
    icon: <Presentation size={24} />,
    href: "/cours",
    color: "text-orange-500",
  },
  {
    title: "Evaluations",
    icon: CopyClipboard(),
    href: "/evaluations",
    color: "text-green-500",
  },
];
