import { Entity } from "../../../core/domain/entity/entity-generic-class";
import classSchema, { ClassType } from "./class-schema";
import { Either, left, right } from "fp-ts/lib/Either";
import Failure from "@/core/failures/failures";

/**
 * Represents a ClassEntity, which is a subclass of the Entity class.
 * The ClassEntity is used to validate the properties of a class.
 * @extends Entity
 * @method create - Creates a new ClassEntity instance.
 * @method validator - Validates the properties of the ClassEntity.
 *
 */
export default class ClassEntity extends Entity<ClassType> {
  /**
   * The values of the ClassEntity, which can be either a success or a failure.
   */
  readonly values: Either<Failure<string>, ClassType>;

  /**
   * Private constructor for creating a new ClassEntity instance.
   * @param props - The values of the ClassEntity.
   */
  private constructor(props: Either<Failure<string>, ClassType>) {
    super();
    this.values = props;
  }

  /**
   * Validates the properties of the ClassEntity.
   * @param props - The properties to be validated.
   * @returns A boolean indicating whether the properties are valid.
   */
  public static validator(
    props: ClassType
  ): Either<Failure<string>, ClassType> {
    const classe = classSchema.safeParse(props);
    if (!classe.success) {
      return left(
        Failure.invalidValue({
          invalidValue: props,
          message: "Invalid value",
          code: "DOM201",
        })
      );
    }
    return right(props);
  }

  /**
   * Creates a new ClassEntity instance.
   * @param props - The properties of the ClassEntity.
   * @returns A new instance of ClassEntity.
   */
  public static create(props: ClassType): ClassEntity {
    return new ClassEntity(ClassEntity.validator(props));
  }
}
