import React from "react";
import SpacesLayout from "./SpacesLayout";

async function SpacesLayoutServerLayer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SpacesLayout>{children}</SpacesLayout>;
}

export default SpacesLayoutServerLayer;
