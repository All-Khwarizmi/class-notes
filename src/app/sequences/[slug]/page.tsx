import React from "react";

function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  return <div>
    <h1>Sequence page</h1>
    <p>Slug: {params.slug}</p>
  </div>;
}

export default Page;
