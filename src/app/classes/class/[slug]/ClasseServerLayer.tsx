import ErrorDialog from "@/core/components/common/ErrorDialog";
import Dashboard from "@/core/components/icons/Dashboard";
import Sidebar from "@/core/components/layout/Sidebar";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import getStudents from "@/features/classe/application/adapters/actions/get-students";
import { ClasseTableType } from "@/features/classe/domain/class-schema";
import { StudentsEvaluationTableView } from "@/features/classe/presentation/components/ClasseTable";
import StudentsTable from "@/features/classe/presentation/components/StudentsTable";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import getClassNavItems from "@/features/evaluation/application/adapters/utils/get-classe-nav-items";
import { evaluationUsecases } from "@/features/evaluation/application/usecases/evaluation-usecases";
import { NavItem } from "@/lib/types";
import { isLeft } from "fp-ts/lib/Either";
import {
  CandlestickChart,
  NotebookPen,
  Plus,
  Presentation,
} from "lucide-react";
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

  const eitherCompoundEvaluations = await evaluationUsecases.getEvaluationsList(
    {
      classeId: props.slug,
    }
  );

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
  console.log(tableData);
  return (
    <>
      <Sidebar navItems={classeNavItems} />
      <section className="h-full flex-1  overflow-x-hidden">
        <div className="h-full pt-4 px-4">
          {/* <StudentsTable classId={props.slug} /> */}
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
