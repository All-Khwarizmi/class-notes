"use client";
import { ModeToggle } from "../common/ModeToggle";
import { usePathname } from "next/navigation";
import Title from "@/core/components/common/Title";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./MobileSidebar";
import { useLayoutContext } from "./ExperimentalLayoutCtx";

export default function Header() {
  const pathName = usePathname();
  const { navItems } = useLayoutContext();

  return (
    <header
      className={cn(
        "flex flex-row gap-4 border-b items-center justify-between border-b-slate-300 p-4",
        " md:!hidden"
      )}
    >
      <div className={cn("block md:!hidden")}>
        <MobileSidebar navItems={navItems} />
      </div>
      {pathName === "/" ? null : <Title />}
    </header>
  );
}
