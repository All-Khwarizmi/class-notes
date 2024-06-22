import React from "react";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import ClasseSequencesTableView from "@/features/cours-sequence/presentation/views/ClasseSequencesTableView";
import LayoutWithProps from "@/core/components/layout/LayoutWithProps";

async function ClasseSequencesServerLayer(props: { slug: string }) {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const eitherSequences = await coursUsecases.getAllSequences({
    userId: authUser.right.userId,
  });
  const eitherClasseSequences = await coursUsecases.getClasseSequences({
    classeId: props.slug,
  });
  if (isLeft(eitherSequences)) {
    return (
      <LayoutWithProps isEmpty>
        <ErrorDialog
          message="An error occurred"
          description="An error occurred while fetching sequences"
          code={eitherSequences.left.code}
        />
      </LayoutWithProps>
    );
  }

  if (isLeft(eitherClasseSequences)) {
    return (
      <LayoutWithProps isEmpty>
        <ErrorDialog
          message="An error occurred"
          description="An error occurred while fetching classe sequences"
          code={eitherClasseSequences.left.code}
        />
      </LayoutWithProps>
    );
  }

  return (
    <LayoutWithProps>
      <ClasseSequencesTableView
        sequences={eitherSequences.right}
        classeId={props.slug}
        classeSequences={eitherClasseSequences.right}
      />
    </LayoutWithProps>
  );
}

export default ClasseSequencesServerLayer;
