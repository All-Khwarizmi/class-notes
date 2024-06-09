import React from "react";
import AddUpdateCoursSequenceView from "@/features/cours-sequence/presentation/views/AddCoursView";
import { compCatUsecases } from "@/features/comp-cat/application/usecases/comp-cat-usecases";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { Either, isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import { Competence } from "@/features/comp-cat/domain/entities/schemas";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import {
  Sequence,
  SequenceSchema,
} from "@/features/cours-sequence/domain/entities/cours-schemas";
import Failure from "@/core/failures/failures";
import editSequence from "@/features/cours-sequence/application/adapters/actions/edit-sequence";

async function SequenceEditServerLayer(props: {
  slug: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const type =
    props.searchParams?.type === "sequence" ? "sequence" : "template";

  const { competences, sequence, failures, isFailure } = await editSequence({
    userId: authUser.right.userId,
    slug: props.slug,
    type,
  });
  if (isFailure) {
    console.log(failures);
    return (
      <ErrorDialog
        message={`
        Failed to fetch data for the cours edit page.
        ${failures.map((failure) => failure.message).join("\n")}
        Code: PRE303
    `}
      />
    );
  }
  if (!sequence) {
    return (
      <ErrorDialog
        message={`
        Failed to fetch data for the sequence edit page.
        Unable to find cours with id: ${props.slug}
        Code: PRE303
    `}
      />
    );
  }

  return (
    <AddUpdateCoursSequenceView
      competences={competences}
      sequence={sequence}
      authUser={authUser.right}
      title="Edit Sequence"
      edit={true}
      type="sequence"
      sequenceType={type}
    />
  );
}

export default SequenceEditServerLayer;
