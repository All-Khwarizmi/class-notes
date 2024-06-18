import ErrorDialog from "@/core/components/common/ErrorDialog";
import LayoutWithProps from "@/core/components/layout/LayoutWithProps";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import getStudents from "@/features/classe/application/adapters/actions/get-students";
import { ClasseTableType } from "@/features/classe/domain/class-schema";
import { StudentsEvaluationTableView } from "@/features/classe/presentation/components/StudentsEvaluationTableView";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import getEvaluationCompoundList from "@/features/evaluation/application/adapters/actions/get-evaluation-compound-list";
import getClassNavItems from "@/features/evaluation/application/adapters/utils/get-classe-nav-items";
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
      <LayoutWithProps isEmpty>
        <ErrorDialog
          message="An error occurred"
          description="An error occurred while fetching sequences"
          code={eitherSequences.left.code}
        />
      </LayoutWithProps>
    );
  }

  const eitherCompoundEvaluations = await getEvaluationCompoundList({
    classeId: props.slug,
  });

  if (isLeft(eitherCompoundEvaluations)) {
    return (
      <LayoutWithProps isEmpty>
        <ErrorDialog
          message="An error occurred"
          description="An error occurred while fetching evaluations"
          code={eitherCompoundEvaluations.left.code}
        />
      </LayoutWithProps>
    );
  }

  const eitherStudents = await getStudents({ classeId: props.slug });
  if (isLeft(eitherStudents)) {
    return (
      <LayoutWithProps isEmpty>
        <ErrorDialog
          message="An error occurred"
          description="An error occurred while fetching students"
          code={eitherStudents.left.code}
        />
      </LayoutWithProps>
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
    <LayoutWithProps navItems={classeNavItems}>
      <StudentsEvaluationTableView
        tableData={tableData}
        classeId={props.slug}
        userId={authUser.right.userId}
      />
    </LayoutWithProps>
  );
}

export default ClasseServerLayer;
