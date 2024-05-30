import AddUpdateCoursSequenceView from "@/features/cours-sequence/presentation/views/AddCoursView";
import { compCatUsecases } from "@/features/comp-cat/application/usecases/comp-cat-usecases";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import { Competence } from "@/features/comp-cat/domain/entities/schemas";

export default async function Page() {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const eitherCompetences = await compCatUsecases.getCompetences({
    userId: authUser.right.userId,
  });
  let competences: Competence[] = [];
  if (!isLeft(eitherCompetences)) {
    competences = eitherCompetences.right;
  } else {
    competences = [];
  }
  return (
    <AddUpdateCoursSequenceView
      competences={competences}
      authUser={authUser.right}
      type="cours"
      title="Add Cours"
    />
  );
}
