
export type UKEducationLevelsType =
  | "Nursery"
  | "Reception"
  | "Year1"
  | "Year2"
  | "Year3"
  | "Year4"
  | "Year5"
  | "Year6"
  | "Year7"
  | "Year8"
  | "Year9"
  | "Year10"
  | "Year11"
  | "Year12"
  | "Year13"
  | "UniversityYear1"
  | "UniversityYear2"
  | "UniversityYear3"
  | "PostgraduateYear1"
  | "PostgraduateYear2";



const UKEducationLevelsMapping = {
  Nursery: "Nursery",
  Reception: "Reception",
  Year1: "Year 1",
  Year2: "Year 2",
  Year3: "Year 3",
  Year4: "Year 4",
  Year5: "Year 5",
  Year6: "Year 6",
  Year7: "Year 7 (First Year)",
  Year8: "Year 8 (Second Year)",
  Year9: "Year 9 (Third Year)",
  Year10: "Year 10 (Fourth Year)",
  Year11: "Year 11 (Fifth Year)",
  Year12: "Year 12 (Lower Sixth)",
  Year13: "Year 13 (Upper Sixth)",
  UniversityYear1: "University Year 1",
  UniversityYear2: "University Year 2",
  UniversityYear3: "University Year 3",
  PostgraduateYear1: "Postgraduate Year 1",
  PostgraduateYear2: "Postgraduate Year 2",
};

export function getHumanReadableUKGrade(gradeLevel: UKEducationLevelsType): string {
  const readableName = UKEducationLevelsMapping[gradeLevel];
  if (!readableName) {
    throw new Error("Grade level not found in the UK education system.");
  }

  return readableName;
}