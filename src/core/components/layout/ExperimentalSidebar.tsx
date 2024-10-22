'use client';

import {
  useSidebar,
  useSidebarPreference,
} from '@/core/application/common/useSidebar';
import { SideNav } from '@/core/components/layout/SideNav';
import { NavItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect } from 'react';

import { ModeToggle } from '../common/ModeToggle';
import Title from '../common/Title';

export type SidebarProps = {
  navItems?: NavItem[];
};

export default function Sidebar() {
  const { isOpen, toggle } = useSidebar();
  const { get, set } = useSidebarPreference();

  useEffect(() => {
    toggle(get());
  }, []);

  const handleToggle = () => {
    const newState = !isOpen;
    toggle(newState);
    set(newState ? 'true' : 'false');
  };

  return (
    <nav
      className={cn(
        'relative hidden h-screen border-r md:flex flex-col transition-all duration-300 ease-in-out',
        isOpen ? 'w-60' : 'w-[78px]'
      )}
    >
      <div className="flex items-center justify-center h-16 border-b">
        {isOpen && <Title />}
      </div>

      <div className="flex-grow overflow-y-auto py-8">
        <SideNav />
      </div>

      <div className="flex items-center justify-between p-4 border-t">
        <ModeToggle />
        <button
          onClick={handleToggle}
          className="p-2 rounded-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
    </nav>
  );
}
