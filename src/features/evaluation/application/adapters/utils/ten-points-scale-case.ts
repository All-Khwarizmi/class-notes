import { Grade } from "@/features/evaluation/domain/entities/evaluation-with-grades-schema";
import {
  EvaluationCriteriaType,
  TenPointScaleSchema,
  TenPointScaleType,
} from "@/features/evaluation/domain/entities/evaluation-schema";
import checkSpecialGradeType, {
  SpecialGradeType,
} from "./checkSpecialGradeType";
import { z } from "zod";

export function tenPointsScaleCalc({
  grade,
  criterias,
}: {
  grade: TenPointScaleType;
  criterias: EvaluationCriteriaType[];
}): number | SpecialGradeType {
  const criteria = criterias.find((criteria) => criteria.id === grade.name);
  if (!criteria) return "Error";

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
    const validatedGrade = TenPointScaleSchema.safeParse(grade.gradeType);
    if (validatedGrade.success) {
      const result = tenPointsScaleCalc({
        grade: validatedGrade.data,
        criterias: criterias,
      });
      if (typeof result === "string") return result;

      totalPoints += result;
    } else {
      return "Error";
    }
  }
  return (totalPoints / totalWeight) * 10;
}
