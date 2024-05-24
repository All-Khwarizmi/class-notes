import LoadingPage from "@/core/components/common/LoadingPage";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { profileUseCases } from "@/features/profile/application/usecases/profile-usecases";
import UserProfile from "@/features/profile/presentation/views/UserProfile";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import { Suspense } from "react";
export default async function Page() {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const user = await profileUseCases.getUser({
    userId: authUser.right.userId,
  });

  return (
    <Suspense fallback={<LoadingPage />}>
      <UserProfile
        user={
          isLeft(user)
            ? {
                name: "",
                schoolSubject: "",
                _id: authUser.right.userId,
                onboarding: false,
              }
            : user.right
        }
      />
    </Suspense>
  );
}
