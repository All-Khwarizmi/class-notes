import { Either } from "fp-ts/lib/Either";
import Failure from "../failures/failures";

export interface UserAuth {
  userId: string;
  email: string;
  name: string;
}

export default abstract class IAuth {
  abstract getUserAuthInfra(): Promise<Either<Failure<string>, UserAuth>>;
}
