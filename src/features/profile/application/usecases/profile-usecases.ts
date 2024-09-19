import { Either, isLeft, left, right } from "fp-ts/lib/Either";
import {
  ProfileRepository,
  profileRepository,
} from "../repositories/profile-repository";
import Failure from "@/core/failures/failures";
import {
  UserType,
  userSchema,
} from "@/features/user/domain/entities/user-schema";
import { SaveUserOptions } from "@/features/user/domain/types/types";

export interface ProfileUseCasesOptions {
  repository: ProfileRepository;
}

export default class ProfileUseCases {
  private readonly _repository: ProfileRepository;

  constructor(options: ProfileUseCasesOptions) {
    this._repository = options.repository;
  }

  async getUser({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, UserType>> {
    const eitherUser = await this._repository.getUser({ userId });

    if (isLeft(eitherUser)) {
      console.error(
        "user left in profile use cases ",
        JSON.stringify(eitherUser.left)
      );
      console.error(
        "user invalid value in profile use cases ",
        JSON.stringify(eitherUser.left.invalidValue)
      );

      return eitherUser;
    }
    const user = userSchema.safeParse(eitherUser.right);
    if (!user.success) {
      console.error(
        "user left in profile use cases parsing user ",
        JSON.stringify(user.error.errors)
      );
      console.error(
        "erro cause in profile use cases parsing user ",
        JSON.stringify(user.error.cause)
      );
      console.error(
        "erro cause in profile use cases parsing user ",
        JSON.stringify(user.error.message),
        JSON.stringify(user.error.issues),
        JSON.stringify(user.error.name)
      );

      return left(
        Failure.invalidValue({
          invalidValue: user.error.errors.toString(),
          message: "User data is invalid",
        })
      );
    }
    return right(user.data);
  }

  async saveUser({
    userId,
    user,
  }: SaveUserOptions): Promise<Either<Failure<string>, void>> {
    const eitherUser = await this._repository.saveUser({ userId, user });

    if (isLeft(eitherUser)) {
      return eitherUser;
    }

    return right(undefined);
  }
}

export const profileUseCases = new ProfileUseCases({
  repository: profileRepository,
});
