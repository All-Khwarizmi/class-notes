import Failure from '@/core/failures/failures';
import { auth, currentUser } from '@clerk/nextjs';
import { left, right } from 'fp-ts/lib/Either';

import IAuth from '../i-auth';

export async function getAuthToken() {
  return (await auth().getToken({ template: 'convex' })) ?? undefined;
}
export default class ClerkAuth extends IAuth {
  async getUserAuthInfra() {
    const authentication = await getAuthToken();
    const user = await currentUser();
    if (!user) {
      return left(
        Failure.invalidValue({
          message: 'User not found',
          invalidValue: user,
          code: 'AUTH101',
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
