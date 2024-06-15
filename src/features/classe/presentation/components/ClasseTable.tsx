"use client";

import React, { useState } from "react";
import Link from "next/link";
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
import {
  EvaluationWithGradeType,
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

  // Handler to open the dialog with detailed grades
  const openGradeDetails = (
    evaluation: CompoundEvaluationType,
    studentGrade: StudentGradeType
  ) => {
    setSelectedEvaluation(evaluation);
    setSelectedStudentGrade(studentGrade);
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
          <AssignEvaluation classeId={props.classeId} userId={props.userId} />
        </CustomDialog>
      </div>
      {/* Detailed Criteria Dialog */}
      {/* {selectedEvaluation && selectedStudentGrade && (
        <div className="dialog">
          <h3>
            Detailed Criteria for {selectedStudentGrade.studentId} in{" "}
            {selectedEvaluation.}
          </h3>
          <ul>
            {selectedStudentGrade.grades.map((grade) => (
              <li key={grade.criteriaId}>
                {grade.criteriaId}: {grade.grade} ({grade.gradeType})
              </li>
            ))}
          </ul>
          <Button
            onClick={() => {
              setSelectedEvaluation(null);
              setSelectedStudentGrade(null);
            }}
          >
            Close
          </Button>
        </div>
      )} */}
    </div>
  );
};

// Example usage with mock data
const mockClasseTableData = {
  students: [
    { id: "student-001", name: "John Doe" },
    { id: "student-002", name: "Jane Smith" },
    { id: "student-003", name: "Alice Johnson" },
  ],
  evaluations: [
    {
      id: "eval-001",
      name: "Midterm Exam",
      evaluationDate: 1672444800000,
      grades: [
        {
          studentId: "student-001",
          feedback: "Excellent performance!",
          grades: [
            { criteriaId: "criteria-001", gradeType: "Numeric", grade: 95 },
            { criteriaId: "criteria-002", gradeType: "Numeric", grade: 85 },
          ],
        },
        {
          studentId: "student-002",
          feedback: "Good effort, needs improvement in algorithms.",
          grades: [
            { criteriaId: "criteria-001", gradeType: "Numeric", grade: 70 },
            { criteriaId: "criteria-002", gradeType: "Numeric", grade: 75 },
          ],
        },
        {
          studentId: "student-003",
          feedback: "Satisfactory work.",
          grades: [
            { criteriaId: "criteria-001", gradeType: "Numeric", grade: 60 },
            { criteriaId: "criteria-002", gradeType: "Numeric", grade: 65 },
          ],
        },
      ],
    },
    {
      id: "eval-002",
      name: "Final Project",
      evaluationDate: 1672531200000,
      grades: [
        {
          studentId: "student-001",
          feedback: "Great job on the project!",
          grades: [
            { criteriaId: "criteria-003", gradeType: "Numeric", grade: 90 },
            { criteriaId: "criteria-004", gradeType: "Numeric", grade: 95 },
          ],
        },
        {
          studentId: "student-002",
          feedback: "Solid work, but presentation could be better.",
          grades: [
            { criteriaId: "criteria-003", gradeType: "Numeric", grade: 80 },
            { criteriaId: "criteria-004", gradeType: "Numeric", grade: 85 },
          ],
        },
        {
          studentId: "student-003",
          feedback: "Good effort overall.",
          grades: [
            { criteriaId: "criteria-003", gradeType: "Numeric", grade: 70 },
            { criteriaId: "criteria-004", gradeType: "Numeric", grade: 75 },
          ],
        },
      ],
    },
  ],
};

// export default function Example() {
//   return (
//     <div className="container mx-auto">
//       <StudentsEvaluationTableView
//         students={mockClasseTableData.students}
//         evaluations={mockClasseTableData.evaluations}
//       />
//     </div>
//   );
// }
