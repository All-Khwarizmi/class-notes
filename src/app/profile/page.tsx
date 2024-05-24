import { profileUseCases } from "@/features/profile/application/usecases/profile-usecases";
import { isLeft } from "fp-ts/lib/Either";
export default async function Page() {
  const user = await profileUseCases.getUser({
    userId: "user_2eBWORVbe9p5HUGoR9JjAtBRGpU",
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
