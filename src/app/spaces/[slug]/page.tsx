import React from "react";
import UserSpaceServerLayer from "./UserSpaceServerLayer";

async function Page({ params }: { params: { slug: string } }) {
  return <UserSpaceServerLayer slug={params.slug} />;
}

export default Page;
