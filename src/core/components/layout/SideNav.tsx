'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/core/components/ui/accordion';
import { ScrollArea } from '@/core/components/ui/scroll-area';
import { NavItem } from '@/lib/types';
import Link from 'next/link';
import * as React from 'react';

import { useLayoutContext } from './ExperimentalLayoutCtx';

interface SideNavProps {
  className?: string;
  // eslint-disable-next-line no-unused-vars
  setOpen?: (open: boolean) => void;
}
// function pathIsActive(props: { path: string; liveHref: string }) {
//   let { path, liveHref } = props;

//   // Check if the path is nested and return false if it is
//   if (path.split('/').length > 2) return false;

//   // Check if there are search params in the path and remove them
//   if (path.includes('?')) {
//     path = path.split('?')[0];
//   }

//   return liveHref.split('/')[1] === path.split('/')[1];
// }

export function SideNav({ setOpen }: SideNavProps) {
  const { navItems, spacesNavItems, isSpaces } = useLayoutContext();
  const items = React.useMemo(
    () => (isSpaces ? spacesNavItems : navItems),
    [isSpaces, spacesNavItems, navItems]
  );
  const [openItem, setOpenItem] = React.useState('');

  const handleOpenItem = (itemTitle: string) => {
    setOpenItem(itemTitle);
  };

  const NavItem = ({ item }: { item: NavItem }) => {
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
      return (
        <Accordion
          type="single"
          collapsible
          className="w-full"
          key={item.title}
          value={openItem}
          onValueChange={handleOpenItem}
        >
          <AccordionItem value={item.title} className="border-none">
            <AccordionTrigger className="flex w-full text-muted-foreground py-2 items-center underline justify-between px-3 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors">
              <div className="flex items-center">
                {item.icon && (
                  <span className="mr-3 h-4 w-4 text-sidebar-primary">
                    {item.icon}
                  </span>
                )}
                <span>{item.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-0.5 pb-0.5">
              {item.children?.map((child) => (
                <Link
                  key={child.title}
                  href={child.href}
                  onClick={() => {
                    if (setOpen) setOpen(false);
                  }}
                  className="flex items-center py-2 px-6 underline text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
                >
                  {child.icon && (
                    <span className="mr-3 h-4 w-4 text-sidebar-primary">
                      {child.icon}
                    </span>
                  )}
                  <span>{child.title}</span>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    }

    return (
      <Link
        key={item.title}
        href={item.href}
        onClick={() => {
          if (setOpen) setOpen(false);
        }}
        className="flex w-full items-center px-3 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
        tabIndex={0}
      >
        {item.icon && (
          <span className="mr-3 h-4 w-4 text-sidebar-primary">{item.icon}</span>
        )}
        <span>{item.title}</span>
      </Link>
    );
  };

  return (
    <ScrollArea className="h-full font-sans">
      <nav className="w-full text-foreground ">
        {items?.map((item) => <NavItem key={item.href} item={item} />)}
      </nav>
    </ScrollArea>
  );
}
