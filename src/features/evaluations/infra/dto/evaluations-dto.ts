import { Either, left, right } from "fp-ts/lib/Either";
import EvaluationEntity from "../../domain/entities/evaluation-entity";
import Failure from "@/core/failures/failures";
import { EvaluationSchema } from "../../domain/entities/evaluation-schema";

export default class EvaluationDto {
  static toDomain({
    props,
  }: {
    props: any;
  }): Either<Failure, EvaluationEntity> {
    if (!props) {
      return left(
        Failure.invalidValue({
          invalidValue: props,
          message: "No evaluation found",
        })
      );
    } else {
      const evaluationParsed = EvaluationSchema.safeParse(props);
      if (evaluationParsed.success) {
        return right(EvaluationEntity.create(evaluationParsed.data));
      } else {
        return left(
          Failure.invalidValue({
            invalidValue: props,
            message: "Invalid value",
          })
        );
      }
    } // Implementation here
  }
}
