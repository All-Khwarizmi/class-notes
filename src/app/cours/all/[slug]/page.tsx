import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import { Suspense } from "react";
import CoursesServerLayer from "./CoursesServerLayer";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key in string]: string };
}) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <CoursesServerLayer params={params} searchParams={searchParams} />
    </Suspense>
  );
}
