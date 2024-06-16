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
import calculateOverallGrade from "@/features/evaluation/application/adapters/utils/calculate-overall-grade";

export function StudentsEvaluationTableView(props: {
  tableData: ClasseTableType;
  classeId: string;
  userId: string;
}) {
  const [selectedEvaluation, setSelectedEvaluation] =
    useState<CompoundEvaluationType | null>(null);
  const [selectedStudentGrade, setSelectedStudentGrade] =
    useState<StudentGradeType | null>(null);

  return (
    <div className="w-full h-full">
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
          {/* 
            Loop through the students and evaluations to display the grades.
            For each student, display the overall grade of the evaluation.
            If the student has a grade, display a dialog with the detailed criteria.
          */}
          {props.tableData.students.map((student, index) => (
            <TableRow key={student.id}>
              <TableCell className="w-[200px]">{student.name}</TableCell>
              {/* 
                Loop through the evaluations and find the grade of the student.
                If the student has a grade, display the overall grade.
                If the student doesn't have a grade, display "N/A".
              */}
              {props.tableData.evaluations.map((evaluation) => {
                const studentGrade = evaluation.grade.grades.find(
                  (grade) => grade.studentId === student.id
                );
                console.log({ studentGrade });
                const overallGrade = studentGrade
                  ? calculateOverallGrade({
                      grades: studentGrade.grades,
                      criteria: evaluation.base.criterias,
                      gradeType: evaluation.base.gradeType,
                    })
                  : "N/A";
                return (
                  <TableCell key={evaluation.grade.id} className="w-[200px]">
                    {studentGrade ? (
                      <CustomDialog
                        title="Detailed Criteria"
                        buttonText={overallGrade.toString()}
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
}