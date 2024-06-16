import { Grade } from "@/features/evaluation/domain/entities/evaluation-with-grades-schema";
import {
  NumericGradeType,
  NumericGradeSchema,
  EvaluationCriteriaType,
  GradeTypeUnionType,
  TenPointScaleSchema,
  TenPointScaleType,
} from "@/features/evaluation/domain/entities/evaluation-schema";
import checkSpecialGradeType, {
  SpecialGradeType,
} from "./checkSpecialGradeType";
import { z } from "zod";
import { tenPointsScaleCase } from "./ten-points-scale-case";

export const MaitriseSchema = z.union([
  z.literal("Expertise"), // la compétence est maîtrisée dans l’ensemble des situations professionnelles qui la mobilisent.
  z.literal("Maîtrise"), // la compétence est maîtrisée dans les situations professionnelles qui la mobilisent, avec une réelle autonomie.
  z.literal("À développer"), // la compétence est repérable à l’œuvre dans certaines situations professionnelles, mais nécessite encore des efforts pour être maîtrisée.
  z.literal("À acquérir"), // la compétence n’est pas mise en œuvre ou est mise en œuvre de manière incomplète.
]);

export type MaitriseType = z.infer<typeof MaitriseSchema>;
// Calculate the overall grade for a student in a competence evaluation
export function competenceCase(
  grades: Grade[],
  criteria: EvaluationCriteriaType[]
): MaitriseType | SpecialGradeType {
  // Check if the grade is a special grade type
  const specialGradeType = checkSpecialGradeType(grades);
  if (specialGradeType.shouldReturn === true) {
    return specialGradeType.returnValue;
  }

  // Calculate the overall grade for the student
  let totalGrade: number[] = [];
  for (const grade of grades) {
    const criteriaItem = criteria.find(
      (criteria) => criteria.id === grade.criteriaId
    );
    if (!criteriaItem) return "Error";

    // Check if the grade is a maitrise grade type
    if (isMaitriseGradeType(grade)) {
      const maitriseGrade = grade as Grade & { grade: MaitriseType };
      const weightedGrade = Array.from({ length: criteriaItem.weight }, () =>
        maitriseToNumber(maitriseGrade.grade)
      );
      totalGrade = [...totalGrade, ...weightedGrade];
    } else {
      return "Error";
    }
  }
  return averageMaitrise(totalGrade);
}

// a helper function to transform a maitrise type to a number ranging from 0 to 3 for the purpose of calculating the overall grade
function maitriseToNumber(maitrise: MaitriseType): 0 | 1 | 2 | 3 {
  switch (maitrise) {
    case "Expertise":
      return 3;
    case "Maîtrise":
      return 2;
    case "À développer":
      return 1;
    case "À acquérir":
      return 0;
  }
}

// a helper function to check if a grade is a maitrise grade type
export function isMaitriseGradeType(grade: Grade): boolean {
  return MaitriseSchema.safeParse(grade.grade).success;
}

// A helper function that maps over a list of numbers in a 0 to 3 range and returns the average in Matrise type
export function averageMaitrise(grades: number[]): MaitriseType {
  const average = grades.reduce((acc, curr) => acc + curr, 0) / grades.length;
  if (average >= 2.5) return "Expertise";
  if (average >= 1.5) return "Maîtrise";
  if (average >= 0.5) return "À développer";
  return "À acquérir";
}
