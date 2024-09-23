import { getUserByHostname } from "@/data-access/hostname/get-user-by-hostname";
import { isNone } from "fp-ts/lib/Option";
import { checkParams } from "./helpers/check-params";
import NotFound from "../not-found";

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
  return <div>{user.value.name}&apos;s Space</div>;
}
