import NotFound from "@/app/not-found";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import CoursView from "@/features/cours-sequence/presentation/views/CoursView";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    return <NotFound />;
  }
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const eitherCours = await coursUsecases.getSingleCours({
    userId: authUser.right.userId,
    coursId: params.slug,
  });
  if (isLeft(eitherCours)) {
    return <NotFound />;
  }
  const cours = eitherCours.right;
  return <CoursView cours={cours} userId={authUser.right.userId} />;
}
