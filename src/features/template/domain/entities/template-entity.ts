import { Either, left, right } from 'fp-ts/lib/Either';

import { Entity } from '../../../../core/domain/entity/entity-generic-class';
import Failure from '../../../../core/failures/failures';
import { TemplateSchema, TemplateType } from './template-schema';

/**
 * Represents an EvaluationEntity, which is a subclass of the Entity class.
 * The EvaluationEntity is used to encapsulate and validate the properties of an evaluation.
 */
export default class TemplateEntity extends Entity<TemplateType> {
  readonly values: Either<Failure<string>, TemplateType>;

  private constructor(props: Either<Failure<string>, TemplateType>) {
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
            message: 'Invalid Evaluation Properties',
          })
        )
      );
    }
    return new TemplateEntity(right(props));
  }
}
