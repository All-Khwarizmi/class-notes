import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import React from "react";
import NotFound from "../not-found";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import ClassesTable from "@/features/classe/presentation/components/ClassesTable";
import { classeUsecases } from "@/features/classe/application/usecases/classe-usecases";
import LayoutWithProps from "@/core/components/layout/LayoutWithProps";

async function ClassesServerLayer(props: { slug: string }) {
  if (!props.slug) {
    return (
      <LayoutWithProps isEmpty>
        <NotFound />
      </LayoutWithProps>
    );
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
      <LayoutWithProps isEmpty>
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
      </LayoutWithProps>
    );
  }

  return (
    <LayoutWithProps>
      <ClassesTable
        classes={eitherClasses.right}
        userId={authUser.right.userId}
      />
    </LayoutWithProps>
  );
}

export default ClassesServerLayer;
