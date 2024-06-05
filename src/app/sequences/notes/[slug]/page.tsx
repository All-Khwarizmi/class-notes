import React, { Suspense } from "react";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import NotesServerLayer from "@/app/profile/notes/[slug]/NotesServerLayer";

async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <NotesServerLayer slug={params.slug} type="sequence" />
    </Suspense>
  );
}

export default Page;
