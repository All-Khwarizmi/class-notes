"use client";

import React from "react";
import { LayoutWithPropsProps } from "./LayoutWithProps";
import LayoutContext, { useLayoutContext } from "./LayoutContext";
import Header from "@/core/components/layout/Header";
import { NavItem } from "@/lib/types";
import Sidebar from "./Sidebar";
import NotFound from "@/app/not-found";
import NothingToShow from "../common/editor/NothingToShow";
import ErrorDialog from "../common/ErrorDialog";
import { Home } from "lucide-react";
import LoadingSkeleton from "../common/LoadingSkeleton";

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
  navItems,
  isEmpty = false,
  notFound = false,
  nothingToShow = false,
  isError,
  isLoading,
}: LayoutWithPropsProps) {
  const defaultNavItem: NavItem = {
    title: "Home",
    href: "/",
    icon: <Home size={16} />,
  };
  return (
    <LayoutContext.Provider
      value={{
        navItems,
        isEmpty,
        notFound,
        nothingToShow,
        isError,
        isLoading,
      }}
    >
      <Header navItems={isEmpty === true ? [defaultNavItem] : navItems} />
      <section className="flex h-full w-full border-collapse overflow-hidden">
        <Sidebar navItems={isEmpty === true ? [defaultNavItem] : navItems} />
        <section className="h-full flex-1  pt-4 px-4 overflow-x-hidden">
          {children}
        </section>
      </section>
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

export default Layout;
