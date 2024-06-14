"use client";
import { ModeToggle } from "../common/ModeToggle";
import { usePathname } from "next/navigation";
import Title from "@/core/components/common/Title";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./MobileSidebar";
import { NavItem } from "@/lib/types";

export default function SpacesHeader(props: { navItems?: NavItem[] }) {
  const pathName = usePathname();

  return (
    <header className="flex flex-row gap-4 border-b items-center justify-between border-b-slate-300 p-4">
      <div className={cn("block md:!hidden")}>
        <MobileSidebar navItems={props.navItems} />
      </div>
      {pathName === "/" ? null : <Title />}

      <div className="flex flex-row gap-4 items-center">
        <ModeToggle />
      </div>
    </header>
  );
}
