import NotFound from "@/app/not-found";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import { Suspense } from "react";
import ComplementsServerLayer from "./ComplementsServerLayer";

export default async function Page({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    return <NotFound />;
  }
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ComplementsServerLayer slug={params.slug} />
    </Suspense>
  );
}
