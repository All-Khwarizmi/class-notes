import ErrorDialog from "@/core/components/common/ErrorDialog";
import Dashboard from "@/core/components/icons/Dashboard";
import Sidebar from "@/core/components/layout/Sidebar";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import StudentsTable from "@/features/classe/presentation/components/StudentsTable";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import getClassNavItems from "@/features/evaluation/application/adapters/utils/get-classe-nav-items";
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

  const classeNavItems = getClassNavItems({
    sequences: eitherSequences.right,
    classeId: props.slug,
  });
  return (
    <>
      <Sidebar navItems={classeNavItems} />
      <section className="h-full flex-1  overflow-x-hidden">
        <div className="h-full pt-4 px-4">
          <StudentsTable classId={props.slug} />
        </div>
      </section>
    </>
  );
}

export default ClasseServerLayer;
