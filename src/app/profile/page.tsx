import { profileUseCases } from "@/features/profile/application/usecases/profile-usecases";
import { currentUser } from "@clerk/nextjs";
import { isLeft } from "fp-ts/lib/Either";
export default async function Page() {
  const authUser = await currentUser();
  const user = await profileUseCases.getUser({
    userId: authUser?.id || "",
  });

  if (isLeft(user)) {
    return <h1>User not found</h1>;
  }
  return (
    <div>
      <h1>{user.right.name}</h1>
    </div>
  );
}
