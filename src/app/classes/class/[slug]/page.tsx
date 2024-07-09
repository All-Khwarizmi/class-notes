import { Suspense } from "react";
import ClasseServerLayer from "./ClasseServerLayer";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import ClasseLayout from "./ClasseLayout";

export default function ClassPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ClasseLayout slug={params.slug} />
    </Suspense>
  );
}
