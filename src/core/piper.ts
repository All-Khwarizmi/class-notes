import { Option, getOrElseW } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";
import { CustomError } from "../core/errors/error";
import { Either, getOrElseW as gOEW } from "fp-ts/lib/Either";
import Failure from "../core/failures/failures";
export function optionPiper<T>(x: Option<T>) {
  return pipe(
    x,
    getOrElseW(() => {
      throw new CustomError(x, "Unable to option piper");
    })
  );
}
export function eitherPiper<T>(x: Either<Failure<string>, T>) {
  return pipe(
    x,
    gOEW(() => {
      throw new CustomError(x, "Unable to either piper");
    })
  );
}
