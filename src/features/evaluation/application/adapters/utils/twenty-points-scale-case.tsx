import {
  EvaluationCriteriaType,
  TwentyPointScaleSchema,
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

export function frenchGradingCalc({
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

export function twentyPointsScaleCase(
  grades: Grade[],
  criterias: EvaluationCriteriaType[]
): number | SpecialGradeType {
  const studentCriterias = criterias.filter((criteria) =>
    grades.some((grade) => grade.criteriaId === criteria.id)
  );

  let totalPoints: number = 0;
  let totalWeight: number = 0;
  for (const grade of grades) {
    const validatedGrade = TwentyPointScaleSchema.safeParse(grade.gradeType);
    const gradeWeight = studentCriterias.find(
      (criteria) => criteria.id === grade.criteriaId
    )?.weight;

    if (!gradeWeight) return 'Error';
    totalWeight += gradeWeight;
    if (validatedGrade.success) {
      const result = frenchGradingCalc({
        grade,
      });
      if (typeof result === 'string') return result;

      if (result < 0 || result > 20) return 'Error';
      // Check if grades do not exceed the weight of the criteria
      if (result > gradeWeight) return 'Error'; // Multiplied by 2 because we're on a 20-point scale

      totalPoints += result;
    } else {
      return 'Error';
    }
  }
  const isWeighted = totalWeight > grades.length;
  let averageGrade = 0;
  if (isWeighted) {
    averageGrade = totalPoints / totalWeight;
  } else {
    averageGrade = totalPoints / grades.length;
  }
  return (totalPoints / totalWeight) * 20;
}

export const TwentyPointsGradeSchemaExtension = GradeSchema.extend({
  gradeType: TwentyPointScaleSchema,
  grade: z.union([SpecialGradeTypes, z.number()]),
});

export type TwentyPointsGradeExtension = z.infer<
  typeof TwentyPointsGradeSchemaExtension
>;

export const StudentGradeTwentyPointsSchemaExtension =
  StudentGradeSchema.extend({
    grades: z.array(TwentyPointsGradeSchemaExtension),
  });

export type StudentGradeTwentyPointsExtension = z.infer<
  typeof StudentGradeTwentyPointsSchemaExtension
>;
