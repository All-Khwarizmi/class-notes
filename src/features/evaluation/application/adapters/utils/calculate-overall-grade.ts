import { Grade } from "@/features/evaluation/domain/entities/evaluation-with-grades-schema";
import {
  NumericGradeType,
  NumericGradeSchema,
  EvaluationCriteriaType,
  GradeTypeUnionType,
  TenPointScaleSchema,
  TenPointScaleType,
} from "@/features/evaluation/domain/entities/evaluation-schema";
// Calculate the overall grade for a student in an evaluation
export default function calculateOverallGrade({
  grades,
  criteria,
  gradeType,
}: {
  grades: Grade[];
  criteria: EvaluationCriteriaType[];
  gradeType: GradeTypeUnionType;
}) {
  if (!grades || grades.length === 0) return "N/A";

  // Switch between the different types of grades
  switch (gradeType.type) {
    case "10-point Scale":
      const totalWeight = criteria.reduce(
        (acc, criteria) => acc + criteria.weight,
        0
      );
      let totalPoints: number = 0;
      for (const grade of grades) {
        const validatedGrade = TenPointScaleSchema.safeParse(grade.gradeType);
        if (validatedGrade.success) {
          const points = tenPointsScaleCalc({
            grade: validatedGrade.data,
            criterias: criteria,
          });
          if (points === "N/A") {
            return "N/A";
          }
          totalPoints += points;
        } else {
          return "Error";
        }
      }
      return (totalPoints / totalWeight) * 10;
    default:
      return "N/A";
  }

}

function tenPointsScaleCalc({
  grade,
  criterias,
}: {
  grade: TenPointScaleType;
  criterias: EvaluationCriteriaType[];
}) {
  const criteria = criterias.find((criteria) => criteria.id === grade.name);
  if (!criteria) return "N/A";

  // Calculate the overall grade based on the criteria
  return grade.grade;
}
