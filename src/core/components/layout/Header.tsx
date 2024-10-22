'use client';

import Title from '@/core/components/common/Title';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

import { ModeToggle } from '../common/ModeToggle';
import { MobileSidebar } from './MobileSidebar';
import { SidebarProps } from './spaces/SpacesSidebar';

export default function Header({ navItems }: SidebarProps) {
  const pathName = usePathname();

  return (
    <header className="flex flex-row gap-4 border-b items-center justify-between border-b-slate-300 p-4">
      <div className={cn('block md:!hidden')}>
        <MobileSidebar navItems={navItems} />
      </div>
      {pathName === '/' ? null : <Title />}

      <div className="flex flex-row gap-4 items-center">
        <ModeToggle />
      </div>
    </header>
  );
}
