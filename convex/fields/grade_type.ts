import { v } from "convex/values";

export const gradeType = v.union(
  // Numeric Grading Schema
  v.object({
    name: v.literal("Numeric"),
    type: v.literal("Numeric"),
    range: v.union(
      v.literal("1-4"),
      v.literal("1-5"),
      v.literal("1-10"),
      v.literal("1-20"),
      v.literal("0-100")
    ),
    grade: v.union(
      v.number(), // Numerical grade value
      v.literal("N/G"), // Not Graded
      v.literal("M"), // Missing
      v.literal("N/D") // Not Done
    ),
  }),

  // Percentage Grading Schema
  v.object({
    name: v.literal("Percentage"),
    type: v.literal("Percentage"),
    grade: v.union(
      v.number(), // Percentage grade value
      v.literal("N/G"), // Not Graded
      v.literal("M"), // Missing
      v.literal("N/D") // Not Done
    ),
  }),

  // US Letter Grades Schema
  v.object({
    name: v.literal("US Letter Grades"),
    type: v.literal("A/B/C/D/F"),
    grade: v.union(
      v.literal("A"),
      v.literal("B"),
      v.literal("C"),
      v.literal("D"),
      v.literal("F"),
      v.literal("N/G"), // Not Graded
      v.literal("M"), // Missing
      v.literal("N/D") // Not Done
    ),
  }),

  // US Letter Grades with Pass/Fail Schema
  v.object({
    name: v.literal("US Letter Grades with Pass/Fail"),
    type: v.literal("A/B/C/D/F/Pass/Fail"),
    grade: v.union(
      v.literal("A"),
      v.literal("B"),
      v.literal("C"),
      v.literal("D"),
      v.literal("F"),
      v.literal("Pass"),
      v.literal("Fail"),
      v.literal("N/G"), // Not Graded
      v.literal("M"), // Missing
      v.literal("N/D") // Not Done
    ),
  }),

  // US Letter Grades with Pass/Fail/None Schema
  v.object({
    name: v.literal("US Letter Grades with Pass/Fail/None"),
    type: v.literal("A/B/C/D/F/Pass/Fail/None"),
    grade: v.union(
      v.literal("A"),
      v.literal("B"),
      v.literal("C"),
      v.literal("D"),
      v.literal("F"),
      v.literal("Pass"),
      v.literal("Fail"),
      v.literal("None"),
      v.literal("N/G"), // Not Graded
      v.literal("M"), // Missing
      v.literal("N/D") // Not Done
    ),
  }),

  // Pass/Fail Schema
  v.object({
    name: v.literal("Pass/Fail"),
    type: v.literal("Pass/Fail"),
    grade: v.union(
      v.literal("Pass"),
      v.literal("Fail"),
      v.literal("N/G"), // Not Graded
      v.literal("M"), // Missing
      v.literal("N/D") // Not Done
    ),
  }),

  // Descriptive Grades Schema
  v.object({
    name: v.literal("Descriptive Grades"),
    type: v.literal("Expertise/Proficiency/To be developed/To be acquired"),
    grade: v.union(
      v.literal("Expertise"),
      v.literal("Proficiency"),
      v.literal("To be developed"),
      v.literal("To be acquired"),
      v.literal("N/G"), // Not Graded
      v.literal("M"), // Missing
      v.literal("N/D") // Not Done
    ),
  }),

  // US 4.0 Scale Schema
  v.object({
    name: v.literal("US 4.0 Scale"),
    type: v.literal("4.0 Scale"),
    grade: v.union(
      v.number(), // Grade on a 4.0 scale
      v.literal("N/G"), // Not Graded
      v.literal("M"), // Missing
      v.literal("N/D") // Not Done
    ),
  }),

  // 10-point Scale Schema
  v.object({
    name: v.literal("10-point Scale"),
    type: v.literal("10-point Scale"),
    grade: v.union(
      v.number(), // Grade on a 10-point scale
      v.literal("N/G"), // Not Graded
      v.literal("M"), // Missing
      v.literal("N/D") // Not Done
    ),
  }),

  // 20-point Scale Schema
  v.object({
    name: v.literal("20-point Scale"),
    type: v.literal("20-point Scale"),
    grade: v.union(
      v.number(), // Grade on a 20-point scale
      v.literal("N/G"), // Not Graded
      v.literal("M"), // Missing
      v.literal("N/D") // Not Done
    ),
  }),

  // Grade Points Schema
  v.object({
    name: v.literal("Grade Points"),
    type: v.literal("Grade Points"),
    grade: v.union(
      v.number(), // General grade points
      v.literal("N/G"), // Not Graded
      v.literal("M"), // Missing
      v.literal("N/D") // Not Done
    ),
  }),

  // Custom Grading Schema
  v.object({
    name: v.literal("Custom"),
    type: v.literal("Other"),
    grade: v.union(
      v.string(), // Flexible grade value as string
      v.literal("N/G"), // Not Graded
      v.literal("M"), // Missing
      v.literal("N/D") // Not Done
    ),
  }),

  // French Grading Schema (out of 20)
  v.object({
    name: v.literal("French Grading"),
    type: v.literal("20-point Scale"),
    grade: v.union(
      v.number(), // French grades are typically on a 0-20 scale
      v.literal("N/G"), // Not Graded
      v.literal("M"), // Missing
      v.literal("N/D") // Not Done
    ),
  }),

  // German Grading Schema (1.0 to 5.0)
  v.object({
    name: v.literal("German Grading"),
    type: v.literal("Numeric"),
    range: v.literal("1-5"),
    grade: v.union(
      v.number(), // German grades are typically 1.0 to 5.0, sometimes to 6.0
      v.literal("N/G"), // Not Graded
      v.literal("M"), // Missing
      v.literal("N/D") // Not Done
    ),
  }),

  // Spanish Grading Schema (0-10 scale)
  v.object({
    name: v.literal("Spanish Grading"),
    type: v.literal("10-point Scale"),
    grade: v.union(
      v.number(), // Spanish grades are typically on a 0-10 scale
      v.literal("N/G"), // Not Graded
      v.literal("M"), // Missing
      v.literal("N/D") // Not Done
    ),
  }),

  // Sport Points System Schema
  v.object({
    name: v.literal("Sport Points"),
    type: v.literal("Points"),
    range: v.union(
      v.literal("0-10"),
      v.literal("0-20"),
      v.literal("0-100"),
      v.literal("0-1000")
    ),
    grade: v.union(
      v.number(), // Numeric points score
      v.literal("N/G"), // Not Graded
      v.literal("M"), // Missing
      v.literal("N/D") // Not Done
    ),
  }),

  // Sport Ranking System Schema
  v.object({
    name: v.literal("Sport Ranking"),
    type: v.literal("Ranking"),
    grade: v.union(
      v.literal("1st"),
      v.literal("2nd"),
      v.literal("3rd"),
      v.literal("4th"),
      v.literal("5th"),
      v.literal("6th"),
      v.literal("7th"),
      v.literal("8th"),
      v.literal("9th"),
      v.literal("10th"),
      v.literal("N/G"), // Not Graded
      v.literal("M"), // Missing
      v.literal("N/D") // Not Done
    ),
  }),

  // Sport Win/Loss/Tie Schema
  v.object({
    name: v.literal("Sport Result"),
    type: v.literal("Win/Loss/Tie"),
    grade: v.union(
      v.literal("Win"),
      v.literal("Loss"),
      v.literal("Tie"),
      v.literal("N/G"), // Not Graded
      v.literal("M"), // Missing
      v.literal("N/D") // Not Done
    ),
  }),

  // Sport Performance Level Schema
  v.object({
    name: v.literal("Sport Performance"),
    type: v.literal("Performance Level"),
    grade: v.union(
      v.literal("Excellent"),
      v.literal("Good"),
      v.literal("Average"),
      v.literal("Poor"),
      v.literal("N/G"), // Not Graded
      v.literal("M"), // Missing
      v.literal("N/D") // Not Done
    ),
  }),
  v.object({
    name: v.literal("Competence-Based Evaluation"),
    type: v.literal("Competence"),
    grade: v.union(
      v.literal("Expertise"), // la compétence est maîtrisée dans l’ensemble des situations professionnelles qui la mobilisent.
      v.literal("Maîtrise"), // la compétence est maîtrisée dans les situations professionnelles qui la mobilisent, avec une réelle autonomie.
      v.literal("À développer"), // la compétence est repérable à l’œuvre dans certaines situations professionnelles, mais nécessite encore des efforts pour être maîtrisée.
      v.literal("À acquérir") // la compétence n’est pas mise en œuvre ou est mise en œuvre de manière incomplète.
    ),
  })
);
