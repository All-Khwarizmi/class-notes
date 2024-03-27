export interface FailureProps {
  invalidValue: any;
  code?: string;
  message: string;
}

/**
 * @description A base class to handle failures
 * @param invalidValue
 * @param message
 * @param code is optional
 * @method invalidValue
 * @method parseFailure
 * @method databaseFailure
 */
export class Failure {
  readonly invalidValue: any;
  readonly message: string;
  readonly code?: string;
  private constructor(props: FailureProps) {
    this.invalidValue = props.invalidValue;
    this.message = props.message;
    this.code = props.code;
  }
  public static invalidValue<T>({
    invalidValue,
    message,
    code,
  }: FailureProps): Failure {
    const str = JSON.stringify(invalidValue);
    return new Failure({
      invalidValue: str,
      message,
      code: `${code ?? `Error(${invalidValue})`}`,
    });
  }
}

export default Failure;
