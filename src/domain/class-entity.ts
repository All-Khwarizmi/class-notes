import { Entity } from "./entity/entity-generic-class";
import classSchema, { ClassType } from "./class-schema";
import { Either, left, right } from "fp-ts/lib/Either";
import Failure from "@/core/failures/failures";

export default class ClassEntity extends Entity<ClassType> {
  readonly values: Either<Failure, ClassType>;
  private constructor(props: Either<Failure, ClassType>) {
    super();
    this.values = props;
  }
  public static validator(props: ClassType): boolean {
    return classSchema.safeParse(props).success;
  }
  public static create(props: ClassType): ClassEntity {
    if (!this.validator(props)) {
      return new ClassEntity(
        left(Failure.invalidValue(props, "Invalid value"))
      );
    }
    return new ClassEntity(right(props));
  }
}
