import React, { Suspense } from "react";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import NotesServerLayer from "@/app/profile/notes/[slug]/NotesServerLayer";
import LayoutWithProps from "@/core/components/layout/LayoutWithProps";

async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <LayoutWithProps>
        <NotesServerLayer slug={params.slug} type="cours" />
      </LayoutWithProps>
    </Suspense>
  );
}

export default Page;
