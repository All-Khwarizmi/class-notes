import React from "react";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import Sidebar from "@/core/components/layout/Sidebar";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import ClasseSequencesTableView from "@/features/cours-sequence/presentation/views/ClasseSequencesTableView";

async function ClasseSequencesServerLayer(props: { slug: string }) {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const eitherSequences = await coursUsecases.getAllSequences({
    userId: authUser.right.userId,
  });
  if (isLeft(eitherSequences)) {
    return (
      <ErrorDialog
        message="An error occurred"
        description="An error occurred while fetching sequences"
        code={eitherSequences.left.code}
      />
    );
  }

  return (
    <>
      <Sidebar />
      <section className="h-full flex-1  overflow-x-hidden">
        <div className="h-full py-8 px-6">
          <ClasseSequencesTableView
            sequences={eitherSequences.right}
            classeId={props.slug}
          />
        </div>
      </section>
    </>
  );
}

export default ClasseSequencesServerLayer;
