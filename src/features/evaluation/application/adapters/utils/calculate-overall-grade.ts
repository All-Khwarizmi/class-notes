import { Grade } from "@/features/evaluation/domain/entities/evaluation-with-grades-schema";

// Calculate the overall grade for a student in an evaluation
export default function calculateOverallGrade(grades: Grade[]) {
  if (!grades || grades.length === 0) return "N/A";
  const numericGrades = grades
    .map((grade) => (typeof grade.grade === "number" ? grade.grade : null))
    .filter(Boolean) as number[];
  if (numericGrades.length > 0) {
    return (
      numericGrades.reduce((a, b) => a + b, 0) / numericGrades.length
    ).toFixed(2);
  }
  return "N/A";
}
