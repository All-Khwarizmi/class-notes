import ErrorDialog from "@/core/components/common/ErrorDialog";
import Sidebar from "@/core/components/layout/Sidebar";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import getStudents from "@/features/classe/application/adapters/actions/get-students";
import { ClasseTableType } from "@/features/classe/domain/class-schema";
import { StudentsEvaluationTableView } from "@/features/classe/presentation/components/StudentsEvaluationTableView";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import getEvaluationCompoundList from "@/features/evaluation/application/adapters/actions/get-evaluation-compound-list";
import getClassNavItems from "@/features/evaluation/application/adapters/utils/get-classe-nav-items";
import { evaluationUsecases } from "@/features/evaluation/application/usecases/evaluation-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import React from "react";

async function ClasseServerLayer(props: { slug: string }) {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const eitherSequences = await coursUsecases.getClasseSequences({
    classeId: props.slug,
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

  const eitherCompoundEvaluations = await getEvaluationCompoundList({
    classeId: props.slug,
  });

  if (isLeft(eitherCompoundEvaluations)) {
    return (
      <ErrorDialog
        message="An error occurred"
        description="An error occurred while fetching evaluations"
        code={eitherCompoundEvaluations.left.code}
      />
    );
  }

  const eitherStudents = await getStudents({ classeId: props.slug });
  if (isLeft(eitherStudents)) {
    return (
      <ErrorDialog
        message="An error occurred"
        description="An error occurred while fetching students"
        code={eitherStudents.left.code}
      />
    );
  }

  const classeNavItems = getClassNavItems({
    sequences: eitherSequences.right,
    classeId: props.slug,
  });

  const tableData: ClasseTableType = {
    students: eitherStudents.right,
    evaluations: eitherCompoundEvaluations.right,
  };
  return (
    <>
      <Sidebar navItems={classeNavItems} />
      <section className="h-full flex-1  overflow-x-hidden">
        <div className="h-full pt-4 px-4">
          <StudentsEvaluationTableView
            tableData={tableData}
            classeId={props.slug}
            userId={authUser.right.userId}
          />
        </div>
      </section>
    </>
  );
}

export default ClasseServerLayer;
