import NotFound from "@/app/not-found";
import { Suspense } from "react";
import CoursAddServerLayer from "./CoursAddServerLayer";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";

export default async function Page({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    return <NotFound />;
  }

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <CoursAddServerLayer slug={params.slug} />
    </Suspense>
  );
}
