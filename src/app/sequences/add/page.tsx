import { Suspense } from "react";
import SequenceAddServerLayer from "./SequenceAddServerLayer";
import LoadingPage from "@/core/components/common/LoadingPage";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";

export default async function Page() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SequenceAddServerLayer />
    </Suspense>
  );
}
