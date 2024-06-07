import NotFound from "@/app/not-found";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { classeUsecases } from "@/features/classe/application/usecases";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { ClassType } from "@/features/classe/domain/class-schema";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import { User } from "lucide-react";
import UserSpaceClassesGridView from "@/features/spaces/presentation/views/UserSpaceClassesGridView";

async function UserSpace(props: { slug: string }) {
  if (!props.slug) {
    return <NotFound />;
  }
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const eitherClasses = await classeUsecases.getClasses({
    id: authUser.right.userId,
  });
  if (isLeft(eitherClasses)) {
    return (
      <ErrorDialog
        message={`
         Une erreur s'est produite lors du chargement des classes
         ${
           process.env.NODE_ENV === "development"
             ? eitherClasses.left.message
             : ""
         }
        `}
        code={eitherClasses.left.code}
        description={eitherClasses.left.message}
      />
    );
  }
  const classes: ClassType[] = [];

  for (const classe of eitherClasses.right) {
    if (classe.publish === true) {
      classes.push(classe);
    }
  }
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <UserSpaceClassesGridView classes={classes} />
    </Suspense>
  );
}

export default UserSpace;
