import { currentUser } from "@clerk/nextjs";
import IAuth from "../i-auth";
import { left, right } from "fp-ts/lib/Either";
import Failure from "@/core/failures/failures";

export default class ClerkAuth extends IAuth {
  async getUserAuthInfra() {
    const user = await currentUser();
    if (!user) {
      return left(
        Failure.invalidValue({ message: "User not found", invalidValue: user })
      );
    }
    return right({
      userId: user.id,
      email: user.emailAddresses[0].emailAddress,
      name: `${user.firstName} ${user.lastName}`,
    });
  }
}

export const clerkAuth = new ClerkAuth();
