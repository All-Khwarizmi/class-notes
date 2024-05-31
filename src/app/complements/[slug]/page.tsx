import React from "react";

async function Page({ params }: { params: { slug: string } }) {
  return <div>Complement id : {params.slug}</div>;
}

export default Page;
