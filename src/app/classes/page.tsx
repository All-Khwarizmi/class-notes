import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import { Suspense } from "react";
import ClasseServerLayer from "./ClasseServerLayer";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<LoadingSkeleton />}>
        <ClasseServerLayer slug="slug" />
      </Suspense>
    </>
  );
}
