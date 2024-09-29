import { Sheet, SheetContent, SheetTrigger } from '@/core/components/ui/sheet';
import { NavItem } from '@/lib/types';
import { useState, useEffect } from 'react';

import { ModeToggle } from '../common/ModeToggle';
import Title from '../common/Title';
import { GoBackButton } from '../common/navigation/GoBackButton';
import MenuIcon from '../icons/MenuIcon';
import { SpacesSideNav } from './SpacesSideNav';

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
          <div className="flex items-center  gap-2">
            <MenuIcon />
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <div className=" py-6 pt-16">
            <SpacesSideNav setOpen={setOpen} />
          </div>
          {/* <section className="flex items-center justify-center">
            <ModeToggle />
          </section> */}
          <section className="flex flex-col items-center justify-center">
            <SpacesMobileSidebarNavigation />

            <ModeToggle />
          </section>
        </SheetContent>
      </Sheet>
    </>
  );
};

export function SpacesMobileSidebarNavigation() {
  return (
    <div className="flex  ">
      <GoBackButton />
    </div>
  );
}
