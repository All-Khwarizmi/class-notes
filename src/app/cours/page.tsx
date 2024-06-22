import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import { Suspense } from "react";
import CoursesServerLayer from "./CoursesServerLayer";

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <CoursesServerLayer />
    </Suspense>
  );
}
