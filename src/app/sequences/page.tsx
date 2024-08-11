import { Suspense } from "react";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import SequencesServerLayer from "./SequencesServerLayer";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key in string]: string };
}) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SequencesServerLayer params={params} searchParams={searchParams} />
    </Suspense>
  );
}
