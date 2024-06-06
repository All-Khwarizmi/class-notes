import { Suspense } from "react";
import ClasseServerLayer from "./ClasseServerLayer";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";

export default function ClassPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ClasseServerLayer slug={params.slug} />
    </Suspense>
  );
}
