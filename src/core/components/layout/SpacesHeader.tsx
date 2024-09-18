"use client";
import { ModeToggle } from "../common/ModeToggle";
import { usePathname } from "next/navigation";
import Title from "@/core/components/common/Title";
import { cn } from "@/lib/utils";
import { useSpacesLayoutContext } from "./SpacesLayoutCtx";
import { SpacesMobileSidebar } from "./SpacesMobileSidebar";
export default function SpacesHeader() {
  const pathName = usePathname();
  const { spacesNavItems } = useSpacesLayoutContext();
  return (
    <header className="flex flex-row gap-4 border-b items-center justify-between border-b-slate-300 p-4">
      <div className={cn("block md:!hidden")}>
        <SpacesMobileSidebar navItems={spacesNavItems} />
      </div>
      {pathName === "/" ? null : <Title />}

      <div className="flex flex-row gap-4 items-center">
        <ModeToggle />
      </div>
    </header>
  );
}
