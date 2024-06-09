"use server";

import Failure from "@/core/failures/failures";
import { compCatUsecases } from "@/features/comp-cat/application/usecases/comp-cat-usecases";
import { Competence } from "@/features/comp-cat/domain/entities/schemas";
import {
  Sequence,
  SequenceSchema,
} from "@/features/cours-sequence/domain/entities/cours-schemas";
import { isLeft, Either } from "fp-ts/lib/Either";
import { revalidateTag } from "next/cache";
import { coursUsecases } from "../../usecases/cours-usecases";
async function editSequence(options: {
  userId: string;
  slug: string;
  type: "sequence" | "template";
}) {
  revalidateTag("sequence-edit");
  const batch = await Promise.allSettled([
    compCatUsecases.getCompetences({
      userId: options.userId,
    }),
    coursUsecases.getSingleSequence({
      userId: options.userId,
      sequenceId: options.slug,
      type: options.type,
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
            Unable to validate sequence with id: ${options.slug}
            
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

  return {
    competences,
    sequence,
    failures,
    isFailure,
  };
}

export default editSequence;
