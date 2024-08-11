import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import React, { Suspense } from "react";
import AddEvaluationBaseServerLayer from "./AddEvaluationBaseServerLayer";

function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <AddEvaluationBaseServerLayer />
    </Suspense>
  );
}

export default Page;
