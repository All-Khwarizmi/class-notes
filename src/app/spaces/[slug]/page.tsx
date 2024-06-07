import React from "react";

async function Page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Space: {params.slug}</h1>
      <p>This is a page in the space.</p>
    </div>
  );
}

export default Page;
