import React, { Suspense } from "react";
import UserSpaceServerLayer from "./UserSpaceServerLayer";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";

async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <UserSpaceServerLayer slug={params.slug} searchParams={searchParams} />
    </Suspense>
  );
}

export default Page;
