"use client";
import React, { useState } from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
  TableHeader,
} from "@/core/components/ui/table";
import { CompoundEvaluationType } from "../../domain/class-schema";
import CustomDialog from "@/core/components/common/CustomDialog";
import AssignEvaluation from "./AssignEvaluation";
import UpdateStudentGradeForm from "./UpdateStudentGradeForm";
import calculateOverallGrade from "@/features/evaluation/application/adapters/utils/calculate-overall-grade";
import AddStudentForm from "./AddStudentForm";
import { Id } from "../../../../../convex/_generated/dataModel";
import { Settings } from "lucide-react";
import useGetStudentTableData from "@/features/evaluation/application/adapters/services/useGetStudentTableData";
import LayoutWithProps from "@/core/components/layout/LayoutWithProps";
import CSVReader from "./StudentCsvLoader";

export function StudentsEvaluationTableView(props: {
  classeId: string;
  userId: string;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState<{
    [key in string]: boolean;
  }>({});
  const {
    tableData: data,
    isLoading,
    classeNavItems,
    refetchCompoundEvaluations,
  } = useGetStudentTableData({ classeId: props.classeId });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (data) {
    return (
      <LayoutWithProps navItems={classeNavItems}>
        <div className="w-full h-full">
          <Table className="w-full">
            <TableCaption>
              Overall grades of students in different evaluations. Click on the
              grade to view detailed criteria.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Student</TableHead>
                {data?.evaluations.map((evaluation) => (
                  <TableHead key={evaluation.grade.id} className="w-[200px]">
                    {evaluation.base.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* 
            Loop through the students and evaluations to display the grades.
            For each student, display the overall grade of the evaluation.
            If the student has a grade, display a dialog with the detailed criteria.
          */}
              {data?.students.map((student, index) => (
                <TableRow key={student.id}>
                  <TableCell className="w-[200px]">{student.name}</TableCell>
                  {/* 
                Loop through the evaluations and find the grade of the student.
                If the student has a grade, display the overall grade.
                If the student doesn't have a grade, display "N/A".
              */}
                  {data?.evaluations.map((evaluation, index) => {
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

                    if (studentGrade) {
                      const dialogKey = `${student.id}-${evaluation.grade.id}`;
                      if (!isDialogOpen[dialogKey]) {
                        isDialogOpen[dialogKey] = false;
                      }
                      return (
                        <TableCell
                          key={evaluation.grade.id}
                          className="w-[200px]"
                        >
                          {studentGrade ? (
                            <CustomDialog
                              title="Detailed Criteria"
                              buttonText={overallGrade.toString().slice(0, 4)}
                              buttonClassName="bg-transparent dark text-white px-4 py-2 rounded-md border border-white"
                              open={isDialogOpen[dialogKey]}
                              setOpen={(value) =>
                                setIsDialogOpen({
                                  ...isDialogOpen,
                                  [dialogKey]: value,
                                })
                              }
                            >
                              <UpdateStudentGradeForm
                                studentGrade={studentGrade}
                                evaluationBase={evaluation.base}
                                evaluationId={evaluation.grade.id}
                                classeId={props.classeId}
                                setIsDialogOpen={(value) =>
                                  setIsDialogOpen({
                                    ...isDialogOpen,
                                    [dialogKey]: value,
                                  })
                                }
                                studentName={student.name}
                                refetch={refetchCompoundEvaluations}
                              />
                            </CustomDialog>
                          ) : (
                            "N/A"
                          )}
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell
                          key={evaluation.grade.id}
                          className="w-[200px]"
                        >
                          N/A
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center mt-4 gap-2">
            <CustomDialog
              title="Evaluations Settings"
              icon={<Settings />}
              buttonText="Assign Evaluation"
              buttonClassName="bg-transparent dark text-white px-4 py-2 rounded-md border border-white"
            >
              <AssignEvaluation
                classeId={props.classeId}
                userId={props.userId}
              />
            </CustomDialog>
            <CustomDialog
              title="Add Student"
              buttonText="Add Student"
              buttonClassName="bg-transparent dark text-white px-4 py-2 rounded-md border border-white"
            >
              <div>
                <AddStudentForm classId={props.classeId as Id<"Classes">} />
                <CSVReader />
              </div>
            </CustomDialog>
          </div>
        </div>
      </LayoutWithProps>
    );
  }
}
