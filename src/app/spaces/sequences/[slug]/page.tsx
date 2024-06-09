import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import React, { Suspense } from "react";
import SpacesSequenceServerLayer from "./SpacesSequenceServerLayer";

function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SpacesSequenceServerLayer
        slug={params.slug}
        searchParams={searchParams}
      />
    </Suspense>
  );
}

export default Page;
