"use client";
import React, { useMemo, useState } from "react";
import { SideNav } from "@/core/components/layout/SideNav";
import { NavItems } from "@/core/components/constants/side-nav";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/core/application/common/useSidebar";
import ArrowLeft from "../icons/ArrowLeft";
import { NavItem } from "@/lib/types";
import { User } from "lucide-react";
import { useSession } from "@clerk/nextjs";

export interface SidebarProps {
  className?: string;
  navItems?: NavItem[];
}

export default function Sidebar({ className, navItems }: SidebarProps) {
  const { isOpen, toggle } = useSidebar();
  const [status, setStatus] = useState(false);
  const { session } = useSession();

  const navItemsCopy = useMemo(() => {
    const tempCopy = navItems ? [...navItems] : [...NavItems];
    tempCopy.push({
      title: "My Space",
      icon: <User size={16} />,
      href: `/spaces?user=${session?.user.id}`,
      color: "text-orange-500",
    });
    return tempCopy;
  }, []);

  const handleToggle = () => {
    setStatus(true);
    toggle(!isOpen);
    setTimeout(() => setStatus(false), 500);
  };
  return (
    <nav
      className={cn(
        `relative hidden h-screen border-r pt-20 md:block`,
        status && "duration-500",
        isOpen ? "w-60" : "w-[78px]",
        className
      )}
    >
      <ArrowLeft
        className={cn(
          "absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
          !isOpen && "rotate-180"
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <SideNav className="text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100" />
          </div>
        </div>
      </div>
    </nav>
  );
}
