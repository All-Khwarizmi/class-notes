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
      console.log(eitherUser);
      return eitherUser;
    }
    const user = userSchema.safeParse(eitherUser.right);
    if (!user.success) {
      console.log(user.error);
      return left(
        Failure.invalidValue({
          invalidValue: eitherUser.right,
          message: "User data is invalid",
        })
      );
    }
    return right(user.data);
  }
}

export const profileUseCases = new ProfileUseCases({
  repository: profileRepository,
});
