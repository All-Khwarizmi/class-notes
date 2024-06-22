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

function EvaluationTableView({
  evaluations,
}: {
  evaluations: EvaluationBaseType[];
}) {
  const { mutate: deleteEvaluationBase } = useDeleteEvaluationBase();
  return (
    <div className="w-full h-full p-4">
      <Table className="w-full">
        <TableCaption>
          List of base evaluations. Click on the link to view details.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[200px]">Description</TableHead>
            <TableHead className="w-[100px]">Graded</TableHead>
            <TableHead className="w-[200px]">Created At</TableHead>
            <TableHead className="w-[150px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {evaluations.map((evaluation) => (
            <TableRow key={evaluation.id}>
              <TableCell className="w-[200px]">{evaluation.name}</TableCell>
              <TableCell className="w-[200px]">
                {evaluation.description}
              </TableCell>
              <TableCell className="w-[100px]">
                {evaluation.isGraded ? "Yes" : "No"}
              </TableCell>

              <TableCell className="w-[200px]">
                {new Date(evaluation.createdAt).toDateString()}
              </TableCell>
              <TableCell className="w-[150px]">
                <div>
                  <Link href={`/evaluations/${evaluation.id}`}>
                    <Button variant="link">
                      <ExternalLink
                        className="text-blue-500"
                        size={16}
                      />
                    </Button>
                  </Link>
                  <button
                    onClick={() =>
                      confirm(`
                      Are you sure you want to delete the evaluation?
                      `) &&
                      deleteEvaluationBase({ evaluationId: evaluation.id })
                    }
                  >
                    <Delete size={16} className="text-red-500" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4">
        <Link href="/evaluations/add">
          <Button variant="outline">
            <Plus size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default EvaluationTableView;
