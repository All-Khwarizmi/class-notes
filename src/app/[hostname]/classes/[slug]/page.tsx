import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import React, { Suspense } from "react";
import SpacesClasseServerLayer from "./SpacesClasseServerLayer";
import NotFound from "@/app/not-found";

async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  if (!params.slug) {
    return <NotFound />;
  }
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SpacesClasseServerLayer slug={params.slug} searchParams={searchParams} />
    </Suspense>
  );
}

export default Page;
