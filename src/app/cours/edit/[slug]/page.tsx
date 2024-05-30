import NotFound from "@/app/not-found";
import { Suspense } from "react";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import CoursAddServerLayer from "../../add/[slug]/CoursAddServerLayer";
import CoursEditServerLayer from "./CoursEditServerLayer";

export default async function Page({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    return <NotFound />;
  }

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <CoursEditServerLayer slug={params.slug} />
    </Suspense>
  );
}
