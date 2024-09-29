'use client';

import {
  useSidebar,
  useSidebarPreference,
} from '@/core/application/common/useSidebar';
import { SideNav } from '@/core/components/layout/SideNav';
import { NavItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

import { ModeToggle } from '../common/ModeToggle';
import Title from '../common/Title';
import ArrowLeft from '../icons/ArrowLeft';

export type SidebarProps = {
  navItems?: NavItem[];
};

export default function Sidebar() {
  const { isOpen, toggle } = useSidebar();
  const [status, setStatus] = useState(false);
  const { get, set } = useSidebarPreference();

  useEffect(() => {
    toggle(get());
  }, []);

  const handleToggle = () => {
    setStatus(false);
    toggle(!isOpen);
    set(!isOpen ? 'true' : 'false');
    setTimeout(() => setStatus(false), 500);
  };

  return (
    <nav
      className={cn(
        `relative hidden h-screen border-r pt-10 md:block overflow-scroll`,
        status && 'duration-500',
        isOpen ? 'w-60' : 'w-[78px]'
      )}
    >
      <section className="flex items-center justify-center">
        {isOpen && <Title />}
      </section>
      <ArrowLeft
        className={cn(
          'absolute right-3 bottom-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
          !isOpen && 'rotate-180'
        )}
        onClick={handleToggle}
      />
      <section className="absolute right-2 bottom-5">
        <ModeToggle />
      </section>
      <div className="space-y-4 py-4 ">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <SideNav className="text-background overflow-scroll opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100" />
          </div>
        </div>
      </div>
    </nav>
  );
}
