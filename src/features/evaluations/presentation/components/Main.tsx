"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useSession } from "@clerk/nextjs";
import { Button } from "@/core/components/ui/button";
import EvaluationGrid from "./EvaluationGrid";
import { evaluationsRepository } from "../../application/repository/evaluations-repository";
import authRepositoy from "@/features/auth/application/repository/auth-repository";

export default function Main() {
  const { authUserId } = authRepositoy.useGetUserId();
  const { setIsCreating } = evaluationsRepository.useStartEvaluationCreation();
  //!Refactor to use useEvaluationTemplatesByCreator
  const templates = useQuery(
    api.evaluation_template.listEvaluationTemplatesByCreator,
    {
      userId: authUserId || "",
    }
  );
  //! Add loading skeleton
  return (
    <section className="h-full w-full flex flex-col gap-4 md:justify-between justify-around p-4">
      <EvaluationGrid templates={templates} />
      <footer className="flex justify-center pb-4">
        <Button
          onClick={() => {
            setIsCreating();
          }}
          variant="default"
        >
          Créer Évaluation
        </Button>
      </footer>
    </section>
  );
}
