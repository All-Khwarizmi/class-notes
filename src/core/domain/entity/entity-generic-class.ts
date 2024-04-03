import { Either, getOrElseW, isRight } from "fp-ts/lib/Either";
import Failure from "../../failures/failures";
import { pipe } from "fp-ts/lib/function";
import { CustomError } from "../../errors/error";
import { isEqual } from "lodash";

/**
 * @description An immutable type that is distinguishable only by the state of its properties
 */
export abstract class Entity<T> {
  /**
   *
   * @description The value contained in `this` object
   * @returns Either `T` or a `Failure`
   * @advise You should not access the value, nor try to modify it. Create an other object value instead. To check for validity, use the {@link isValid} method.
   */
  abstract values: Either<Failure, T>;

  /**
   *
   * @description Whether or not the value is valid
   * @returns `boolean`
   */
  public isValid(): boolean {
    return isRight(this.values);
  }

  /**
   *
   * @description Force access to `this` value.
   * @returns `T` or crashes the application
   */
  public getOrCrash(): T {
    return pipe(
      this.values,
      getOrElseW(() => {
        throw new CustomError(
          this.values,
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
    return isEqual(this.values, other.values);
  }

  toString(): string {
    return JSON.stringify(this.values);
  }
}
