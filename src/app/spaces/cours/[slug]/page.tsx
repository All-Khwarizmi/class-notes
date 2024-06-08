import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import React, { Suspense } from "react";
import SpacesCoursServerLayer from "./SpacesCoursServerLayer";

function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SpacesCoursServerLayer slug={params.slug} />
    </Suspense>
  );
}

export default Page;
