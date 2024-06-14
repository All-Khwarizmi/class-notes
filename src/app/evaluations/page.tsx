import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import { Suspense } from "react";
import EvaluationsServerLayer from "./EvaluationsServerLayer";

export default function Page() {
  return <Suspense fallback={<LoadingSkeleton />}>
    <EvaluationsServerLayer />
  </Suspense>;
}
