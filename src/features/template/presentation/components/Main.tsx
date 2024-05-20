"use client";
import { Button } from "@/core/components/ui/button";
import EvaluationGrid from "./TemplateGrid";
import { templatesRepository } from "../../application/repository/templates-repository";
import authRepositoy from "@/features/auth/application/repository/auth-repository";
import CustomDialog from "@/core/components/common/CustomDialog";
import AddIcon from "@/core/components/icons/AddIcon";
import AddTemplateForm from "./AddTemplateForm";
import { useTemplateCreationStore } from "../../common/template-store";
import WarningIcon from "@/core/components/icons/WarningIcon";

export default function Main() {
  const { authUserId } = authRepositoy.useGetUserId();
  const { isCreating } = useTemplateCreationStore((state) => ({
    isCreating: state.isCreating,
  }));
  //! Add loading skeleton
  return (
    <section className="h-full w-full flex flex-col gap-4 md:justify-between justify-around p-4">
      <EvaluationGrid userId={authUserId || ""} />
      <footer className="flex justify-center pb-4">
        <CustomDialog
          icon={isCreating ? <WarningIcon /> : <AddIcon />}
          title="Ajouter une évaluation"
          testId="add-template-dialog"
        >
          <AddTemplateForm />
        </CustomDialog>
      </footer>
    </section>
  );
}
