import { Suspense } from "react";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import DashboardServerLayer from "./DashboardServerLayer";

export default function Page() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <DashboardServerLayer />
    </Suspense>
  );
}
