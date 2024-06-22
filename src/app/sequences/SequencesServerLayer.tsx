import React from "react";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import SequencesListView from "@/features/cours-sequence/presentation/views/SequencesListView";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import LayoutWithProps from "@/core/components/layout/LayoutWithProps";

async function SequencesServerLayer() {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const eitherSequences = await coursUsecases.getAllSequences({
    userId: authUser.right.userId,
  });
  if (isLeft(eitherSequences)) {
    return (
      <LayoutWithProps isEmpty>
        <ErrorDialog
          message={`
      An error occurred while fetching sequences. 
    `}
          code={eitherSequences.left.code}
          description={eitherSequences.left.message}
        />
      </LayoutWithProps>
    );
  }
  return (
    <LayoutWithProps>
      <SequencesListView
        sequences={eitherSequences.right}
        userId={authUser.right.userId}
      />
    </LayoutWithProps>
  );
}

export default SequencesServerLayer;
