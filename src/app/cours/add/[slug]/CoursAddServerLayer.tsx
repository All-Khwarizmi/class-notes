import React from "react";
import AddUpdateCoursSequenceView from "@/features/cours-sequence/presentation/views/AddCoursView";
import { compCatUsecases } from "@/features/comp-cat/application/usecases/comp-cat-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { Competence } from "@/features/comp-cat/domain/entities/schemas";
import checkAuthAndRedirect from "@/data-access/auth/check-and-redirect";

async function CoursAddServerLayer(props: { slug: string }) {
  const { userId } = await checkAuthAndRedirect();

  //! TODO: @DATA-ACCESS

  const eitherCompetences = await compCatUsecases.getCompetences({
    userId,
  });

  let competences: Competence[] = [];
  if (!isLeft(eitherCompetences)) {
    competences = eitherCompetences.right;
  } else {
    competences = [];
  }
  return (
    <AddUpdateCoursSequenceView
      competences={competences}
      userId={userId}
      sequenceId={props.slug}
      type="cours"
      title="Add Cours"
    />
  );
}

export default CoursAddServerLayer;
