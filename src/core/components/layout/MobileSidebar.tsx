import { useState, useEffect, useMemo } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/core/components/ui/sheet";
import { SideNav } from "@/core/components/layout/SideNav";
import { NavItems } from "@/core/components/constants/side-nav";
import MenuIcon from "../icons/MenuIcon";
import { NavItem } from "@/lib/types";
import { useSession } from "@clerk/nextjs";
import { Space, User } from "lucide-react";

export const MobileSidebar = (props: { navItems?: NavItem[] }) => {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { session } = useSession();
  const navItemsCopy = useMemo(() => {
    const tempCopy = props.navItems ? [...props.navItems] : [...NavItems];
    tempCopy.push({
      title: "My Space",
      icon: <User size={16} />,
      href: `/spaces?user=${session?.user.id}`,
      color: "text-orange-500",
    });
    return tempCopy;
  }, []);

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
            <SideNav items={navItemsCopy} setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
