import React, { Suspense } from "react";
import ClasseSequencesServerLayer from "./ClasseSequencesServerLayer";

async function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClasseSequencesServerLayer slug={params.slug} />
    </Suspense>
  );
}

export default Page;
