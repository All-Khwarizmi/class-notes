import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import LayoutWithProps from "@/core/components/layout/LayoutWithProps";
import ComplementAddBaseForm from "@/features/complement/presentation/views/ComplementAddBase";
import React, { Suspense } from "react";

function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <LayoutWithProps>
        <ComplementAddBaseForm slug={params.slug} />
      </LayoutWithProps>
    </Suspense>
  );
}

export default Page;
