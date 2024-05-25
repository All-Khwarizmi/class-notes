import { compCatUsecases } from "@/features/comp-cat/application/usecases/comp-cat-usecases";
import AddCoursForm from "../components/AddCoursForm";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import { Competence } from "@/features/comp-cat/domain/entities/schemas";

export default async function AddCoursView() {
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
    <div>
      <AddCoursForm competences={competences} />
    </div>
  );
}
