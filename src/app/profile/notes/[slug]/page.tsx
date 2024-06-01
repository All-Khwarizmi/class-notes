import React, { Suspense } from "react";
import ProfileNotes from "./ProfileNotes";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";

async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ProfileNotes slug={params.slug} />
    </Suspense>
  );
}

export default Page;
