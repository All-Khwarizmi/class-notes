import { z } from "zod";

export const USEducationLevels = z.enum([
  "Kindergarten",
  "Grade1",
  "Grade2",
  "Grade3",
  "Grade4",
  "Grade5",
  "Grade6",
  "Grade7",
  "Grade8",
  "Grade9",
  "Grade10",
  "Grade11",
  "Grade12",
  "UndergraduateYear1",
  "UndergraduateYear2",
  "UndergraduateYear3",
  "UndergraduateYear4",
  "GraduateYear1",
  "GraduateYear2",
  "GraduateYear3",
  "GraduateYear4", // Supposant 4 ans pour un PhD
]);

export type USEducationLevelsType = z.infer<typeof USEducationLevels>;

const USEducationLevelsMapping = {
  Kindergarten: "Kindergarten",
  Grade1: "1st Grade",
  Grade2: "2nd Grade",
  Grade3: "3rd Grade",
  Grade4: "4th Grade",
  Grade5: "5th Grade",
  Grade6: "6th Grade",
  Grade7: "7th Grade",
  Grade8: "8th Grade",
  Grade9: "9th Grade (Freshman Year)",
  Grade10: "10th Grade (Sophomore Year)",
  Grade11: "11th Grade (Junior Year)",
  Grade12: "12th Grade (Senior Year)",
  UndergraduateYear1: "College Freshman",
  UndergraduateYear2: "College Sophomore",
  UndergraduateYear3: "College Junior",
  UndergraduateYear4: "College Senior",
  GraduateYear1: "Graduate Year 1",
  GraduateYear2: "Graduate Year 2",
  GraduateYear3: "Graduate Year 3",
  GraduateYear4: "Graduate Year 4",
};

export function getHumanReadableUSGrade(gradeLevel: USEducationLevelsType): string {
  const readableName = USEducationLevelsMapping[gradeLevel];
  if (!readableName) {
    throw new Error("Grade level not found in the US education system.");
  }

  return readableName;
}
