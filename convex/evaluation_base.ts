import { is } from "immutable";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createEvaluationBase = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    createdBy: v.string(),
    isGraded: v.boolean(),
    gradeType: v.union(
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
        grade: v.number(), // Numerical grade value
      }),
      v.object({
        name: v.literal("Percentage"),
        type: v.literal("Percentage"),
        grade: v.number(), // Percentage grade value
      }),
      v.object({
        name: v.literal("US Letter Grades"),
        type: v.literal("A/B/C/D/F"),
        grade: v.union(
          v.literal("A"),
          v.literal("B"),
          v.literal("C"),
          v.literal("D"),
          v.literal("F")
        ),
      }),
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
          v.literal("Fail")
        ),
      }),
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
          v.literal("None")
        ),
      }),
      v.object({
        name: v.literal("Pass/Fail"),
        type: v.literal("Pass/Fail"),
        grade: v.union(v.literal("Pass"), v.literal("Fail")),
      }),
      v.object({
        name: v.literal("Descriptive Grades"),
        type: v.literal("Excellent/Good/Satisfactory/Needs Improvement"),
        grade: v.union(
          v.literal("Excellent"),
          v.literal("Good"),
          v.literal("Satisfactory"),
          v.literal("Needs Improvement")
        ),
      }),
      v.object({
        name: v.literal("US 4.0 Scale"),
        type: v.literal("4.0 Scale"),
        grade: v.number(), // Grade on a 4.0 scale
      }),
      v.object({
        name: v.literal("UK Honors"),
        type: v.literal("First/Upper Second/Lower Second/Third"),
        grade: v.union(
          v.literal("First"),
          v.literal("Upper Second"),
          v.literal("Lower Second"),
          v.literal("Third")
        ),
      }),
      v.object({
        name: v.literal("10-point Scale"),
        type: v.literal("10-point Scale"),
        grade: v.number(), // Grade on a 10-point scale
      }),
      v.object({
        name: v.literal("20-point Scale"),
        type: v.literal("20-point Scale"),
        grade: v.number(), // Grade on a 20-point scale
      }),
      v.object({
        name: v.literal("Grade Points"),
        type: v.literal("Grade Points"),
        grade: v.number(), // General grade points
      }),
      v.object({
        name: v.literal("Custom"),
        type: v.literal("Other"),
        description: v.string(), // Description for the custom grading system
        grade: v.string(), // Flexible grade value as string
      }),
      // French Grading System (out of 20)
      v.object({
        name: v.literal("French Grading"),
        type: v.literal("20-point Scale"),
        grade: v.number(), // French grades are typically on a 0-20 scale
      }),
      // German Grading System (1.0 to 5.0, where 1.0 is the best and 5.0 is failing)
      v.object({
        name: v.literal("German Grading"),
        type: v.literal("Numeric"),
        range: v.literal("1-5"),
        grade: v.number(), // German grades are typically 1.0 to 5.0, sometimes to 6.0
      }),
      // Australian Grading System (HD, D, C, P, F)
      v.object({
        name: v.literal("Australian Grading"),
        type: v.literal("HD/D/C/P/F"),
        grade: v.union(
          v.literal("HD"), // High Distinction
          v.literal("D"), // Distinction
          v.literal("C"), // Credit
          v.literal("P"), // Pass
          v.literal("F") // Fail
        ),
      }),
      // Spanish Grading System (0-10 scale)
      v.object({
        name: v.literal("Spanish Grading"),
        type: v.literal("10-point Scale"),
        grade: v.number(), // Spanish grades are typically on a 0-10 scale
      }),
      v.object({
        name: v.literal("Sport Points"),
        type: v.literal("Points"),
        range: v.union(
          v.literal("0-10"),
          v.literal("0-20"),
          v.literal("0-100"),
          v.literal("0-1000")
        ),
        grade: v.number(), // Numeric points score
      }),
      // Sport Grading: Rank System (e.g., 1st, 2nd, 3rd)
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
          v.literal("10th")
        ),
      }),
      // Sport Grading: Win/Loss/Tie notation
      v.object({
        name: v.literal("Sport Result"),
        type: v.literal("Win/Loss/Tie"),
        grade: v.union(v.literal("Win"), v.literal("Loss"), v.literal("Tie")),
      }),
      // Sport Grading: Performance Level (e.g., Excellent/Good/Average/Poor)
      v.object({
        name: v.literal("Sport Performance"),
        type: v.literal("Performance Level"),
        grade: v.union(
          v.literal("Excellent"),
          v.literal("Good"),
          v.literal("Average"),
          v.literal("Poor")
        ),
      })
    ),
    criterias: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        description: v.string(),
        weight: v.number(),
        isGraded: v.boolean(),
        createdBy: v.string(),
        gradeType: v.union(
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
            grade: v.number(), // Numerical grade value
          }),
          v.object({
            name: v.literal("Percentage"),
            type: v.literal("Percentage"),
            grade: v.number(), // Percentage grade value
          }),
          v.object({
            name: v.literal("US Letter Grades"),
            type: v.literal("A/B/C/D/F"),
            grade: v.union(
              v.literal("A"),
              v.literal("B"),
              v.literal("C"),
              v.literal("D"),
              v.literal("F")
            ),
          }),
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
              v.literal("Fail")
            ),
          }),
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
              v.literal("None")
            ),
          }),
          v.object({
            name: v.literal("Pass/Fail"),
            type: v.literal("Pass/Fail"),
            grade: v.union(v.literal("Pass"), v.literal("Fail")),
          }),
          v.object({
            name: v.literal("Descriptive Grades"),
            type: v.literal("Excellent/Good/Satisfactory/Needs Improvement"),
            grade: v.union(
              v.literal("Excellent"),
              v.literal("Good"),
              v.literal("Satisfactory"),
              v.literal("Needs Improvement")
            ),
          }),
          v.object({
            name: v.literal("US 4.0 Scale"),
            type: v.literal("4.0 Scale"),
            grade: v.number(), // Grade on a 4.0 scale
          }),
          v.object({
            name: v.literal("UK Honors"),
            type: v.literal("First/Upper Second/Lower Second/Third"),
            grade: v.union(
              v.literal("First"),
              v.literal("Upper Second"),
              v.literal("Lower Second"),
              v.literal("Third")
            ),
          }),
          v.object({
            name: v.literal("10-point Scale"),
            type: v.literal("10-point Scale"),
            grade: v.number(), // Grade on a 10-point scale
          }),
          v.object({
            name: v.literal("20-point Scale"),
            type: v.literal("20-point Scale"),
            grade: v.number(), // Grade on a 20-point scale
          }),
          v.object({
            name: v.literal("Grade Points"),
            type: v.literal("Grade Points"),
            grade: v.number(), // General grade points
          }),
          v.object({
            name: v.literal("Custom"),
            type: v.literal("Other"),
            description: v.string(), // Description for the custom grading system
            grade: v.string(), // Flexible grade value as string
          }),
          // French Grading System (out of 20)
          v.object({
            name: v.literal("French Grading"),
            type: v.literal("20-point Scale"),
            grade: v.number(), // French grades are typically on a 0-20 scale
          }),
          // German Grading System (1.0 to 5.0, where 1.0 is the best and 5.0 is failing)
          v.object({
            name: v.literal("German Grading"),
            type: v.literal("Numeric"),
            range: v.literal("1-5"),
            grade: v.number(), // German grades are typically 1.0 to 5.0, sometimes to 6.0
          }),
          // Australian Grading System (HD, D, C, P, F)
          v.object({
            name: v.literal("Australian Grading"),
            type: v.literal("HD/D/C/P/F"),
            grade: v.union(
              v.literal("HD"), // High Distinction
              v.literal("D"), // Distinction
              v.literal("C"), // Credit
              v.literal("P"), // Pass
              v.literal("F") // Fail
            ),
          }),
          // Spanish Grading System (0-10 scale)
          v.object({
            name: v.literal("Spanish Grading"),
            type: v.literal("10-point Scale"),
            grade: v.number(), // Spanish grades are typically on a 0-10 scale
          }),
          v.object({
            name: v.literal("Sport Points"),
            type: v.literal("Points"),
            range: v.union(
              v.literal("0-10"),
              v.literal("0-20"),
              v.literal("0-100"),
              v.literal("0-1000")
            ),
            grade: v.number(), // Numeric points score
          }),
          // Sport Grading: Rank System (e.g., 1st, 2nd, 3rd)
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
              v.literal("10th")
            ),
          }),
          // Sport Grading: Win/Loss/Tie notation
          v.object({
            name: v.literal("Sport Result"),
            type: v.literal("Win/Loss/Tie"),
            grade: v.union(
              v.literal("Win"),
              v.literal("Loss"),
              v.literal("Tie")
            ),
          }),
          // Sport Grading: Performance Level (e.g., Excellent/Good/Average/Poor)
          v.object({
            name: v.literal("Sport Performance"),
            type: v.literal("Performance Level"),
            grade: v.union(
              v.literal("Excellent"),
              v.literal("Good"),
              v.literal("Average"),
              v.literal("Poor")
            ),
          })
        ),
      })
    ),
  },
  handler: async (ctx, args) => {
    const evaluationId = await ctx.db.insert("EvaluationBase", {
      name: args.name,
      description: args.description,
      createdBy: args.createdBy,
      gradeType: args.gradeType,
      createdAt: Date.now(),
      criterias: args.criterias,
      isGraded: args.isGraded,
    });
    if (evaluationId === null) {
      throw new Error("Failed to create evaluation");
    }
    return evaluationId;
  },
});

export const updateEvaluationBase = mutation({
  args: {
    evaluationId: v.string(),
    updates: v.object({
      name: v.optional(v.string()),
      description: v.optional(v.string()),
      gradeType: v.optional(
        v.union(
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
            grade: v.number(), // Numerical grade value
          }),
          v.object({
            name: v.literal("Percentage"),
            type: v.literal("Percentage"),
            grade: v.number(), // Percentage grade value
          }),
          v.object({
            name: v.literal("US Letter Grades"),
            type: v.literal("A/B/C/D/F"),
            grade: v.union(
              v.literal("A"),
              v.literal("B"),
              v.literal("C"),
              v.literal("D"),
              v.literal("F")
            ),
          }),
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
              v.literal("Fail")
            ),
          }),
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
              v.literal("None")
            ),
          }),
          v.object({
            name: v.literal("Pass/Fail"),
            type: v.literal("Pass/Fail"),
            grade: v.union(v.literal("Pass"), v.literal("Fail")),
          }),
          v.object({
            name: v.literal("Descriptive Grades"),
            type: v.literal("Excellent/Good/Satisfactory/Needs Improvement"),
            grade: v.union(
              v.literal("Excellent"),
              v.literal("Good"),
              v.literal("Satisfactory"),
              v.literal("Needs Improvement")
            ),
          }),
          v.object({
            name: v.literal("US 4.0 Scale"),
            type: v.literal("4.0 Scale"),
            grade: v.number(), // Grade on a 4.0 scale
          }),
          v.object({
            name: v.literal("UK Honors"),
            type: v.literal("First/Upper Second/Lower Second/Third"),
            grade: v.union(
              v.literal("First"),
              v.literal("Upper Second"),
              v.literal("Lower Second"),
              v.literal("Third")
            ),
          }),
          v.object({
            name: v.literal("10-point Scale"),
            type: v.literal("10-point Scale"),
            grade: v.number(), // Grade on a 10-point scale
          }),
          v.object({
            name: v.literal("20-point Scale"),
            type: v.literal("20-point Scale"),
            grade: v.number(), // Grade on a 20-point scale
          }),
          v.object({
            name: v.literal("Grade Points"),
            type: v.literal("Grade Points"),
            grade: v.number(), // General grade points
          }),
          v.object({
            name: v.literal("Custom"),
            type: v.literal("Other"),
            description: v.string(), // Description for the custom grading system
            grade: v.string(), // Flexible grade value as string
          }),
          // French Grading System (out of 20)
          v.object({
            name: v.literal("French Grading"),
            type: v.literal("20-point Scale"),
            grade: v.number(), // French grades are typically on a 0-20 scale
          }),
          // German Grading System (1.0 to 5.0, where 1.0 is the best and 5.0 is failing)
          v.object({
            name: v.literal("German Grading"),
            type: v.literal("Numeric"),
            range: v.literal("1-5"),
            grade: v.number(), // German grades are typically 1.0 to 5.0, sometimes to 6.0
          }),
          // Australian Grading System (HD, D, C, P, F)
          v.object({
            name: v.literal("Australian Grading"),
            type: v.literal("HD/D/C/P/F"),
            grade: v.union(
              v.literal("HD"), // High Distinction
              v.literal("D"), // Distinction
              v.literal("C"), // Credit
              v.literal("P"), // Pass
              v.literal("F") // Fail
            ),
          }),
          // Spanish Grading System (0-10 scale)
          v.object({
            name: v.literal("Spanish Grading"),
            type: v.literal("10-point Scale"),
            grade: v.number(), // Spanish grades are typically on a 0-10 scale
          }),
          v.object({
            name: v.literal("Sport Points"),
            type: v.literal("Points"),
            range: v.union(
              v.literal("0-10"),
              v.literal("0-20"),
              v.literal("0-100"),
              v.literal("0-1000")
            ),
            grade: v.number(), // Numeric points score
          }),
          // Sport Grading: Rank System (e.g., 1st, 2nd, 3rd)
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
              v.literal("10th")
            ),
          }),
          // Sport Grading: Win/Loss/Tie notation
          v.object({
            name: v.literal("Sport Result"),
            type: v.literal("Win/Loss/Tie"),
            grade: v.union(
              v.literal("Win"),
              v.literal("Loss"),
              v.literal("Tie")
            ),
          }),
          // Sport Grading: Performance Level (e.g., Excellent/Good/Average/Poor)
          v.object({
            name: v.literal("Sport Performance"),
            type: v.literal("Performance Level"),
            grade: v.union(
              v.literal("Excellent"),
              v.literal("Good"),
              v.literal("Average"),
              v.literal("Poor")
            ),
          })
        )
      ),
    }),
  },
  handler: async (ctx, args) => {
    const evaluation = await ctx.db
      .query("EvaluationBase")
      .filter((q) => q.eq(q.field("_id"), args.evaluationId))
      .first();

    if (!evaluation) {
      throw new Error("Evaluation not found");
    }

    await ctx.db.patch(evaluation._id, {
      ...(args.updates.name && { name: args.updates.name }),
      ...(args.updates.description && {
        description: args.updates.description,
      }),
      ...(args.updates.gradeType && { gradeType: args.updates.gradeType }),
    });
  },
});

export const listEvaluationsBase = query({
  args: {
    createdBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("EvaluationBase");

    query = query.filter((q) => q.eq(q.field("createdBy"), args.createdBy));

    return query.collect();
  },
});

export const getEvaluationBase = query({
  args: {
    evaluationId: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query("EvaluationBase")
      .filter((q) => q.eq(q.field("_id"), args.evaluationId))
      .first();
  },
});

export const deleteEvaluationBase = mutation({
  args: {
    evaluationId: v.string(),
  },
  handler: async (ctx, args) => {
    const evaluation = await ctx.db
      .query("EvaluationBase")
      .filter((q) => q.eq(q.field("_id"), args.evaluationId))
      .first();

    if (!evaluation) {
      throw new Error("Evaluation not found");
    }

    await ctx.db.delete(evaluation._id);
  },
});
