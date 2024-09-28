import React, { Suspense } from "react";
import BlogEditor from "./BlogEditor";
import checkAuthAndRedirect from "@/data-access/auth/check-and-redirect";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import { redirect } from "next/navigation";

async function Page() {
  const authUser = await checkAuthAndRedirect();
  const adminUser = process.env.ADMIN_EMAIL === authUser.email;
  if (!adminUser) {
    redirect("/");
  }
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <BlogEditor userId={authUser.userId} />
    </Suspense>
  );
}

export default Page;
