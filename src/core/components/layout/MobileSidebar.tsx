import { SideNav } from '@/core/components/layout/SideNav';
import { Sheet, SheetContent, SheetTrigger } from '@/core/components/ui/sheet';
import { NavItem } from '@/lib/types';
import { useState, useEffect } from 'react';

import { ModeToggle } from '../common/ModeToggle';
import MenuIcon from '../icons/MenuIcon';

// eslint-disable-next-line no-unused-vars
export const MobileSidebar = (props: { navItems?: NavItem[] }) => {
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
        <SheetContent side="left" className="">
          <div className=" py-6 pt-16">
            <SideNav setOpen={setOpen} />
          </div>
          <section className="flex flex-col items-center ">
            <ModeToggle />
          </section>
        </SheetContent>
      </Sheet>
    </>
  );
};
