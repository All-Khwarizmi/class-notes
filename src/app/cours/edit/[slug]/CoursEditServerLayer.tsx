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
} from "@/features/cours-sequence/domain/entities/cours-schemas";
import Failure from "@/core/failures/failures";
import LayoutWithProps from "@/core/components/layout/LayoutWithProps";

async function CoursEditServerLayer(props: { slug: string }) {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const batch = await Promise.allSettled([
    compCatUsecases.getCompetences({
      userId: authUser.right.userId,
    }),
    coursUsecases.getSingleCours({
      userId: authUser.right.userId,
      coursId: props.slug,
    }),
  ]);
  let competences: Competence[] = [];
  let cours: Cours | null = null;
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
      const validateCours = CoursSchema.safeParse(result.value.right);
      if (!validateCours.success) {
        failures.push(
          Failure.invalidValue({
            invalidValue: result.value.right,
            message: `
            Unable to validate cours with id: ${props.slug}
            
              ${JSON.stringify(validateCours.error)}
            `,
          })
        );
        return true;
      }
      cours = validateCours.data;
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
  if (!cours) {
    return (
        <ErrorDialog
          message={`
        Failed to fetch data for the cours edit page.
        Unable to find cours with id: ${props.slug}
        Code: PRE303
    `}
        />
    );
  }

  return (
      <AddUpdateCoursSequenceView
        authUser={authUser.right}
        type="cours"
        edit={true}
        cours={cours}
        title="Edit Cours"
        competences={competences}
      />
  );
}

export default CoursEditServerLayer;
