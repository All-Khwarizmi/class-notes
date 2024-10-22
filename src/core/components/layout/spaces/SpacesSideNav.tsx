'use client';

import { useSidebar } from '@/core/application/common/useSidebar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/core/components/layout/SubNavAccordion';
import { buttonVariants } from '@/core/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { useSpacesLayoutContext } from './SpacesLayoutCtx';

interface SideNavProps {
  // eslint-disable-next-line no-unused-vars
  setOpen?: (open: boolean) => void;
  className?: string;
}

export function SpacesSideNav({ setOpen, className }: SideNavProps) {
  const { spacesNavItems } = useSpacesLayoutContext();
  const items = spacesNavItems || [];
  const path = usePathname();
  const { isOpen, toggle } = useSidebar();
  const [openItem, setOpenItem] = useState('');
  const [liveHref, setLiveHref] = useState(path);

  useEffect(() => {
    setLiveHref(path);
  }, [path]);

  useEffect(() => {
    if (items.length < 1) {
      toggle(false);
    }
  }, [items, toggle]);

  const handleOpenItem = (value: string) => {
    if (!isOpen) {
      toggle(true);
      setTimeout(() => setOpenItem(value), 250);
    } else {
      setOpenItem(value);
    }
  };

  const pathIsActive = (itemPath: string) => {
    const cleanPath = itemPath.split('?')[0];
    return liveHref.split('/')[1] === cleanPath.split('/')[1];
  };

  const NavItem = ({ item }: { item: (typeof items)[0] }) => {
    if (item.isChidren) {
      return (
        <Accordion
          type="single"
          collapsible
          className="space-y-2"
          value={openItem}
          onValueChange={handleOpenItem}
        >
          <AccordionItem value={item.title} className="border-none">
            <AccordionTrigger
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                pathIsActive(item.href) && 'bg-muted',
                `dark:${item.color} hover:bg-muted`,
                'group relative flex h-12 justify-between px-4 py-2 text-base duration-200 hover:bg-muted hover:no-underline'
              )}
            >
              <div
                className={cn(
                  'flex items-center',
                  !isOpen && 'w-full justify-center'
                )}
              >
                <span className="flex-shrink-0 w-6 h-6 mr-3">{item.icon}</span>
                <span className={cn('flex-grow', !isOpen && 'sr-only')}>
                  {item.title}
                </span>
              </div>
              {isOpen && (
                <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
              )}
            </AccordionTrigger>
            <AccordionContent className="mt-2 space-y-4 pb-1">
              {item.children?.map((child) => (
                <NavItem key={child.title} item={child} />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    }

    return (
      <Link
        href={item.href}
        onClick={() => setOpen?.(false)}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'group relative flex h-12 items-center justify-start',
          `dark:${item.color} hover:bg-muted`,
          pathIsActive(item.href) && 'bg-secondary font-bold hover:bg-muted',
          item.isChidren && 'ml-4'
        )}
      >
        <div
          className={cn(
            'flex items-center w-full',
            !isOpen && 'justify-center'
          )}
        >
          <span className="flex-shrink-0 w-6 h-6 mr-3">{item.icon}</span>
          <span className={cn('flex-grow', !isOpen && 'sr-only')}>
            {item.title}
          </span>
        </div>
      </Link>
    );
  };

  return (
    <nav className={cn('space-y-2', className)} aria-label="Sidebar Navigation">
      {items.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </nav>
  );
}
