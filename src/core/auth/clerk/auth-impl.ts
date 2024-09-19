import { auth, currentUser,  } from "@clerk/nextjs";
import IAuth from "../i-auth";
import { left, right } from "fp-ts/lib/Either";
import Failure from "@/core/failures/failures";

export async function getAuthToken() {
  return (await auth().getToken({ template: "convex" })) ?? undefined;
}
export default class ClerkAuth extends IAuth {
  async getUserAuthInfra() {
    const authentication = await getAuthToken();
    console.log("authentication TOKEN in getUSer infra", { authentication });
    const user = await currentUser();
    console.log("user in getUSer infra", { user });
    if (!user) {
      return left(
        Failure.invalidValue({
          message: "User not found",
          invalidValue: user,
          code: "AUTH101",
        })
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
