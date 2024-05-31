import React from 'react'
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import NotFound from "../not-found";
import SequencesListView from "@/features/cours-sequence/presentation/views/SequencesListView";

async function SequencesServerLayer() {
      const authUser = await authUseCases.getUserAuth();
      if (isLeft(authUser)) {
        redirect("/login");
      }
      const eitherSequences = await coursUsecases.getAllSequences({
        userId: authUser.right.userId,
      });
      if (isLeft(eitherSequences)) {
        return <NotFound />;
      }
  return <SequencesListView sequences={eitherSequences.right} />;
}

export default SequencesServerLayer