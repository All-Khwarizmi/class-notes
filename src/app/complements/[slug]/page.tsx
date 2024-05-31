import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import React, { Suspense } from "react";
import ComplementServerLayer from "./ComplementServerLayer";

async function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ComplementServerLayer slug={params.slug} />
    </Suspense>
  );
}

export default Page;
