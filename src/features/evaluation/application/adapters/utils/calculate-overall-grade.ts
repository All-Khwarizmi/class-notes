import { Grade } from "@/features/evaluation/domain/entities/evaluation-with-grades-schema";
import {
  EvaluationCriteriaType,
  GradeTypeUnionType,
} from "@/features/evaluation/domain/entities/evaluation-schema";
import { tenPointsScaleCase } from "./ten-points-scale-case";
import { evaluateCompetence } from "./competence-case";
import { twentyPointsScaleCase } from "./twenty-points-scale-case";

export type SwitchReturnType =
  | string
  | number
  | "N/G"
  | "M"
  | "N/D"
  | "N/A"
  | "Error";
// Calculate the overall grade for a student in an evaluation
export default function calculateOverallGrade({
  grades,
  criteria,
  gradeType,
}: {
  grades: Grade[];
  criteria: EvaluationCriteriaType[];
  gradeType: GradeTypeUnionType;
}): SwitchReturnType {
  if (!grades || grades.length === 0) return "N/A";

  // Switch between the different types of grades
  switch (gradeType.type) {
    case "10-point Scale":
      return tenPointsScaleCase(grades, criteria);
    case "Competence":
      return evaluateCompetence(grades, criteria);
    case "20-point Scale":
      return twentyPointsScaleCase(grades, criteria);
    case "Grade Points":
      return "N/A";
    case "Numeric":
      return "N/A";

    default:
      return "N/A";
  }
}
