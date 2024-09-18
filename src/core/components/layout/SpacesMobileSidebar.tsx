import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/core/components/ui/sheet";
import MenuIcon from "../icons/MenuIcon";
import { NavItem } from "@/lib/types";
import { ModeToggle } from "../common/ModeToggle";
import { SpacesSideNav } from "./SpacesSideNav";

export const SpacesMobileSidebar = (props: { navItems?: NavItem[] }) => {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <div className="flex items-center justify-center gap-2">
            <MenuIcon />
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <div className="px-1 py-6 pt-16">
            <SpacesSideNav setOpen={setOpen} />
          </div>
          <section className="flex items-center justify-center">
            <ModeToggle />
          </section>
        </SheetContent>
      </Sheet>
    </>
  );
};
