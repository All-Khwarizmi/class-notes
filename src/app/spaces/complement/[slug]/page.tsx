import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import React, { Suspense } from "react";
import SpacesComplementServerLayer from "./SpacesComplementServerLayer";
export const dynamic = "force-dynamic";

function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SpacesComplementServerLayer
        slug={params.slug}
        searchParams={searchParams}
      />
    </Suspense>
  );
}

export default Page;
