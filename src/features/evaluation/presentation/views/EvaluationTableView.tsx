"use client";

import React from "react";
import Link from "next/link";
import { Delete, ExternalLink, Plus } from "lucide-react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
  TableHeader,
} from "@/core/components/ui/table";
import { Button } from "@/core/components/ui/button";
import { EvaluationBaseType } from "../../domain/entities/evaluation-schema";
import useDeleteEvaluationBase from "../../application/adapters/services/useDeleteEvaluationBase";
import useIsEvaluationAssigned from "../../application/adapters/services/useIsEvaluationAssigned";
import { isLeft } from "fp-ts/lib/Either";
import {
  HeaderTypographyH1,
  TypographyH1,
} from "@/core/components/common/Typography";
import { useRouter } from "next/navigation";
import DeleteTableButton from "@/core/components/common/DeleteTableButton";
import useGetEvaluationsBaseList from "../../application/adapters/services/useGetEvaluationsBaseList";
import { toastWrapper } from "@/core/utils/toast-wrapper";
import EvaluationCard from "../components/EvaluationCard";

function EvaluationTableView({ userId }: { userId: string }) {
  const { data: evaluations, refetch } = useGetEvaluationsBaseList({ userId });
  const router = useRouter();
  const { mutate: deleteEvaluationBase } = useDeleteEvaluationBase();
  const {
    mutate: checkIfEvalIsAssgined,
    data: isEvaluationAssigned,
    isPending,
  } = useIsEvaluationAssigned();
  function handleDelete(evaluationId: string) {
    checkIfEvalIsAssgined(
      {
        evaluationId: evaluationId,
      },

      {
        onSuccess: (data) => {
          if (isLeft(data)) {
            toastWrapper.error(
              "Could not make the relevant checks to be able to safely delete the evaluation. Please try again later."
            );
            return;
          }
          if (data.right === true) {
            confirm(
              `The evaluation is assigned to at least a class. Deleting the evaluation will remove all together with the grades. Are you sure you want to proceed?`
            ) &&
              deleteEvaluationBase({
                evaluationId: evaluationId,
              });
            return;
          } else {
            confirm(
              `Are you sure you want to delete the evaluation? This action is irreversible.`
            ) &&
              deleteEvaluationBase(
                {
                  evaluationId: evaluationId,
                },
                {
                  onSuccess: async () => {
                    await refetch();
                  },
                }
              );
          }
        },
        onError: () => {
          alert(
            "Could not make the relevant checks to be able to safely delete the evaluation. Please try again later."
          );
        },
      }
    );
  }

  if (!evaluations || isLeft(evaluations)) return null;
  return (
    <div className="w-full h-full p-4 ">
      <HeaderTypographyH1 text="Evaluations" />
      <div className="w-full">
        <div className="space-y-4 flex flex-col w-full">
          {evaluations.right.map((evaluation: EvaluationBaseType) => (
            <EvaluationCard
              key={evaluation.id}
              name={evaluation.name}
              description={evaluation.description ?? ""}
              isGraded={evaluation.isGraded}
              onView={() => router.push(`/evaluations/${evaluation.id}`)}
              deleteEvaluation={() => handleDelete(evaluation.id)}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <Link href="/evaluations/add">
          <Button>
            <Plus size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default EvaluationTableView;
