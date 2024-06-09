"use server";

import Failure from "@/core/failures/failures";
import { classeUsecases } from "../../usecases";
import { Either } from "fp-ts/lib/Either";

export default async function updateVisibility(options: {
  userId: string;
  type: "classe" | "sequence" | "cours" | "complement";
  typeId: string;
  publish: boolean;
}): Promise<Either<Failure<string>, void>> {
  return classeUsecases.updateVisibility({
    userId: options.userId,
    type: options.type,
    typeId: options.typeId,
    publish: options.publish,
  });
}
