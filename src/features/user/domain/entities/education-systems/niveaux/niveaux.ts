import { z } from "zod";
import { ChineseEducationLevels, getHumanReadableChineseGrade } from "./china";
import { FrenchEducationLevels, getHumanReadableFrenchGrade } from "./french";
import { GermanEducationLevels, getHumanReadableGermanGrade } from "./german";
import { getHumanReadableIndianGrade, IndianEducationLevels } from "./india";
import {
  getHumanReadableSpanishGrade,
  SpanishEducationLevels,
} from "./spanish";
import { getHumanReadableUKGrade, UKEducationLevels } from "./uk";
import { getHumanReadableUSGrade, USEducationLevels } from "./us";

export const EducationLevelsSchema = z.object({
  Chinese: ChineseEducationLevels,
  French: FrenchEducationLevels,
  German: GermanEducationLevels,
  Indian: IndianEducationLevels,
  Spanish: SpanishEducationLevels,
  UK: UKEducationLevels,
  US: USEducationLevels,
});

export const EducationLevelsEnumSchema = z.enum([
  ...ChineseEducationLevels.options,
  ...FrenchEducationLevels.options,
  ...GermanEducationLevels.options,
  ...IndianEducationLevels.options,
  ...SpanishEducationLevels.options,
  ...UKEducationLevels.options,
  ...USEducationLevels.options,
]);

export type EducationLevelsType = z.infer<typeof EducationLevelsSchema>;
export type EducationLevelsTypeUnion =
  EducationLevelsType[keyof EducationLevelsType];

// A mapping function that takes the education system and the grade level and returns the human-readable grade level.
export function getHumanReadableGrade(
  educationSystem: keyof EducationLevelsType,
  gradeLevel: EducationLevelsTypeUnion
): string {
  switch (educationSystem) {
    case "Chinese":
      const isSafeChinese = ChineseEducationLevels.safeParse(gradeLevel);
      if (isSafeChinese.success) {
        return getHumanReadableChineseGrade(isSafeChinese.data);
      }
      throw new Error("Grade level not found in the Chinese education system.");
    case "French":
      const isSafeFrench = FrenchEducationLevels.safeParse(gradeLevel);
      if (isSafeFrench.success) {
        return getHumanReadableFrenchGrade(isSafeFrench.data);
      }
      throw new Error("Grade level not found in the French education system.");
    case "German":
      const isSafeGerman = GermanEducationLevels.safeParse(gradeLevel);
      if (isSafeGerman.success) {
        return getHumanReadableGermanGrade(isSafeGerman.data);
      }
      throw new Error("Grade level not found in the German education system.");

    case "Indian":
      const isSafeIndian = IndianEducationLevels.safeParse(gradeLevel);
      if (isSafeIndian.success) {
        return getHumanReadableIndianGrade(isSafeIndian.data);
      }
      throw new Error("Grade level not found in the Indian education system.");
    case "Spanish":
      const isSafeSpanish = SpanishEducationLevels.safeParse(gradeLevel);
      if (isSafeSpanish.success) {
        return getHumanReadableSpanishGrade(isSafeSpanish.data);
      }
      throw new Error("Grade level not found in the Spanish education system.");
    case "UK":
      const isSafe = UKEducationLevels.safeParse(gradeLevel);
      if (isSafe.success) {
        return getHumanReadableUKGrade(isSafe.data);
      }
      throw new Error("Grade level not found in the UK education system.");
    case "US":
      const isSafeUS = USEducationLevels.safeParse(gradeLevel);
      if (isSafeUS.success) {
        return getHumanReadableUSGrade(isSafeUS.data);
      }
      throw new Error("Grade level not found in the US education system.");
  }
}
