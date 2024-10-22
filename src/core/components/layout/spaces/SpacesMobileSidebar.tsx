'use client';

import { ModeToggle } from '@/core/components/common/ModeToggle';
import { GoBackButton } from '@/core/components/common/navigation/GoBackButton';
import { Sheet, SheetContent, SheetTrigger } from '@/core/components/ui/sheet';
import { NavItem } from '@/lib/types';
import { MenuIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import { SpacesSideNav } from './SpacesSideNav';

interface SpacesMobileSidebarProps {
  navItems?: NavItem[];
}

export const SpacesMobileSidebar: React.FC<SpacesMobileSidebarProps> = () => {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 p-2 rounded-md hover:bg-accent">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <div className="flex flex-col h-full">
          <div className="flex-grow py-6 pt-16 overflow-y-auto">
            <SpacesSideNav setOpen={setOpen} />
          </div>
          <div className="flex  items-center justify-center gap-4 p-4 border-t">
            <ModeToggle />
            <GoBackButton />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
