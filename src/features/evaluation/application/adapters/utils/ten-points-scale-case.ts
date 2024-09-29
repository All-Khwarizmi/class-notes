import {
  EvaluationCriteriaType,
  TenPointScaleSchema,
} from '@/features/evaluation/domain/entities/evaluation-schema';
import {
  Grade,
  GradeSchema,
  StudentGradeSchema,
} from '@/features/evaluation/domain/entities/evaluation-with-grades-schema';
import { z } from 'zod';

import checkSpecialGradeType, {
  SpecialGradeType,
  SpecialGradeTypes,
} from './checkSpecialGradeType';

export function spanishGradingCalc({
  grade,
}: {
  grade: Grade;
}): number | SpecialGradeType {
  const check = checkSpecialGradeType([grade]);
  if (check.shouldReturn === true) {
    return check.returnValue;
  }
  const isNumber = z.number().safeParse(check.returnValue);
  if (!isNumber.success) return 'Error';
  return isNumber.data;
}

export function tenPointsScaleCase(
  grades: Grade[],
  criterias: EvaluationCriteriaType[]
): number | SpecialGradeType {
  const studentCriterias = criterias.filter((criteria) =>
    grades.some((grade) => grade.criteriaId === criteria.id)
  );

  let totalPoints: number = 0;
  let totalWeight: number = 0;
  for (const grade of grades) {
    const validatedGrade = TenPointScaleSchema.safeParse(grade.gradeType);
    const gradeWeight = studentCriterias.find(
      (criteria) => criteria.id === grade.criteriaId
    )?.weight;
    if (!gradeWeight) return 'Error';
    totalWeight += gradeWeight;
    if (validatedGrade.success) {
      const result = spanishGradingCalc({
        grade,
      });
      if (typeof result === 'string') return result;
      if (result < 0 || result > 10) return 'Error';
      // Check if grades do not exceed the wheight of the criterias
      if (result > gradeWeight) return 'Error';

      totalPoints += result;
    } else {
      return 'Error';
    }
  }
  const isWeighted = totalWeight > grades.length;
  let averageGrade = 0;
  if (isWeighted) {
    averageGrade = totalPoints / totalPoints;
  } else {
    averageGrade = totalPoints / grades.length;
  }
  return (totalPoints / totalWeight) * 10;
}

export const TenPointsGradeSchemaExtension = GradeSchema.extend({
  gradeType: TenPointScaleSchema,
  grade: z.union([SpecialGradeTypes, z.number()]),
});

export type TenPointsGradeExtension = z.infer<
  typeof TenPointsGradeSchemaExtension
>;

export const StudentGradeTenPointsSchemaExtension = StudentGradeSchema.extend({
  grades: z.array(TenPointsGradeSchemaExtension),
});

export type StudentGradeTenPointsExtension = z.infer<
  typeof StudentGradeTenPointsSchemaExtension
>;
