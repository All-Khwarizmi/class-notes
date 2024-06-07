import React from "react";
import UserSpace from "./UserSpace";

async function Page({ params }: { params: { slug: string } }) {
  return(
    
    <UserSpace slug={params.slug} />);
}

export default Page;
