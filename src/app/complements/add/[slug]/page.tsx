import ComplementAddBaseForm from "@/features/complement/presentation/views/ComplementAddBase";
import React from "react";

function Page({ params }: { params: { slug: string } }) {
  return <ComplementAddBaseForm slug={params.slug} />;
}

export default Page;
