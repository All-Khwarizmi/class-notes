import React from "react";
import Header from "@/core/components/layout/Header";
import { NavItem } from "@/lib/types";
import Sidebar from "./Sidebar";
function LayoutWithProps({
  children,
  navItems,
  isEmpty = false,
}: Readonly<{
  children: React.ReactNode;
  navItems?: NavItem[];
  isEmpty?: boolean;
}>) {
  return (
    <>
      <Header navItems={isEmpty === true ? [] : navItems} />
      <section className="flex h-full w-full border-collapse overflow-hidden">
        <Sidebar navItems={isEmpty === true ? [] : navItems} />
        <section className="h-full flex-1  pt-4 px-4 overflow-x-hidden">
          {children}
        </section>
      </section>
    </>
  );
}

export default LayoutWithProps;
