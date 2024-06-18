import React from "react";
import Header from "@/core/components/layout/Header";
import { NavItem } from "@/lib/types";
import Sidebar from "./Sidebar";
import { not } from "fp-ts/lib/Predicate";
import NotFound from "@/app/not-found";
import NothingToShow from "../common/editor/NothingToShow";
function LayoutWithProps({
  children,
  navItems,
  isEmpty = false,
  notFound = false,
  nothingToShow = false,
}: Readonly<{
  children?: React.ReactNode;
  navItems?: NavItem[];
  isEmpty?: boolean;
  notFound?: boolean;
  nothingToShow?: boolean;
}>) {
  return (
    <>
      <Header navItems={isEmpty === true ? [] : navItems} />
      <section className="flex h-full w-full border-collapse overflow-hidden">
        <Sidebar navItems={isEmpty === true ? [] : navItems} />
        <section className="h-full flex-1  pt-4 px-4 overflow-x-hidden">
          {notFound === true ? (
            <NotFound />
          ) : nothingToShow === true ? (
            <NothingToShow />
          ) : (
            children
          )}
        </section>
      </section>
    </>
  );
}

export default LayoutWithProps;
