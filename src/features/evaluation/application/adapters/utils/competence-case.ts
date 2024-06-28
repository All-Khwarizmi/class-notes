import {
  Grade,
  GradeSchema,
  StudentGradeSchema,
} from "@/features/evaluation/domain/entities/evaluation-with-grades-schema";
import {
  CompetenceEvaluationSchema,
  CompetenceLevelSchema,
  EvaluationCriteriaType,
} from "@/features/evaluation/domain/entities/evaluation-schema";
import checkSpecialGradeType, {
  SpecialGradeType,
  SpecialGradeTypes,
} from "./checkSpecialGradeType";
import { z } from "zod";

export type CompetenceLevel = z.infer<typeof CompetenceLevelSchema>;
// Calculate the overall grade for a student in a competence evaluation
export function isCompetenceGradeType(grade: Grade): boolean {
  return CompetenceLevelSchema.safeParse(grade.grade).success;
}

export function evaluateCompetence(
  grades: Grade[],
  criteria: EvaluationCriteriaType[]
): CompetenceLevel | SpecialGradeType {
  const specialGradeType = checkSpecialGradeType(grades);
  if (specialGradeType.shouldReturn === true) {
    return specialGradeType.returnValue;
  }

  let totalGrade: number[] = [];
  for (const grade of grades) {
    const criteriaItem = criteria.find(
      (criteria) => criteria.id === grade.criteriaId
    );
    if (!criteriaItem) throw new Error("Criteria item not found");

    if (isCompetenceGradeType(grade)) {
      const competenceGrade = grade as Grade & { grade: CompetenceLevel };
      const weightedGrade = Array.from({ length: criteriaItem.weight }, () =>
        competenceToNumber(competenceGrade.grade)
      );
      totalGrade = [...totalGrade, ...weightedGrade];
    } else {
      return "Error";
    }
  }
  return averageCompetence(totalGrade);
}

// a helper function to transform a maitrise type to a number ranging from 0 to 3 for the purpose of calculating the overall grade
export function competenceToNumber(
  competence: Omit<CompetenceLevel, "N/A" | "Error" | "M" | "N/G" | "N/D">
): 0 | 1 | 2 | 3 {
  switch (competence) {
    case "Expertise":
      return 3;
    case "Proficiency":
      return 2;
    case "To be developed":
      return 1;
    case "To be acquired":
      return 0;
  }
  return 0;
}

// A helper function that maps over a list of numbers in a 0 to 3 range and returns the average in Matrise type
export function averageCompetence(grades: number[]): CompetenceLevel {
  const average = grades.reduce((acc, curr) => acc + curr, 0) / grades.length;
  if (average >= 2.5) return "Expertise";
  if (average >= 1.5) return "Proficiency";
  if (average >= 0.5) return "To be developed";
  return "To be acquired";
}

export const CompetenceGradeSchemaExtension = GradeSchema.extend({
  gradeType: CompetenceEvaluationSchema,
  grade: z.union([SpecialGradeTypes, CompetenceLevelSchema]),
});

export type CompetenceGradeExtension = z.infer<
  typeof CompetenceGradeSchemaExtension
>;

export const StudentGradeCompetenceSchemaExtension = StudentGradeSchema.extend({
  grades: z.array(CompetenceGradeSchemaExtension),
});

export type StudentGradeCompetenceExtension = z.infer<
  typeof StudentGradeCompetenceSchemaExtension
>;
