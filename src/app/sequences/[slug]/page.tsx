import NotFound from "@/app/not-found";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import SequenceServerLayer from "@/app/sequences/[slug]/SequenceServerLayer";
import React, { Suspense } from "react";

async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  if (!params.slug) {
    return <NotFound />;
  }
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SequenceServerLayer slug={params.slug} />
    </Suspense>
  );
}

export default Page;
