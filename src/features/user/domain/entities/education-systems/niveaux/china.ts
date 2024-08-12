import { z } from "zod";

export const ChineseEducationLevels = z.enum([
  "Preschool",
  "PrimarySchool1",
  "PrimarySchool2",
  "PrimarySchool3",
  "PrimarySchool4",
  "PrimarySchool5",
  "PrimarySchool6",
  "JuniorMiddleSchool1",
  "JuniorMiddleSchool2",
  "JuniorMiddleSchool3",
  "SeniorMiddleSchool1",
  "SeniorMiddleSchool2",
  "SeniorMiddleSchool3",
  "UndergraduateYear1",
  "UndergraduateYear2",
  "UndergraduateYear3",
  "UndergraduateYear4",
  "MastersYear1",
  "MastersYear2",
  "PhD1",
  "PhD2",
  "PhD3",
  "PhD4",
  "PhD5",
]);

export type ChineseEducationLevelsType = z.infer<typeof ChineseEducationLevels>;

const ChineseEducationLevelsMapping = {
  Preschool: "学前教育",
  PrimarySchool1: "小学一年级",
  PrimarySchool2: "小学二年级",
  PrimarySchool3: "小学三年级",
  PrimarySchool4: "小学四年级",
  PrimarySchool5: "小学五年级",
  PrimarySchool6: "小学六年级",
  JuniorMiddleSchool1: "初中一年级",
  JuniorMiddleSchool2: "初中二年级",
  JuniorMiddleSchool3: "初中三年级",
  SeniorMiddleSchool1: "高中一年级",
  SeniorMiddleSchool2: "高中二年级",
  SeniorMiddleSchool3: "高中三年级",
  UndergraduateYear1: "大学本科一年级",
  UndergraduateYear2: "大学本科二年级",
  UndergraduateYear3: "大学本科三年级",
  UndergraduateYear4: "大学本科四年级",
  MastersYear1: "硕士研究生一年级",
  MastersYear2: "硕士研究生二年级",
  PhD1: "博士研究生一年级",
  PhD2: "博士研究生二年级",
  PhD3: "博士研究生三年级",
  PhD4: "博士研究生四年级",
  PhD5: "博士研究生五年级",
};

export function getHumanReadableChineseGrade(
  gradeLevel: ChineseEducationLevelsType
): string {
  const readableName = ChineseEducationLevelsMapping[gradeLevel];
  if (!readableName) {
    throw new Error("Grade level not found in the Chinese education system.");
  }

  return readableName;
}
