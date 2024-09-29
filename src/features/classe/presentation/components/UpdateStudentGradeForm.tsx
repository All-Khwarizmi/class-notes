import { StudentGradeCompetenceSchemaExtension } from '@/features/evaluation/application/adapters/utils/competence-case';
import { StudentGradeTenPointsSchemaExtension } from '@/features/evaluation/application/adapters/utils/ten-points-scale-case';
import { StudentGradeTwentyPointsSchemaExtension } from '@/features/evaluation/application/adapters/utils/twenty-points-scale-case';
import { EvaluationBaseType } from '@/features/evaluation/domain/entities/evaluation-schema';
import {
  StudentGradeSchema,
  StudentGradeType,
} from '@/features/evaluation/domain/entities/evaluation-with-grades-schema';
import CompetenceCriteriaForm from '@/features/evaluation/presentation/components/CompetenceCriteriaForm';
import TenPointsCriteriaForm from '@/features/evaluation/presentation/components/TenPointsCriteriaForm';
import TwentyPointsCriteriaForm from '@/features/evaluation/presentation/components/TwentyPointsCriteriaForm';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type UpdateStudentGradeFormProps = {
  studentGrade: StudentGradeType;
  evaluationBase: EvaluationBaseType;
  evaluationId: string;
  classeId: string;
  studentName: string;
  setIsDialogOpen: (open: boolean) => void;
  refetch: () => void;
};

function checkCriteriaConsistency(
  evaluationCriterias: string[],
  studentCriterias: string[]
): { missingCriterias: string[]; missingCriteriasBase: string[] } {
  const missingCriterias = studentCriterias.filter(
    (criteria) => !evaluationCriterias.includes(criteria)
  );
  const missingCriteriasBase = evaluationCriterias.filter(
    (criteria) => !studentCriterias.includes(criteria)
  );
  return { missingCriterias, missingCriteriasBase };
}

export default function UpdateStudentGradeForm(
  props: UpdateStudentGradeFormProps
) {
  const {
    studentGrade,
    evaluationBase,
    evaluationId,
    classeId,
    studentName,
    setIsDialogOpen,
    refetch,
  } = props;

  const form = useForm<StudentGradeType>({
    resolver: zodResolver(StudentGradeSchema),
    defaultValues: studentGrade,
  });

  useEffect(() => {
    const evaluationCriterias = evaluationBase.criterias.map(
      (criteria) => criteria.id
    );
    const studentCriterias = studentGrade.grades.map(
      (grade) => grade.criteriaId
    );
    const { missingCriterias, missingCriteriasBase } = checkCriteriaConsistency(
      evaluationCriterias,
      studentCriterias
    );

    if (missingCriterias.length > 0 || missingCriteriasBase.length > 0) {
      toast.error('Criterias do not match the evaluation', {
        description: `
          If you have added new criterias to the evaluation, those criterias will not be added to the student grade.
          To update the student grade, please remove the evaluation and assign it again.
          ${missingCriterias.length > 0 ? `Missing student criterias: ${missingCriterias.length}` : ''}
          ${missingCriteriasBase.length > 0 ? `Missing evaluation criterias: ${missingCriteriasBase.length}` : ''}
        `,
      });
    }
  }, [evaluationBase.criterias, studentGrade.grades]);

  useEffect(() => {
    form.reset(studentGrade);
  }, [studentGrade, form]);

  if (evaluationBase.gradeType.type === '10-point Scale') {
    const parsedStudentGrade =
      StudentGradeTenPointsSchemaExtension.safeParse(studentGrade);
    if (!parsedStudentGrade.success) {
      return (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          Invalid student grade for 10-point Scale
        </div>
      );
    }
    return (
      <TenPointsCriteriaForm
        studentGrade={parsedStudentGrade.data}
        evaluationBase={evaluationBase}
        evaluationId={evaluationId}
        classeId={classeId}
        studentName={studentName}
        refetch={refetch}
        setIsDialogOpen={setIsDialogOpen}
      />
    );
  }

  if (evaluationBase.gradeType.type === 'Competence') {
    const parsedStudentGrade =
      StudentGradeCompetenceSchemaExtension.safeParse(studentGrade);
    if (!parsedStudentGrade.success) {
      return (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          Invalid student grade for Competence
        </div>
      );
    }
    return (
      <CompetenceCriteriaForm
        studentGrade={parsedStudentGrade.data}
        evaluationBase={evaluationBase}
        evaluationId={evaluationId}
        classeId={classeId}
        studentName={studentName}
        refetch={refetch}
        setIsDialogOpen={setIsDialogOpen}
      />
    );
  }

  if (evaluationBase.gradeType.type === '20-point Scale') {
    const parsedStudentGrade =
      StudentGradeTwentyPointsSchemaExtension.safeParse(studentGrade);
    if (!parsedStudentGrade.success) {
      return (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          Invalid student grade for 20-point Scale
        </div>
      );
    }
    return (
      <TwentyPointsCriteriaForm
        studentGrade={parsedStudentGrade.data}
        evaluationBase={evaluationBase}
        evaluationId={evaluationId}
        classeId={classeId}
        studentName={studentName}
        refetch={refetch}
        setIsDialogOpen={setIsDialogOpen}
      />
    );
  }

  return (
    <div className="p-4 bg-red-100 text-red-700 rounded">
      Unsupported grade type
    </div>
  );
}
