import { Either, getOrElseW, isRight, left, right } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { isArray, isEmpty, isEqual, isString } from "lodash";
import Failure from "../../core/failures/failures";
import { CustomError } from "../../core/errors/error";
import { ValueObject as immutableVO } from "immutable";

/**
 * @description An immutable type that is distinguishable only by the state of its properties
 */
export abstract class ValueObject<T> implements immutableVO {
  equals(other: unknown): boolean {
    throw new Error("Method not implemented.");
  }
  hashCode(): number {
    throw new Error("Method not implemented.");
  }
  /**
   *
   * @description The value contained in `this` object
   * @returns Either `T` or a `Failure`
   * @advise You should not access the value, nor try to modify it. Create an other object value instead. To check for validity, use the {@link isValid} method.
   */
  abstract readonly value: Either<Failure, T>;

  /**
   *
   * @description Whether or not the value is valid
   * @returns `boolean`
   */
  public isValid(): boolean {
    return isRight(this.value);
  }

  /**
   *
   * @description Force access to `this` value.
   * @returns `T` or crashes the application
   */
  public getOrCrash(): T {
    return pipe(
      this.value,
      getOrElseW(() => {
        throw new CustomError(
          this.value,
          "Crash",
          "Unexpected error occured accessing value object value",
          "Value object"
        );
      })
    );
  }

  /**
   *
   * @description Considers if `this` is equal to `other`
   * @param other
   * @returns `boolean`
   */
  isEqual(other: this): boolean {
    return isEqual(this.value, other.value);
  }

  /* =================== VALIDATORS =================== */

  public static shortString(value: string): Either<Failure, string> {
    return isEmpty(value)
      ? left(
          Failure.invalidValue({
            invalidValue: value,
            message: "A String must not be empty",
          })
        )
      : right(value);
  }
  public static longString(value: string): Either<Failure, string> {
    return value.length < 10
      ? left(
          Failure.invalidValue({
            invalidValue: value,
            message: "A String must be at least 10 chars long",
          })
        )
      : right(value);
  }
  public static idFromString(value: string): Either<Failure, string> {
    return value.length < 5
      ? left(
          Failure.invalidValue({
            invalidValue: value,
            message: "An ID must be at least 5 chars long",
          })
        )
      : right(value);
  }
  public static number(value: number): Either<Failure, number> {
    return value < 0
      ? left(
          Failure.invalidValue({
            invalidValue: value,
            message: "A number must be greater than 0",
          })
        )
      : right(value);
  }
  public static stringList(
    value: Array<string>
  ): Either<Failure, Array<string>> {
    const isArr = isArray(value);
    const isAllStr = value.every((e) => isString(e) && !isEmpty(e));
    return !isArr || !isAllStr
      ? left(
          Failure.invalidValue({
            invalidValue: value,
            message: "A list of strings must not be empty",
          })
        )
      : right(value);
  }
}

export default ValueObject;
