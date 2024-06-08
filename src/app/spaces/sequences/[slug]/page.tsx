import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import React, { Suspense } from "react";
import SpacesSequenceServerLayer from "./SpacesSequenceServerLayer";

function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SpacesSequenceServerLayer slug={params.slug} />
    </Suspense>
  );
}

export default Page;
