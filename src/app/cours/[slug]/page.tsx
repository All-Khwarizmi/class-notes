import NotFound from "@/app/not-found";
import CoursServerLayer from "./CoursServerLayer";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import { Suspense } from "react";

export default async function Page({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    return <NotFound />;
  }
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <CoursServerLayer slug={params.slug} />
    </Suspense>
  );
}
