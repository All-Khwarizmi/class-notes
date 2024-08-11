import React, { Suspense } from "react";
import EvaluationServerLayer from "./EvaluationServerLayer";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";

function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <EvaluationServerLayer evaluationId={params.slug} />
    </Suspense>
  );
}

export default Page;
