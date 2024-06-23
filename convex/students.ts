import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createStudent = mutation({
  args: {
    name: v.string(),
    classId: v.id("Classes"),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("Students", {
      name: args.name,
      classId: args.classId,
      observations: [],
      evaluationsResults: [],
    });

    // get all the evaluations for the class
    const evaluations = await ctx.db
      .query("EvaluationsWithGrades")
      .filter((q) => q.eq(q.field("classeId"), args.classId))
      .collect();

    // For any given evaluation, get the evaluation base
    const evaluationsBase = [];
    for (const evaluation of evaluations) {
      const evaluationBase = await ctx.db
        .query("EvaluationBase")
        .filter((q) => q.eq(q.field("_id"), evaluation.evaluationBaseId))
        .first();
      evaluationsBase.push(evaluationBase);
    }
    if (evaluationsBase.length !== evaluations.length) {
      throw new Error("Evaluation base not found");
    }

    // Map over each evaluation with grades and check if we have the corresponding evaluation base and the student to the grades array
    for (const evaluation of evaluations) {
      const evaluationBase = evaluationsBase.find(
        (evaluationBase) => evaluationBase?._id === evaluation.evaluationBaseId
      );
      if (!evaluationBase) {
        throw new Error("Evaluation base not found");
      }
      const studentGrade = {
        studentId: id,
        feedback: "",
        grades: evaluationBase.criterias.map((criteria) => ({
          criteriaId: criteria.id,
          gradeType: criteria.gradeType,
          grade: "N/G",
        })),
      };
      await ctx.db.patch(evaluation._id, {
        grades: [...evaluation.grades, studentGrade],
      });
    }

    return { id };
  },
});

export const getStudents = query({
  args: {
    classId: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query("Students")
      .filter((q) => q.eq(q.field("classId"), args.classId))
      .collect();
  },
});
