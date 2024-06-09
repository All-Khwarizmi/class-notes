"use server";

import { Either } from "fp-ts/lib/Either";
import { classeUsecases } from "../../usecases/classe-usecases";
import Failure from "@/core/failures/failures";
import { VisibilityType } from "@/features/classe/domain/visibility-schema";

export default async function getVisibility(options: {
  userId: string;
}): Promise<Either<Failure<string>, VisibilityType>> {
  return classeUsecases.getVisibility({
    userId: options.userId,
  });
}
