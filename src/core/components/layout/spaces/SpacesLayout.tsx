'use client';

import NotFound from '@/app/not-found';
import { NavItem, NavProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { mainMenu } from '../../../../../menu.config';
import NothingToShow from '../../common/editor/NothingToShow';
import { Button } from '../../ui/button';
import SpacesLayoutContext, {
  SpacesLayoutContextType,
} from './SpacesLayoutCtx';
import { SpacesMobileSidebar } from './SpacesMobileSidebar';

function SpacesLayout({
  children,
  isEmpty = false,
  notFound = false,
  nothingToShow = false,

  spacesNavItems,
}: SpacesLayoutContextType) {
  const [items, setItems] = useState<NavItem[]>([]);
  const path = usePathname();
  // const { setNavItems: setSpacesNavItems } = useSpacesLayoutLogic();
  useEffect(() => {
    console.log('spacesNavItems in SpacesLayout', spacesNavItems);
    if (spacesNavItems) {
      setItems(spacesNavItems);
    }
  }, [spacesNavItems, path]);
  return (
    <SpacesLayoutContext.Provider
      value={{
        spacesNavItems: items,
        setSpacesNavItems: setItems,
        isEmpty,
        notFound,
        nothingToShow,
      }}
    >
      <div className="relative">
        <Nav />
        <section className="flex h-full w-full border-collapse overflow-hidden">
          <section className="h-full flex-1  pt-8 px-4 overflow-x-hidden">
            {children}
          </section>
        </section>
      </div>
    </SpacesLayoutContext.Provider>
  );
}

SpacesLayout.NotFound = function SpacesLayoutNotFound() {
  return <NotFound />;
};

SpacesLayout.NothingToShow = function SpacesLayoutNothingToShow() {
  return <NothingToShow />;
};

SpacesLayout.Loader = function SpacesLayoutLoader() {
  return <Loader className="animate-spin" />;
};

export default SpacesLayout;

const Nav = ({ className, children, id }: NavProps) => {
  return (
    <nav
      className={cn(
        'sticky z-50 top-0 bg-background',
        'border-b',
        'fade-in',
        className
      )}
      id={id}
    >
      <div
        id="nav-container"
        className="max-w-5xl mx-auto py-4 px-6 sm:px-8 flex justify-between items-center"
      >
        <Link
          className="hover:opacity-75 transition-all flex gap-2 items-center"
          href="/"
        >
          <h2 className="sr-only">La Classe</h2>
        </Link>
        {children}
        <div className="flex items-center gap-2">
          <div className="mx-2 hidden md:flex">
            {Object.entries(mainMenu).map(([key, href]) => (
              <Button key={href} asChild variant="ghost" size="sm">
                <Link href={href}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              </Button>
            ))}
          </div>

          <SpacesMobileSidebar />
        </div>
      </div>
    </nav>
  );
};
