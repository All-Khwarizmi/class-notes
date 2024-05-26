import NotFound from "@/app/not-found";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import ShowSequence from "@/features/cours-sequence/presentation/views/ShowSequence";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import React from "react";

async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  if (!params.slug) {
    return <NotFound />;
  }
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }

  const eitherSequence = await coursUsecases.getSingleSequence({
    userId: authUser.right.userId,
    sequenceId: params.slug,
  });
  if (isLeft(eitherSequence)) {
    console.log(eitherSequence.left);
    return <NotFound />;
  }
  // Get all cours from the sequence
  const eitherCours = await coursUsecases.getAllCoursFromSequence({
    userId: authUser.right.userId,
    sequenceId: params.slug,
  });
  if (isLeft(eitherCours)) {
    console.log(eitherCours.left);
    return <NotFound />;
  }
  // Merge the sequence and cours content
  const content =
    eitherSequence.right.body +
    eitherCours.right
      .map((c) => c.body)
      .join(" ")
      .toString();

  return <ShowSequence content={content} />;
}

export default Page;
