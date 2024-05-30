import NotFound from "@/app/not-found";
import LoadingPage from "@/core/components/common/LoadingPage";
import SequenceServerLayer from "@/features/cours-sequence/presentation/components/SequenceServerLayer";
import React, { Suspense } from "react";

async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  if (!params.slug) {
    return <NotFound />;
  }
  return (
    <Suspense fallback={<LoadingPage />}>
      <SequenceServerLayer slug={params.slug} />
    </Suspense>
  );
}

export default Page;
