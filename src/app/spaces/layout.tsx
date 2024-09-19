import React from "react";
import SpacesLayoutServerLayer from "@/core/components/layout/SpacesLayoutServerLayer";

function Layout({ children }: { children: React.ReactNode }) {
  return <SpacesLayoutServerLayer>{children}</SpacesLayoutServerLayer>;
}

export default Layout;
