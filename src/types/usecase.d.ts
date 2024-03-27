/**
 * Represents a successful use case result.
 * @template T - The type of the data returned by the use case.
 */
interface UseCaseSuccess<T> {
  /**
   * The state of the use case result.
   * @type {"success"}
   */
  state: "success";
  /**
   * The data returned by the use case.
   * @type {T}
   */
  data: T;
}

/**
 * Represents a failed use case result.
 */
interface UseCaseFailure {
  /**
   * The state of the use case result.
   * @type {"failure"}
   */
  state: "failure";
  /**
   * The error message.
   * @type {string}
   */
  error: string;
}

/**
 * Represents the result of a use case.
 * @template T - The type of the data returned by the use case.
 * @extends UseCaseSuccess - Represents a successful use case result.
 * @extends UseCaseFailure - Represents a failed use case result.
 * @property `UseCaseSuccess<T>` state - The state of the use case result.
 * @property `UseCaseFailure` error - The error message (if any).
 */
export type UseCaseResult<T> = UseCaseSuccess<T> | UseCaseFailure;
