import React from "react";
import Header from "@/core/components/layout/Header";
import { NavItem } from "@/lib/types";
import Sidebar from "./Sidebar";
function LayoutWithProps({
  children,
  navItems,
}: Readonly<{
  children: React.ReactNode;
  navItems: NavItem[];
}>) {
  return (
    <>
      <Header navItems={navItems} />
      <section className="flex h-full w-full border-collapse overflow-hidden">
        <Sidebar navItems={navItems} />
        <section className="h-full flex-1  pt-4 px-4 overflow-x-hidden">
            {children}
        </section>
      </section>
    </>
  );
}

export default LayoutWithProps;
