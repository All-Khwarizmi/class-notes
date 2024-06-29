import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import Layout from "@/core/components/layout/Layout";
import ComplementAddBaseForm from "@/features/complement/presentation/views/ComplementAddBase";
import React, { Suspense } from "react";

function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Layout>
        <ComplementAddBaseForm slug={params.slug} />
      </Layout>
    </Suspense>
  );
}

export default Page;
