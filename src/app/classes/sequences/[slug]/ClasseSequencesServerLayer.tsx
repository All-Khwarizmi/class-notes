import React from "react";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import { isLeft } from "fp-ts/lib/Either";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import ClasseSequencesTableView from "@/features/cours-sequence/presentation/views/ClasseSequencesTableView";
import checkAuthAndRedirect from "@/data-access/auth/check-and-redirect";

async function ClasseSequencesServerLayer(props: { slug: string }) {
  const { userId } = await checkAuthAndRedirect();
  const eitherSequences = await coursUsecases.getAllSequences({
    userId,
  });
  const eitherClasseSequences = await coursUsecases.getClasseSequences({
    classeId: props.slug,
  });
  if (isLeft(eitherSequences)) {
    return (
      <ErrorDialog
        message="An error occurred"
        description="An error occurred while fetching sequences"
        code={eitherSequences.left.code}
      />
    );
  }

  if (isLeft(eitherClasseSequences)) {
    return (
      <ErrorDialog
        message="An error occurred"
        description="An error occurred while fetching classe sequences"
        code={eitherClasseSequences.left.code}
      />
    );
  }

  return <ClasseSequencesTableView userId={userId} classeId={props.slug} />;
}

export default ClasseSequencesServerLayer;
