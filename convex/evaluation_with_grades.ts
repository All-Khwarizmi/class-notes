import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createEvaluationWithGrades = mutation({
  args: {
    templateId: v.id("EvaluationTemplates"),
    classId: v.id("Classes"),
    studentId: v.id("Students"),
    conductedBy: v.id("Users"),
    overallGrade: v.optional(v.union(v.string(), v.number())),
    feedback: v.optional(v.string()),
    studentGrades: v.array(
      v.object({
        studentId: v.id("Students"),
        grade: v.union(v.string(), v.number()),
        feedback: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const evaluationId = await ctx.db.insert("EvaluationsWithGrades", {
      templateId: args.templateId,
      classId: args.classId,
      conductedBy: args.conductedBy,
      conductedAt: Date.now(),
      overallGrade: args.overallGrade,
      feedback: args.feedback,
      criterias: [],
      studentId: args.studentId,
    });
    return evaluationId;
  },
});

export const updateEvaluationWithGrades = mutation({
  args: {
    evaluationId: v.id("EvaluationsWithGrades"),
    updates: v.object({
      overallGrade: v.optional(v.union(v.string(), v.number())),
      feedback: v.optional(v.string()),
      studentGrades: v.optional(
        v.array(
          v.object({
            studentId: v.id("Students"),
            grade: v.union(v.string(), v.number()),
            feedback: v.optional(v.string()),
          })
        )
      ),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.evaluationId, {
      ...(args.updates.overallGrade && {
        overallGrade: args.updates.overallGrade,
      }),
      ...(args.updates.feedback && { feedback: args.updates.feedback }),
      ...(args.updates.studentGrades && {
        studentGrades: args.updates.studentGrades,
      }),
    });
  },
});

export const listEvaluationsByClassOrTeacher = query({
  args: {
    classId: v.optional(v.id("Classes")),
    conductedBy: v.optional(v.id("Users")),
  },
  handler: async (ctx, args) => {
    // Start with a base query
    let query = ctx.db.query("EvaluationsWithGrades");

    // Conditionally add filters based on provided arguments
    if (args.classId) {
      query = query.filter((q) => q.eq(q.field("classId"), args.classId));
    }
    if (args.conductedBy) {
      query = query.filter((q) =>
        q.eq(q.field("conductedBy"), args.conductedBy)
      );
    }

    // Execute the constructed query
    const evaluations = await query.collect();
    return evaluations;
  },
});

export const deleteEvaluationWithGrades = mutation({
  args: { evaluationId: v.id("EvaluationsWithGrades") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.evaluationId);
  },
});
