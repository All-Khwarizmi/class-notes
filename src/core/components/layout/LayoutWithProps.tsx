import NotFound from '@/app/not-found';
import Header from '@/core/components/layout/Header';
import { NavItem } from '@/lib/types';
import { not } from 'fp-ts/lib/Predicate';
import { Home } from 'lucide-react';
import React, { PropsWithChildren } from 'react';

import ErrorDialog from '../common/ErrorDialog';
import LoadingSkeleton from '../common/LoadingSkeleton';
import NothingToShow from '../common/editor/NothingToShow';
import Sidebar from './SpacesSidebar';

export interface ErrorDialogProps {
  message: string;
  path?: string;
  code?: string;
  description?: string;
}

export type LayoutWithPropsProps = PropsWithChildren & {
  readonly children?: React.ReactNode;
  readonly navItems?: NavItem[];
  readonly isEmpty?: boolean;
  readonly notFound?: boolean;
  readonly nothingToShow?: boolean;
  readonly isError?: ErrorDialogProps;
  readonly isLoading?: boolean;
  readonly experimentalItems?: boolean;
  readonly userId?: string;
};

function LayoutWithProps({
  children,
  navItems,
  isEmpty = false,
  notFound = false,
  nothingToShow = false,
  isError,
  isLoading,
}: LayoutWithPropsProps) {
  const defaultNavItem: NavItem = {
    title: 'Home',
    href: '/',
    icon: <Home size={16} />,
  };
  return (
    <>
      <Header navItems={isEmpty === true ? [defaultNavItem] : navItems} />
      <section className="flex h-full w-full border-collapse overflow-hidden">
        <Sidebar navItems={isEmpty === true ? [defaultNavItem] : navItems} />
        <section className="h-full flex-1  pt-4 px-4 overflow-x-hidden">
          {notFound === true ? (
            <NotFound />
          ) : nothingToShow === true ? (
            <NothingToShow />
          ) : isError ? (
            <ErrorDialog {...isError} />
          ) : isLoading ? (
            <LoadingSkeleton />
          ) : (
            children
          )}
        </section>
      </section>
    </>
  );
}

export default LayoutWithProps;
