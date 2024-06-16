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
import {
  Grade,
  StudentGradeType,
} from "@/features/evaluation/domain/entities/evaluation-with-grades-schema";
import {
  ClasseTableType,
  CompoundEvaluationType,
} from "../../domain/class-schema";
import CustomDialog from "@/core/components/common/CustomDialog";
import AssignEvaluation from "./AssignEvaluation";
import UpdateStudentGradeForm from "./UpdateStudentGradeForm";

export const StudentsEvaluationTableView = (props: {
  tableData: ClasseTableType;
  classeId: string;
  userId: string;
}) => {
  const [selectedEvaluation, setSelectedEvaluation] =
    useState<CompoundEvaluationType | null>(null);
  const [selectedStudentGrade, setSelectedStudentGrade] =
    useState<StudentGradeType | null>(null);

  // Calculate the overall grade for a student in an evaluation
  const calculateOverallGrade = (grades: Grade[]) => {
    if (!grades || grades.length === 0) return "N/A";
    const numericGrades = grades
      .map((grade) => (typeof grade.grade === "number" ? grade.grade : null))
      .filter(Boolean) as number[];
    if (numericGrades.length > 0) {
      return (
        numericGrades.reduce((a, b) => a + b, 0) / numericGrades.length
      ).toFixed(2);
    }
    return "N/A";
  };

  return (
    <div className="w-full h-full py-4">
      <Table className="w-full">
        <TableCaption>
          Overall grades of students in different evaluations. Click on the
          grade to view detailed criteria.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Student</TableHead>
            {props.tableData.evaluations.map((evaluation) => (
              <TableHead key={evaluation.grade.id} className="w-[200px]">
                {evaluation.base.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.tableData.students.map((student, index) => (
            <TableRow key={student.id}>
              <TableCell className="w-[200px]">{student.name}</TableCell>
              {props.tableData.evaluations.map((evaluation) => {
                const studentGrade = evaluation.grade.grades.find(
                  (grade) => grade.studentId === student.id
                );
                console.log({ studentGrade });
                const overallGrade = studentGrade
                  ? calculateOverallGrade(studentGrade.grades)
                  : "N/A";
                return (
                  <TableCell key={evaluation.grade.id} className="w-[200px]">
                    {studentGrade ? (
                      <CustomDialog
                        title="Detailed Criteria"
                        buttonText={overallGrade}
                        buttonClassName="bg-transparent dark text-white px-4 py-2 rounded-md border border-white"
                      >
                        <UpdateStudentGradeForm
                          studentGrade={studentGrade}
                          evaluationBase={evaluation.base}
                        />
                      </CustomDialog>
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
      <div className="flex justify-center mt-4">
        <CustomDialog
          title="Assign Evaluation"
          buttonText="Assign Evaluation"
          buttonClassName="bg-transparent dark text-white px-4 py-2 rounded-md border border-white"
        >
          <AssignEvaluation
            classeId={props.classeId}
            userId={props.userId}
            alreadyAssignedEvaluationIds={props.tableData.evaluations.map(
              (evaluation) => evaluation.base.id
            )}
          />
        </CustomDialog>
      </div>
    </div>
  );
};
