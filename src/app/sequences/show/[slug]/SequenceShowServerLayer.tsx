import React from "react";
import NotFound from "@/app/not-found";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import ContentViewer from "@/features/cours-sequence/presentation/views/ContentViewer";
import checkAuthAndRedirect from "@/data-access/auth/check-and-redirect";

async function SequenceShowServerLayer(props: { slug: string }) {
  const { userId } = await checkAuthAndRedirect();

  //! TODO: @DATA-ACCESS
  const eitherSequence = await coursUsecases.getSingleSequence({
    userId,
    sequenceId: props.slug,
  });
  if (isLeft(eitherSequence)) {
    return <NotFound />;
  }
  // Get all cours from the sequence
  const eitherCours = await coursUsecases.getAllCoursFromSequence({
    userId,
    sequenceId: props.slug,
  });
  if (isLeft(eitherCours)) {
    return <NotFound />;
  }
  // Merge the sequence and cours content
  const content =
    eitherSequence.right.body +
    eitherCours.right
      .map((c) => c.body)
      .join(" ")
      .toString();
  return <ContentViewer navItems={[]} content={content} />;
}

export default SequenceShowServerLayer;
