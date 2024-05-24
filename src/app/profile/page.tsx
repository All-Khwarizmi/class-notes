import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { profileUseCases } from "@/features/profile/application/usecases/profile-usecases";
import UserProfile from "@/features/profile/presentation/views/UserProfile";
import { isLeft } from "fp-ts/lib/Either";
export default async function Page() {
  const authUser = await authUseCases.getUserAuth();
  const user = await profileUseCases.getUser({
    userId: isLeft(authUser) ? "" : authUser.right.userId,
  });

  if (isLeft(user)) {
    return <h1>User not found</h1>;
  }
  return <UserProfile user={user.right} />;
}
