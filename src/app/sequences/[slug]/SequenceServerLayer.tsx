import NotFound from "@/app/not-found";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import CoursSequenceView from "@/features/cours-sequence/presentation/views/CoursSequenceView";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import React from "react";

export default async function SequenceServerLayer(props: { slug: string }) {
  if (!props.slug) {
    return <NotFound />;
  }
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }

  const eitherSequence = await coursUsecases.getSingleSequence({
    userId: authUser.right.userId,
    sequenceId: props.slug,
  });
  if (isLeft(eitherSequence)) {
    console.log(eitherSequence.left);
    return <NotFound />;
  }
  // Get all cours from the sequence
  const eitherCours = await coursUsecases.getAllCoursFromSequence({
    userId: authUser.right.userId,
    sequenceId: props.slug,
  });
  if (isLeft(eitherCours)) {
    console.log(eitherCours.left);
    return <NotFound />;
  }
  return (
    <CoursSequenceView
      sequence={eitherSequence.right}
      userId={authUser.right.userId}
      type="sequence"
      coursFromSequence={eitherCours.right}
    />
  );
}
