import React, { Suspense } from "react";
import NoteServerLayer from "./NoteServerLayer";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";

function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <NoteServerLayer slug={params.slug} />
    </Suspense>
  );
}

export default Page;
