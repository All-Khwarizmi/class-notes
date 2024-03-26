export class CustomError<T> implements Error {
  invalidValue: T;
  name: string;
  message: string;
  code?: string;
  stack?: string | undefined;
  constructor(
    invalidValue: T,
    name = 'CustomError',
    message = 'Something went wrong',
    code?: string,
    stack?: string
  ) {
    (this.invalidValue = invalidValue),
      (this.name = name),
      (this.message = message),
      (this.stack = stack),
      (this.code = code);
  }
}
