import { getUserByHostname } from "@/data-access/hostname/get-user-by-hostname";
import { isNone } from "fp-ts/lib/Option";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import SpacesClassesServerLayer from "./SpacesClassesServerLayer";
import NotFound from "@/app/not-found";
import { checkParams } from "../helpers/check-params";
export const dynamic = "force-dynamic";
type Props = {
  params: { hostname: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { hostname: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const isValid = checkParams({
    params,
    requiredParams: ["hostname"],
  });
  if (!isValid) {
    return <NotFound />;
  }
  const hostname = params.hostname;
  const user = await getUserByHostname(hostname);
  if (isNone(user)) {
    return <NotFound />;
  }
  console.log(user);
  if (!user) {
    return <NotFound />;
  }
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SpacesClassesServerLayer
        userId={user.value.userId}
        hostname={hostname}
      />
    </Suspense>
  );
}
