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
    title: "Classes",
    icon: CopyClipboard(),
    href: "/classes",
    color: "text-orange-500",
  },
  {
    title: "Sequences",
    icon: <Presentation size={16} />,
    href: "/sequences?type=template",
    color: "text-orange-500",
  },

  {
    title: "Evaluations",
    icon: CopyClipboard(),
    href: "/evaluations",
    color: "text-green-500",
  },
  {
    title: "Competences",
    icon: <BookmarkCheck size={16} />,
    href: "/competences",
    color: "text-sky-500",
  },

  {
    title: "Profile",
    icon: <User size={16} />,
    href: "/profile",
    color: "text-sky-500",
  },
];
