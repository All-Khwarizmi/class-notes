import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { compCatUsecases } from "@/features/comp-cat/application/usecases/comp-cat-usecases";
import CompetencesTable from "@/features/comp-cat/presentation/views/CompetencesTable";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";

export default async function Page() {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const compAndCat = await compCatUsecases.getCategoriesAndCompetences({
    userId: authUser.right.userId,
  });
  if (isLeft(compAndCat)) {
    console.error(compAndCat.left);
    return <div>Something went wrong</div>;
  }

  return (
    <>
      <CompetencesTable
        competences={compAndCat.right.competences}
        categories={compAndCat.right.categories}
        userId={authUser.right.userId}
      />
    </>
  );
}
