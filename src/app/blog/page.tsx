import React, { Suspense } from "react";
import BlogServerLayer from "./BlogServerLayer";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";

function Page() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <BlogServerLayer />
    </Suspense>
  );
}

export default Page;
