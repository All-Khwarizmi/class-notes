import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import React, { Suspense } from "react";
import SpacesClasseServerLayer from "./SpacesClasseServerLayer";
import NotFound from "@/app/not-found";

async function Page({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    return <NotFound />;
  }
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SpacesClasseServerLayer slug={params.slug} />
    </Suspense>
  );
}

export default Page;
