import useGetUserInfra from "../services/useGetUserInfra";
import { Either, left, right } from "fp-ts/Either";
import Failure from "@/core/failures/failures";
import type { UserType } from "../../domain/entities/user-schema";

export type UserInfra = ReturnType<typeof useGetUserInfra>["user"];

export default class UserDto {
  static fromInfra({
    userInfra,
  }: {
    userInfra: UserInfra;
  }): Either<Failure<string>, UserType> {
    if (userInfra === "NO USER") {
      return left(
        Failure.invalidValue({
          invalidValue: userInfra,
          message: "User not found",
        })
      );
    } else if (userInfra) {
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
