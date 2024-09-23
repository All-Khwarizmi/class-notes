"use client";

import React, { useEffect, useState } from "react";
import NothingToShow from "../common/editor/NothingToShow";

import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";
import SpacesLayoutContext, {
  SpacesLayoutContextType,
} from "./SpacesLayoutCtx";
import { NavItem } from "@/lib/types";
import useSpacesLayoutLogic from "./useSpacesLayoutLogic";
import NotFound from "@/app/not-found";
import SpacesHeader from "./SpacesHeader";
import SpacesSidebar from "./SpacesSidebar";
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
    console.log("spacesNavItems in SpacesLayout", spacesNavItems);
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
        <SpacesHeader />
        <section className="flex h-full w-full border-collapse overflow-hidden">
          <SpacesSidebar />

          <section className="h-full flex-1  pb-8 py-4 px-4 overflow-x-hidden">
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
