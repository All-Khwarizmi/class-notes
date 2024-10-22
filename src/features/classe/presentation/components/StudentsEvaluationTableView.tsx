'use client';

import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import { ScrollArea } from '@/core/components/ui/scroll-area';
import { Skeleton } from '@/core/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/components/ui/table';
import useGetStudentTableData from '@/features/evaluation/application/adapters/services/useGetStudentTableData';
import calculateOverallGrade from '@/features/evaluation/application/adapters/utils/calculate-overall-grade';
import StudentUpdateForm from '@/features/student/presentation/components/StudentUpdateForm';
import { Settings, UserPlus } from 'lucide-react';
import React, { useState } from 'react';

import { Id } from '../../../../../convex/_generated/dataModel';
import AddStudentForm from '../../../student/presentation/components/AddStudentForm';
import AssignEvaluation from './AssignEvaluation';
import CSVReader from './StudentCsvLoader';
import UpdateStudentGradeForm from './UpdateStudentGradeForm';

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
    <div className="flex flex-col h-full">
      <Card className="flex-grow overflow-hidden">
        <CardHeader>
          <CardTitle>Évaluations des étudiants</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="p-4">
              <Table>
                <TableCaption>
                  Notes globales des étudiants dans différentes évaluations.
                  Cliquez sur une note pour voir les critères détaillés.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Étudiant</TableHead>
                    {data.evaluations.map((evaluation) => (
                      <TableHead
                        key={evaluation.grade.id}
                        className="w-[150px]"
                      >
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
                          : 'N/A';
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
                              'N/A'
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex justify-center gap-4">
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
              classId={classeId as Id<'Classes'>}
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
    </div>
  );
}
