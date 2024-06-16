import { create } from "lodash";
import { z } from "zod";

export const EvaluationBaseTypeFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z.string().optional(),
  isGraded: z.boolean(),

  // Using the GradeTypeUnionSchema from EvaluationBaseSchema
});

export type EvaluationBaseTypeForm = z.infer<
  typeof EvaluationBaseTypeFormSchema
>;

// Numeric Grading Schemas
export const NumericGradeSchema = z.object({
  name: z.literal("Numeric"),
  type: z.literal("Numeric"),
  range: z.union([
    z.literal("1-4"),
    z.literal("1-5"),
    z.literal("1-10"),
    z.literal("1-20"),
    z.literal("0-100"),
  ]),
  grade: z.number(), // Numerical grade value
});

// Percentage Grading Schema
export const PercentageGradeSchema = z.object({
  name: z.literal("Percentage"),
  type: z.literal("Percentage"),
  grade: z.number(), // Percentage grade value
});

// US Letter Grades
export const USLetterGradeSchema = z.object({
  name: z.literal("US Letter Grades"),
  type: z.literal("A/B/C/D/F"),
  grade: z.union([
    z.literal("A"),
    z.literal("B"),
    z.literal("C"),
    z.literal("D"),
    z.literal("F"),
  ]),
});

// US Letter Grades with Pass/Fail
export const USLetterGradePassFailSchema = z.object({
  name: z.literal("US Letter Grades with Pass/Fail"),
  type: z.literal("A/B/C/D/F/Pass/Fail"),
  grade: z.union([
    z.literal("A"),
    z.literal("B"),
    z.literal("C"),
    z.literal("D"),
    z.literal("F"),
    z.literal("Pass"),
    z.literal("Fail"),
  ]),
});

// US Letter Grades with Pass/Fail/None
export const USLetterGradePassFailNoneSchema = z.object({
  name: z.literal("US Letter Grades with Pass/Fail/None"),
  type: z.literal("A/B/C/D/F/Pass/Fail/None"),
  grade: z.union([
    z.literal("A"),
    z.literal("B"),
    z.literal("C"),
    z.literal("D"),
    z.literal("F"),
    z.literal("Pass"),
    z.literal("Fail"),
    z.literal("None"),
  ]),
});

// Pass/Fail Schema
export const PassFailSchema = z.object({
  name: z.literal("Pass/Fail"),
  type: z.literal("Pass/Fail"),
  grade: z.union([z.literal("Pass"), z.literal("Fail")]),
});

// Descriptive Grades Schema
export const DescriptiveGradeSchema = z.object({
  name: z.literal("Descriptive Grades"),
  type: z.literal("Excellent/Good/Satisfactory/Needs Improvement"),
  grade: z.union([
    z.literal("Excellent"),
    z.literal("Good"),
    z.literal("Satisfactory"),
    z.literal("Needs Improvement"),
  ]),
});

// US 4.0 Scale Schema
export const USScale4Schema = z.object({
  name: z.literal("US 4.0 Scale"),
  type: z.literal("4.0 Scale"),
  grade: z.number(), // Grade on a 4.0 scale
});

// UK Honors Schema
export const UKHonorsSchema = z.object({
  name: z.literal("UK Honors"),
  type: z.literal("First/Upper Second/Lower Second/Third"),
  grade: z.union([
    z.literal("First"),
    z.literal("Upper Second"),
    z.literal("Lower Second"),
    z.literal("Third"),
  ]),
});

// 10-point Scale Schema
export const TenPointScaleSchema = z.object({
  name: z.literal("10-point Scale"),
  type: z.literal("10-point Scale"),
  grade: z.number(), // Grade on a 10-point scale
});

// 20-point Scale Schema
export const TwentyPointScaleSchema = z.object({
  name: z.literal("20-point Scale"),
  type: z.literal("20-point Scale"),
  grade: z.number(), // Grade on a 20-point scale
});

// Grade Points Schema
export const GradePointsSchema = z.object({
  name: z.literal("Grade Points"),
  type: z.literal("Grade Points"),
  grade: z.number(), // General grade points
});

// Custom Grading Schema
export const CustomGradeSchema = z.object({
  name: z.literal("Custom"),
  type: z.literal("Other"),
  description: z.string(), // Description for the custom grading system
  grade: z.string(), // Flexible grade value as string
});

// French Grading Schema (out of 20)
export const FrenchGradingSchema = z.object({
  name: z.literal("French Grading"),
  type: z.literal("20-point Scale"),
  grade: z.number(), // French grades are typically on a 0-20 scale
});

// German Grading Schema (1.0 to 5.0)
export const GermanGradingSchema = z.object({
  name: z.literal("German Grading"),
  type: z.literal("Numeric"),
  range: z.literal("1-5"),
  grade: z.number(), // German grades are typically 1.0 to 5.0, sometimes to 6.0
});

// Australian Grading Schema (HD, D, C, P, F)
export const AustralianGradingSchema = z.object({
  name: z.literal("Australian Grading"),
  type: z.literal("HD/D/C/P/F"),
  grade: z.union([
    z.literal("HD"), // High Distinction
    z.literal("D"), // Distinction
    z.literal("C"), // Credit
    z.literal("P"), // Pass
    z.literal("F"), // Fail
  ]),
});

// Spanish Grading Schema (0-10 scale)
export const SpanishGradingSchema = z.object({
  name: z.literal("Spanish Grading"),
  type: z.literal("10-point Scale"),
  grade: z.number(), // Spanish grades are typically on a 0-10 scale
});

// Sport Points System Schema
export const SportPointsSchema = z.object({
  name: z.literal("Sport Points"),
  type: z.literal("Points"),
  range: z.union([
    z.literal("0-10"),
    z.literal("0-20"),
    z.literal("0-100"),
    z.literal("0-1000"),
  ]),
  grade: z.number(), // Numeric points score
});

// Sport Ranking System Schema
export const SportRankingSchema = z.object({
  name: z.literal("Sport Ranking"),
  type: z.literal("Ranking"),
  grade: z.union([
    z.literal("1st"),
    z.literal("2nd"),
    z.literal("3rd"),
    z.literal("4th"),
    z.literal("5th"),
    z.literal("6th"),
    z.literal("7th"),
    z.literal("8th"),
    z.literal("9th"),
    z.literal("10th"),
  ]),
});

// Sport Win/Loss/Tie Schema
export const SportResultSchema = z.object({
  name: z.literal("Sport Result"),
  type: z.literal("Win/Loss/Tie"),
  grade: z.union([z.literal("Win"), z.literal("Loss"), z.literal("Tie")]),
});

// Sport Performance Level Schema
export const SportPerformanceSchema = z.object({
  name: z.literal("Sport Performance"),
  type: z.literal("Performance Level"),
  grade: z.union([
    z.literal("Excellent"),
    z.literal("Good"),
    z.literal("Average"),
    z.literal("Poor"),
  ]),
});

export const GradeTypeUnionSchema = z.union([
  NumericGradeSchema,
  PercentageGradeSchema,
  USLetterGradeSchema,
  USLetterGradePassFailSchema,
  USLetterGradePassFailNoneSchema,
  PassFailSchema,
  DescriptiveGradeSchema,
  USScale4Schema,
  UKHonorsSchema,
  TenPointScaleSchema,
  TwentyPointScaleSchema,
  GradePointsSchema,
  CustomGradeSchema,
  FrenchGradingSchema,
  GermanGradingSchema,
  AustralianGradingSchema,
  SpanishGradingSchema,
  SportPointsSchema,
  SportRankingSchema,
  SportResultSchema,
  SportPerformanceSchema,
]);

export const EvaluationCriteriaSchema = z.object({
  id: z.string(),
  weight: z.optional(z.number()).default(1),
  name: z.string(),
  description: z.string(),
  isGraded: z.boolean(),
  gradeType: GradeTypeUnionSchema,
  createdBy: z.string(),
});
// Combine all into EvaluationSchema
export const EvaluationBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  isGraded: z.boolean(),
  createdBy: z.string(),
  createdAt: z.number(),
  gradeType: GradeTypeUnionSchema,
  criterias: z.array(EvaluationCriteriaSchema),
});

export type EvaluationCriteriaType = z.infer<typeof EvaluationCriteriaSchema>;
export type EvaluationBaseType = z.infer<typeof EvaluationBaseSchema>;
export type NumericGradeType = z.infer<typeof NumericGradeSchema>;
export type PercentageGradeType = z.infer<typeof PercentageGradeSchema>;
export type USLetterGradeType = z.infer<typeof USLetterGradeSchema>;
export type USLetterGradePassFailType = z.infer<
  typeof USLetterGradePassFailSchema
>;
export type USLetterGradePassFailNoneType = z.infer<
  typeof USLetterGradePassFailNoneSchema
>;
export type PassFailType = z.infer<typeof PassFailSchema>;
export type DescriptiveGradeType = z.infer<typeof DescriptiveGradeSchema>;
export type USScale4Type = z.infer<typeof USScale4Schema>;
export type UKHonorsType = z.infer<typeof UKHonorsSchema>;
export type TenPointScaleType = z.infer<typeof TenPointScaleSchema>;
export type TwentyPointScaleType = z.infer<typeof TwentyPointScaleSchema>;
export type GradePointsType = z.infer<typeof GradePointsSchema>;
export type CustomGradeType = z.infer<typeof CustomGradeSchema>;
export type FrenchGradingType = z.infer<typeof FrenchGradingSchema>;
export type GermanGradingType = z.infer<typeof GermanGradingSchema>;
export type AustralianGradingType = z.infer<typeof AustralianGradingSchema>;
export type SpanishGradingType = z.infer<typeof SpanishGradingSchema>;
export type SportPointsType = z.infer<typeof SportPointsSchema>;
export type SportRankingType = z.infer<typeof SportRankingSchema>;
export type SportResultType = z.infer<typeof SportResultSchema>;
export type SportPerformanceType = z.infer<typeof SportPerformanceSchema>;
export type GradeTypeUnionType = z.infer<typeof GradeTypeUnionSchema>;
