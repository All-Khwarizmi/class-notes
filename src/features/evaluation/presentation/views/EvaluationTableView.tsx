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
import { TypographyH1 } from "@/core/components/common/Typography";
import { useRouter } from "next/navigation";
import DeleteTableButton from "@/core/components/common/DeleteTableButton";

function EvaluationTableView({
  evaluations,
}: {
  evaluations: EvaluationBaseType[];
}) {
  const router = useRouter();
  const { mutate: deleteEvaluationBase } = useDeleteEvaluationBase();
  const {
    mutate: checkIfEvalIsAssgined,
    data: isEvaluationAssigned,
    isPending,
  } = useIsEvaluationAssigned();
  return (
    <div className="w-full h-full p-4 py-8">
      <header className="pb-8">
        <TypographyH1 text="Evaluations" />
      </header>
      <Table className="w-full">
        <TableCaption>
          List of base evaluations. Click on the link to view details.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[200px]">Description</TableHead>
            <TableHead className="w-[100px]">Graded</TableHead>
            <TableHead className="w-[150px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {evaluations.map((evaluation) => (
            <TableRow
              key={evaluation.id}
              className="cursor-pointer"
              onClick={() => {
                router.push(`/evaluations/${evaluation.id}`);
              }}
            >
              <TableCell className="w-[200px]">{evaluation.name}</TableCell>
              <TableCell className="w-[200px]">
                {evaluation.description}
              </TableCell>
              <TableCell className="w-[100px]">
                {evaluation.isGraded ? "Yes" : "No"}
              </TableCell>

              <TableCell className="w-[150px]">
                <div>
                  <DeleteTableButton
                    onClick={async () => {
                      // Check if the evaluation is assigned to a class
                      checkIfEvalIsAssgined(
                        {
                          evaluationId: evaluation.id,
                        },

                        {
                          onSuccess: (data) => {
                            if (isLeft(data)) {
                              alert(
                                "Could not make the relevant checks to be able to safely delete the evaluation. Please try again later."
                              );
                              return;
                            }
                            if (data.right === true) {
                              confirm(
                                `The evaluation is assigned to at least a class. Deleting the evaluation will remove all together with the grades. Are you sure you want to proceed?`
                              ) &&
                                deleteEvaluationBase({
                                  evaluationId: evaluation.id,
                                });
                              return;
                            } else {
                              confirm(
                                `Are you sure you want to delete the evaluation? This action is irreversible.`
                              ) &&
                                deleteEvaluationBase({
                                  evaluationId: evaluation.id,
                                });
                            }
                          },
                          onError: () => {
                            alert(
                              "Could not make the relevant checks to be able to safely delete the evaluation. Please try again later."
                            );
                          },
                        }
                      );
                    }}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-8">
        <Link href="/evaluations/add">
          <Button >
            <Plus size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default EvaluationTableView;
