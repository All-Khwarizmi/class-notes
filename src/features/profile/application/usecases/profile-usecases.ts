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
      return eitherUser;
    }
    const user = userSchema.safeParse(eitherUser.right);

    if (!user.success) {
      return left(
        Failure.invalidValue({
          invalidValue: eitherUser.right,
          message: "User data is invalid",
        })
      );
    }
    return right(user.data);
  }

  async saveUser({
    userId,
    user,
  }: {
    userId: string;
    user: Pick<UserType, "name" | "schoolSubject">;
  }): Promise<Either<Failure<string>, void>> {
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
