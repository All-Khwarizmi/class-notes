import NotFound from "@/app/not-found";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import SequenceServerLayer from "@/app/sequences/[slug]/SequenceServerLayer";
import React, { Suspense } from "react";

async function Page({
  params,
  searchParams,
}: {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  
  if (!params.slug) {
    return <NotFound />;
  }
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SequenceServerLayer slug={params.slug} 
        type={searchParams?.type as "template" | "sequence"}
      />
    </Suspense>
  );
}

export default Page;
