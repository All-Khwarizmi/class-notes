import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import React, { Suspense } from "react";
import SpacesComplementServerLayer from "./SpacesComplementServerLayer";

function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SpacesComplementServerLayer slug={params.slug} />
    </Suspense>
  );
}

export default Page;
