import useGetUserInfra from "./useGetUserInfra";
import { Either, left, right } from "fp-ts/Either";
import Failure from "@/core/failures/failures";
import type { UserType } from "../../domain/user/user-schema";


export type UserInfra = ReturnType<typeof useGetUserInfra>["user"];

export default class UserDto {
  static fromInfra({
    userInfra,
  }: {
    userInfra: UserInfra;
  }): Either<Failure, UserType> {
    if (userInfra) {
      return right({
        id: userInfra._id,
        schoolSubject: userInfra.schoolSubject,
        name: userInfra.name,
        onboarding: userInfra.onboarding,
      });
    }
    return left(
      Failure.invalidValue({
        invalidValue: userInfra,
        message: "User not found",
      })
    );
  } // Add the User type
}
