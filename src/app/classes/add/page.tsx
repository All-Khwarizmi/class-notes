import checkAuthAndRedirect from "@/data-access/auth/check-and-redirect";
import AddClassForm from "@/features/classe/presentation/components/AddClassForm";
import React from "react";

async function Page() {
  const { userId } = await checkAuthAndRedirect();
  return <AddClassForm userId={userId} />;
}

export default Page;
