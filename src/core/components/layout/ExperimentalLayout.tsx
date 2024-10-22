'use client';

import NotFound from '@/app/not-found';
import { NavItem } from '@/lib/types';
import { Loader } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import ErrorDialog from '../common/ErrorDialog';
import LoadingSkeleton from '../common/LoadingSkeleton';
import NothingToShow from '../common/editor/NothingToShow';
import Header from './ExperimentalHeader';
import LayoutContext, {
  LayoutWithPropsProps,
  useLayoutContext,
} from './ExperimentalLayoutCtx';
import Sidebar from './ExperimentalSidebar';
import useExperimentalLayoutLogic from './useExperimentalLayoutLogic';

function Layout({
  children,
  isEmpty = false,
  notFound = false,
  nothingToShow = false,
  isError,
  isLoading,
  userId,
  hostname,
}: Omit<LayoutWithPropsProps, 'navItems'>) {
  const { navItems: experimentalNavItems, loading } =
    useExperimentalLayoutLogic(userId, hostname);
  const [navItems, setNavItems] = useState<NavItem[]>(experimentalNavItems);
  const [spacesNavItems, setSpacesNavItems] = useState<NavItem[]>([]);
  const [isLandingPage, setIsLandingPage] = useState(false);
  const [isSpaces, setIsSpaces] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const isLandingPage = path === '/';
    if (isLandingPage === true) {
      setIsLandingPage(true);
      setNavItems([]);
      setSpacesNavItems([]);
      setIsSpaces(false);
    } else {
      if (path.includes('/spaces/')) {
        setIsLandingPage(false);
        setNavItems([]);
        setSpacesNavItems(experimentalNavItems);
        setIsSpaces(true);
      } else {
        setIsLandingPage(false);
        setNavItems(experimentalNavItems);
        setSpacesNavItems([]);
        setIsSpaces(false);
      }
    }
  }, [experimentalNavItems, path]);

  return (
    <LayoutContext.Provider
      value={{
        navItems,
        isLandingPage,
        setIsLandingPage,
        spacesNavItems,
        setSpacesNavItems,
        isSpaces,
        setIsSpaces,
        isEmpty,
        notFound,
        nothingToShow,
        isError,
        isLoading,
        userId,
        hostname,
      }}
    >
      <div className="flex w-full h-screen overflow-hidden">
        {!isLandingPage && (
          <div className="hidden md:block  fixed left-0 top-0 h-full w-72 z-10">
            {loading ? (
              <div className="h-full w-full flex items-center justify-center">
                <Layout.Loader />
              </div>
            ) : (
              <Sidebar />
            )}
          </div>
        )}
        <div className="flex flex-col flex-1 md:ml-72">
          {!isLandingPage && (
            <div className="sticky top-0 z-20 bg-background">
              {loading ? (
                <div className="h-16 w-full flex items-center justify-center">
                  <Layout.Loader />
                </div>
              ) : (
                <Header />
              )}
            </div>
          )}
          <section className="flex-1 overflow-y-auto overflow-x-hidden pt-8 px-4">
            {children}
          </section>
        </div>
      </div>
    </LayoutContext.Provider>
  );
}

Layout.NotFound = function LayoutNotFound() {
  return <NotFound />;
};

Layout.NothingToShow = function LayoutNothingToShow() {
  return <NothingToShow />;
};

Layout.ErrorDialog = function LayoutErrorDialog() {
  const { isError } = useLayoutContext();
  if (!isError) {
    throw new Error(
      'ErrorDialog must be used within a Layout component and have an error prop.'
    );
  }
  return <ErrorDialog {...isError} />;
};

Layout.LoadingSkeleton = function LayoutLoadingSkeleton() {
  const { isLoading } = useLayoutContext();
  if (!isLoading) {
    throw new Error(
      'LoadingSkeleton must be used within a Layout component and have an isLoading prop.'
    );
  }
  return <LoadingSkeleton />;
};

Layout.Children = function LayoutChildren() {
  const { children } = useLayoutContext();
  return children;
};

Layout.Loader = function LayoutLoader() {
  return <Loader className="animate-spin" />;
};

export default Layout;
