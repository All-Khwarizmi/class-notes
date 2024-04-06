import { Entity } from "../../../../core/domain/entity/entity-generic-class";
import { EvaluationSchema, EvaluationType } from "./evaluation-schema";
import { Either, left, right } from "fp-ts/lib/Either";
import Failure from "../../../../core/failures/failures";

/**
 * Represents an EvaluationEntity, which is a subclass of the Entity class.
 * The EvaluationEntity is used to encapsulate and validate the properties of an evaluation.
 */
export default class EvaluationEntity extends Entity<EvaluationType> {
  readonly values: Either<Failure, EvaluationType>;

  private constructor(props: Either<Failure, EvaluationType>) {
    super();
    this.values = props;
  }

  public static validator(props: EvaluationType): boolean {
    return EvaluationSchema.safeParse(props).success;
  }

  public static create(props: EvaluationType): EvaluationEntity {
    if (!this.validator(props)) {
      return new EvaluationEntity(
        left(
          Failure.invalidValue({
            invalidValue: props,
            message: "Invalid Evaluation Properties",
          })
        )
      );
    }
    return new EvaluationEntity(right(props));
  }
}
