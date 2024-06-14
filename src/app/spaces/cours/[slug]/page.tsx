import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import React, { Suspense } from "react";
import SpacesCoursServerLayer from "./SpacesCoursServerLayer";

function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SpacesCoursServerLayer slug={params.slug} searchParams={searchParams} />
    </Suspense>
  );
}

export default Page;
