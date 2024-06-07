import React, { Suspense } from "react";
import UserSpaceServerLayer from "./UserSpaceServerLayer";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";

async function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <UserSpaceServerLayer slug={params.slug} />
    </Suspense>
  );
}

export default Page;
