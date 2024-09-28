"use client";

import React, { useEffect, useState } from "react";
import NotFound from "@/app/not-found";
import NothingToShow from "../common/editor/NothingToShow";
import ErrorDialog from "../common/ErrorDialog";
import LoadingSkeleton from "../common/LoadingSkeleton";
import Header from "./ExperimentalHeader";
import Sidebar from "./ExperimentalSidebar";
import useExperimentalLayoutLogic from "./useExperimentalLayoutLogic";
import LayoutContext, {
  LayoutWithPropsProps,
  useLayoutContext,
} from "./ExperimentalLayoutCtx";
import { Loader } from "lucide-react";
import { NavItem } from "@/lib/types";
import { usePathname } from "next/navigation";

/**
 * Renders the layout component with the provided props.
 *
 * @param {LayoutWithPropsProps} props - The props for the layout component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the layout.
 * @param {NavItem[]} props.navItems - The navigation items to be displayed in the header and sidebar.
 * @param {boolean} [props.isEmpty=false] - Indicates whether the layout is empty.
 * @param {boolean} [props.notFound=false] - Indicates whether the layout represents a not found page.
 * @param {boolean} [props.nothingToShow=false] - Indicates whether there is nothing to show in the layout.
 * @param {boolean} props.isError - Indicates whether an error occurred.
 * @param {boolean} props.isLoading - Indicates whether the layout is in a loading state.
 * @returns {React.ReactNode} The rendered layout component.
 */
function Layout({
  children,
  isEmpty = false,
  notFound = false,
  nothingToShow = false,
  isError,
  isLoading,
  userId,
  hostname,
}: Omit<LayoutWithPropsProps, "navItems">) {
  const { navItems: experimentalNavItems, loading } =
    useExperimentalLayoutLogic(userId, hostname);
  const [navItems, setNavItems] = useState<NavItem[]>(experimentalNavItems);
  const [spacesNavItems, setSpacesNavItems] = useState<NavItem[]>([]);
  const [isLandingPage, setIsLandingPage] = useState(false);
  const [isSpaces, setIsSpaces] = useState(false);
  const path = usePathname();
  useEffect(() => {
    const isLandingPage = path === "/";
    if (isLandingPage === true) {
      setIsLandingPage(true);
      setNavItems([]);
      setSpacesNavItems([]);
      setIsSpaces(false);
    } else {
      // Path contains /spaces/
      if (path.includes("/spaces/")) {
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
      <div className="relative">
        {loading ? (
          <div className="h-fit w-full overflow-hidden flex items-center justify-center py-4">
            <Layout.Loader />
          </div>
        ) : (
          <>{!isLandingPage && <Header />}</>
        )}
        <section className="flex h-full w-full border-collapse overflow-hidden ">
          {loading ? (
            <div className="h-full w-72 px-4 overflow-hidden flex items-center justify-center py-4">
              <Layout.Loader />
            </div>
          ) : (
            <>{!isLandingPage && <Sidebar />}</>
          )}
          <section className="h-full flex-1  pt-8 px-4 overflow-x-hidden">
            {children}
          </section>
        </section>
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
      "ErrorDialog must be used within a Layout component and have an error prop."
    );
  }
  return <ErrorDialog {...isError} />;
};

Layout.LoadingSkeleton = function LayoutLoadingSkeleton() {
  const { isLoading } = useLayoutContext();
  if (!isLoading) {
    throw new Error(
      "LoadingSkeleton must be used within a Layout component and have an isLoading prop."
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
