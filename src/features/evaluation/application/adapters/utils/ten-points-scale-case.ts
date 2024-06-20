import {
  Grade,
  GradeSchema,
  StudentGradeSchema,
} from "@/features/evaluation/domain/entities/evaluation-with-grades-schema";
import {
  EvaluationCriteriaType,
  TenPointScaleSchema,
} from "@/features/evaluation/domain/entities/evaluation-schema";
import checkSpecialGradeType, {
  SpecialGradeType,
  SpecialGradeTypes,
} from "./checkSpecialGradeType";
import { z } from "zod";

export function spanishGradingCalc({
  grade,
}: {
  grade: Grade;
}): number | SpecialGradeType {
  const check = checkSpecialGradeType(grade.grade);
  if (check.shouldReturn === true) {
    // console.log("Special grade found", check.returnValue, grade.criteriaId);
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
  const studentCriterias = criterias.filter((criteria) =>
    grades.some((grade) => grade.criteriaId === criteria.id)
  );
  const totalWeight = studentCriterias.reduce(
    (acc, criteria) => acc + criteria.weight,
    0
  );
  let totalPoints: number = 0;
  for (const grade of grades) {
    const validatedGrade = TenPointScaleSchema.safeParse(grade.gradeType);
    if (validatedGrade.success) {
      const result = spanishGradingCalc({
        grade,
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
