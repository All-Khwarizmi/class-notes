import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import SequenceServerLayer from "@/app/sequences/[slug]/SequenceServerLayer";
import React, { Suspense } from "react";
import LayoutWithProps from "@/core/components/layout/LayoutWithProps";

async function Page({
  params,
  searchParams,
}: {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  if (
    !params.slug ||
    !searchParams?.type ||
    (searchParams.type !== "template" && searchParams.type !== "sequence")
  ) {
    return (
      <LayoutWithProps
        isError={{
          message: "Invalid params",
          code: "PRE301",
          description: "Invalid params",
        }}
      />
    );
  }
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SequenceServerLayer
        slug={params.slug}
        type={searchParams?.type as "template" | "sequence"}
      />
    </Suspense>
  );
}

export default Page;
