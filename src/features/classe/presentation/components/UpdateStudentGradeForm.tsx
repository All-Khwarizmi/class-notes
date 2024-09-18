"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  StudentGradeSchema,
  StudentGradeType,
} from "@/features/evaluation/domain/entities/evaluation-with-grades-schema";
import { EvaluationBaseType } from "@/features/evaluation/domain/entities/evaluation-schema";
import TenPointsCriteriaForm from "@/features/evaluation/presentation/components/TenPointsCriteriaForm";
import { StudentGradeTenPointsSchemaExtension } from "@/features/evaluation/application/adapters/utils/ten-points-scale-case";
import { toast } from "sonner";
import { StudentGradeCompetenceSchemaExtension } from "@/features/evaluation/application/adapters/utils/competence-case";
import CompetenceCriteriaForm from "@/features/evaluation/presentation/components/CompetenceCriteriaForm";

export default function UpdateStudentGradeForm(props: {
  studentGrade: StudentGradeType;
  evaluationBase: EvaluationBaseType;
  evaluationId: string;
  classeId: string;
  studentName: string;
  setIsDialogOpen: (open: boolean) => void;
  refetch: () => void;
}) {
  const form = useForm<StudentGradeType>({
    resolver: zodResolver(StudentGradeSchema),
    defaultValues: props.studentGrade,
  });

  useEffect(() => {
    // Check that the evaluation base criterias are the same as the student grade criterias
    let toastId: string | number;
    const criterias = props.evaluationBase.criterias.map(
      (criteria) => criteria.id
    );
    const studentCriterias = props.studentGrade.grades.map(
      (grade) => grade.criteriaId
    );
    const missingCriterias = studentCriterias.filter(
      (criteria) => !criterias.includes(criteria)
    );
    const missingCriteriasBase = criterias.filter(
      (criteria) => !studentCriterias.includes(criteria)
    );
    if (missingCriterias.length > 0 || missingCriteriasBase.length > 0) {
      toastId = toast.error("Criterias do not match the evaluation", {
        description: `
        If you have added new criterias to the evaluation, those criterias will not be added to the student grade.
        To update the student grade, please remove the evaluation and assign it again.

       ${
         missingCriterias.length > 0
           ? `Missing student criterias: ${missingCriterias.length}`
           : ""
       }
        ${
          missingCriteriasBase.length > 0
            ? `Missing evaluation criterias: ${missingCriteriasBase.length}`
            : ""
        }
        `,
      });
    }

    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, []);

  useEffect(() => {
    form.reset(props.studentGrade);
  }, [props.studentGrade]);

  function onSubmit(data: StudentGradeType) {
    const grade = {
      ...data,
      studentId: props.studentGrade.studentId,
      grades: data.grades.map((g) => ({
        ...g,
        grade: typeof g.grade === "string" ? parseFloat(g.grade) : g.grade,
      })),
    };
  }

  function handleSubmit() {
    return form.handleSubmit((data) => {
      onSubmit(data);
    });
  }

  if (props.evaluationBase.gradeType.type === "10-point Scale") {
    const studentGrade = StudentGradeTenPointsSchemaExtension.safeParse(
      props.studentGrade
    );
    if (!studentGrade.success) {
      return <div>Invalid student grade</div>;
    }
    return (
      <TenPointsCriteriaForm
        studentGrade={studentGrade.data}
        evaluationBase={props.evaluationBase}
        evaluationId={props.evaluationId}
        classeId={props.classeId}
        studentName={props.studentName}
        refetch={props.refetch}
        setIsDialogOpen={props.setIsDialogOpen}
      />
    );
  }
  if (props.evaluationBase.gradeType.type === "Competence") {
    const studentGrade = StudentGradeCompetenceSchemaExtension.safeParse(
      props.studentGrade
    );
    if (!studentGrade.success) {
      return <div>Invalid student grade</div>;
    }
    return (
      <CompetenceCriteriaForm
        studentGrade={studentGrade.data}
        evaluationBase={props.evaluationBase}
        evaluationId={props.evaluationId}
        classeId={props.classeId}
        studentName={props.studentName}
        refetch={props.refetch}
        setIsDialogOpen={props.setIsDialogOpen}
      />
    );
  }
  return (
    <div className="space-y-8 py-8 px-4 md:px-0 rounded-lg shadow-md">
      Invalid grade type
    </div>
  );
}
