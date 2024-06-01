import React from "react";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import NotFound from "../not-found";
import SequencesListView from "@/features/cours-sequence/presentation/views/SequencesListView";
import Sidebar from "@/core/components/layout/Sidebar";

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
  return (
    <>
      <Sidebar />
      <section className="h-full flex-1  overflow-x-hidden">
        <div className="h-full py-8 px-6">
          <SequencesListView sequences={eitherSequences.right} />
        </div>
      </section>
    </>
  );
}

export default SequencesServerLayer;
