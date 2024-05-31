import React from "react";
import NotFound from "@/app/not-found";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import CoursSequenceView from "@/features/cours-sequence/presentation/views/CoursSequenceView";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";

async function CoursServerLayer(props: { slug: string }) {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const eitherCours = await coursUsecases.getSingleCours({
    userId: authUser.right.userId,
    coursId: props.slug,
  });
  if (isLeft(eitherCours)) {
    return <NotFound />;
  }
  return (
    <CoursSequenceView
      cours={eitherCours.right}
      userId={authUser.right.userId}
      type="cours"
    />
  );
}

export default CoursServerLayer;
