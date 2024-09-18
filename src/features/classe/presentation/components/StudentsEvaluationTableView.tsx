"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";
import { Button } from "@/core/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/core/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/components/ui/card";
import { ScrollArea } from "@/core/components/ui/scroll-area";
import { Settings, UserPlus, FileSpreadsheet } from "lucide-react";
import AssignEvaluation from "./AssignEvaluation";
import UpdateStudentGradeForm from "./UpdateStudentGradeForm";
import calculateOverallGrade from "@/features/evaluation/application/adapters/utils/calculate-overall-grade";
import AddStudentForm from "../../../student/presentation/components/AddStudentForm";
import { Id } from "../../../../../convex/_generated/dataModel";
import useGetStudentTableData from "@/features/evaluation/application/adapters/services/useGetStudentTableData";
import CSVReader from "./StudentCsvLoader";
import StudentUpdateForm from "@/features/student/presentation/components/StudentUpdateForm";
import { Skeleton } from "@/core/components/ui/skeleton";

interface StudentsEvaluationTableViewProps {
  classeId: string;
  userId: string;
}

export function StudentsEvaluationTableView({
  classeId,
  userId,
}: StudentsEvaluationTableViewProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<Record<string, boolean>>({});
  const {
    tableData: data,
    isLoading,
    refetchCompoundEvaluations,
    refetchStudents,
  } = useGetStudentTableData({ classeId });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Chargement des données...</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-[300px]" />
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Erreur</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Impossible de charger les données. Veuillez réessayer plus tard.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Évaluations des étudiants</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <Table className="">
            <TableCaption>
              Notes globales des étudiants dans différentes évaluations. Cliquez
              sur une note pour voir les critères détaillés.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Étudiant</TableHead>
                {data.evaluations.map((evaluation) => (
                  <TableHead key={evaluation.grade.id} className="w-[150px]">
                    {evaluation.base.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="link">{student.name}</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Mettre à jour les informations de {student.name}
                          </DialogTitle>
                        </DialogHeader>
                        <StudentUpdateForm
                          student={student}
                          classeId={classeId}
                          refetch={refetchStudents}
                        />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  {data.evaluations.map((evaluation) => {
                    const studentGrade = evaluation.grade.grades.find(
                      (grade) => grade.studentId === student.id
                    );
                    const overallGrade = studentGrade
                      ? calculateOverallGrade({
                          grades: studentGrade.grades,
                          criteria: evaluation.base.criterias,
                          gradeType: evaluation.base.gradeType,
                        })
                      : "N/A";
                    const dialogKey = `${student.id}-${evaluation.grade.id}`;

                    return (
                      <TableCell key={evaluation.grade.id}>
                        {studentGrade ? (
                          <Dialog
                            open={isDialogOpen[dialogKey]}
                            onOpenChange={(value) =>
                              setIsDialogOpen((prev) => ({
                                ...prev,
                                [dialogKey]: value,
                              }))
                            }
                          >
                            <DialogTrigger asChild>
                              <Button variant="link">
                                {overallGrade.toString()}
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Mettre à jour la note de {student.name}
                                </DialogTitle>
                              </DialogHeader>
                              <UpdateStudentGradeForm
                                studentGrade={studentGrade}
                                evaluationBase={evaluation.base}
                                evaluationId={evaluation.grade.id}
                                classeId={classeId}
                                setIsDialogOpen={(value) =>
                                  setIsDialogOpen((prev) => ({
                                    ...prev,
                                    [dialogKey]: value,
                                  }))
                                }
                                studentName={student.name}
                                refetch={refetchCompoundEvaluations}
                              />
                            </DialogContent>
                          </Dialog>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        <div className="flex justify-center mt-8 gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Settings className="mr-2 h-4 w-4" />
                Assigner une évaluation
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Paramètres des évaluations</DialogTitle>
              </DialogHeader>
              <AssignEvaluation classeId={classeId} userId={userId} />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Ajouter un étudiant
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un étudiant</DialogTitle>
              </DialogHeader>
              <AddStudentForm
                classId={classeId as Id<"Classes">}
                refetch={() => {
                  refetchStudents();
                  refetchCompoundEvaluations();
                }}
              />
              <CSVReader
                classeId={classeId}
                refetchCompoundEvaluations={() => {
                  refetchStudents();
                  refetchCompoundEvaluations();
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
