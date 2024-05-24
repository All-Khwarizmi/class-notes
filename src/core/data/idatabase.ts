import { Either } from "fp-ts/lib/Either";
import { DocumentData } from "./database-types";
import Failure from "../failures/failures";

export default abstract class IDatabase {
  abstract getUser({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, DocumentData>>;
}
