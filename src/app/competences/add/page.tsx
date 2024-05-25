import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { compCatUsecases } from "@/features/comp-cat/application/usecases/comp-cat-usecases";
import CompetenceForm from "@/features/comp-cat/presentation/views/CompetenceForm";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";

export default async function Page() {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const categories = await compCatUsecases.getCategories({
    userId: authUser.right.userId,
  });
  if (isLeft(categories)) {
    console.error(categories.left);
    return <div>Something went wrong</div>;
  }

  return (
   <CompetenceForm categories={categories.right} userId={authUser.right.userId} />  
  );
}
