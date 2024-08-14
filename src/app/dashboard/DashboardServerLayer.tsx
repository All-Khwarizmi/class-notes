import LayoutWithProps from "@/core/components/layout/LayoutWithProps";
import DashboardContainer from "@/features/dashboard/presentation/components/DashboardContainer";
import DashboardGrid from "@/features/dashboard/presentation/views/DashboardGrid";
import React from "react";

async function DashboardServerLayer() {
  return <DashboardGrid />;
}

export default DashboardServerLayer;
