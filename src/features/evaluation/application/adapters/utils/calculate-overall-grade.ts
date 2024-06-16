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
import { competenceCase } from "./competence-case";

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
      console.log("10-point Scale", grades);
      return tenPointsScaleCase(grades, criteria);
    case "Competence":
      return competenceCase(grades, criteria);
    case "20-point Scale":
      return "N/A";
    case "Grade Points":
      return "N/A";
    case "Numeric":
      return "N/A";

    default:
      return "N/A";
  }
}
