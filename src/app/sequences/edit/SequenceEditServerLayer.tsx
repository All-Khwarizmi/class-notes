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
  Cours,
  CoursSchema,
  Sequence,
  SequenceSchema,
} from "@/features/cours-sequence/domain/entities/cours-schemas";
import Failure from "@/core/failures/failures";

async function SequenceEditServerLayer(props: { slug: string }) {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const batch = await Promise.allSettled([
    compCatUsecases.getCompetences({
      userId: authUser.right.userId,
    }),
    coursUsecases.getSingleSequence({
      userId: authUser.right.userId,
      sequenceId: props.slug,
    }),
  ]);
  let competences: Competence[] = [];
  let sequence: Sequence | null = null;
  let failures: Failure<string>[] = [];
  const isFailure = batch.some((result, index) => {
    if (result.status === "rejected") {
      failures.push(result.reason);
      return true;
    }
    if (isLeft(result.value)) {
      failures.push(result.value.left);
      return true;
    }
    if (index === 1) {
      const validateSequence = SequenceSchema.safeParse(result.value.right);
      if (!validateSequence.success) {
        failures.push(
          Failure.invalidValue({
            invalidValue: result.value.right,
            message: `
            Unable to validate sequence with id: ${props.slug}
            
              ${JSON.stringify(validateSequence.error)}
            `,
          })
        );
        return true;
      }
      sequence = validateSequence.data;
    }
    if (index === 0) {
      const eitherCompetences = result.value as Either<
        Failure<string>,
        Competence[]
      >;
      if (isLeft(eitherCompetences)) {
        failures.push(eitherCompetences.left);
        return true;
      }
      competences = eitherCompetences.right;
    }
  });
  if (isFailure) {
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
    />
  );
}

export default SequenceEditServerLayer;
