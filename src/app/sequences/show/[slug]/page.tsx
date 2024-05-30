import NotFound from "@/app/not-found";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import React, { Suspense } from "react";
import SequenceShowServerLayer from "./SequenceShowServerLayer";

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
      <SequenceShowServerLayer slug={params.slug} />
    </Suspense>
  );
}

export default Page;
