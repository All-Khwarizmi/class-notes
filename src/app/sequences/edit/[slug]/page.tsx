import NotFound from "@/app/not-found";
import { Suspense } from "react";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import SequenceEditServerLayer from "./SequenceEditServerLayer";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  console.log("hitting page route for sequence edit");
  if (!params.slug) {
    console.log(params.slug);
    return <NotFound />;
  }

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SequenceEditServerLayer slug={params.slug} searchParams={searchParams} />
    </Suspense>
  );
}
