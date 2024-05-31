import { Suspense } from "react";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import SequencesServerLayer from "./SequencesServerLayer";

export default async function Page() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SequencesServerLayer />
    </Suspense>
  );
}
