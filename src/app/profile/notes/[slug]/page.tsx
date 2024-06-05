import React, { Suspense } from "react";
import NotesServerLayer from "./NotesServerLayer";
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
      <NotesServerLayer slug={params.slug} type="profile" />
    </Suspense>
  );
}

export default Page;
