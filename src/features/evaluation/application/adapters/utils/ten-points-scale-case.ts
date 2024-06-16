import {
  Grade,
  GradeSchema,
  StudentGradeSchema,
} from "@/features/evaluation/domain/entities/evaluation-with-grades-schema";
import {
  EvaluationCriteriaType,
  SpanishGradingSchema,
  SpanishGradingType,
  TenPointScaleSchema,
  TenPointScaleType,
} from "@/features/evaluation/domain/entities/evaluation-schema";
import checkSpecialGradeType, {
  SpecialGradeType,
  SpecialGradeTypes,
} from "./checkSpecialGradeType";
import { z } from "zod";

export function spanishGradingCalc({
  grade,
}: {
  grade: SpanishGradingType;
}): number | SpecialGradeType {
  const check = checkSpecialGradeType(grade.grade);
  if (check.shouldReturn === true) {
    return check.returnValue;
  }
  const isNumber = z.number().safeParse(check.returnValue);
  if (!isNumber.success) return "Error";

  return isNumber.data;
}

export function tenPointsScaleCase(
  grades: Grade[],
  criterias: EvaluationCriteriaType[]
): number | SpecialGradeType {
  const totalWeight = criterias.reduce(
    (acc, criteria) => acc + criteria.weight,
    0
  );
  let totalPoints: number = 0;
  for (const grade of grades) {
    const validatedGrade = SpanishGradingSchema.safeParse(grade.gradeType);
    if (validatedGrade.success) {
      const result = spanishGradingCalc({
        grade: validatedGrade.data,
      });
      if (typeof result === "string") return result;

      totalPoints += result;
    } else {
      return "Error";
    }
  }
  return (totalPoints / totalWeight) * 10;
}

export const TenPointsGradeSchemaExtension = GradeSchema.extend({
  gradeType: SpanishGradingSchema,
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
