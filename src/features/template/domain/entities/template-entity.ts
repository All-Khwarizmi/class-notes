import { Entity } from "../../../../core/domain/entity/entity-generic-class";
import { TemplateSchema, TemplateType } from "./template-schema";
import { Either, left, right } from "fp-ts/lib/Either";
import Failure from "../../../../core/failures/failures";

/**
 * Represents an EvaluationEntity, which is a subclass of the Entity class.
 * The EvaluationEntity is used to encapsulate and validate the properties of an evaluation.
 */
export default class TemplateEntity extends Entity<TemplateType> {
  readonly values: Either<Failure, TemplateType>;

  private constructor(props: Either<Failure, TemplateType>) {
    super();
    this.values = props;
  }

  public static validator(props: TemplateType): boolean {
    return TemplateSchema.safeParse(props).success;
  }

  public static create(props: TemplateType): TemplateEntity {
    if (!this.validator(props)) {
      return new TemplateEntity(
        left(
          Failure.invalidValue({
            invalidValue: props,
            message: "Invalid Evaluation Properties",
          })
        )
      );
    }
    return new TemplateEntity(right(props));
  }
}
