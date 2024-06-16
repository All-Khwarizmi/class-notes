import {
  Grade,
  StudentGradeType,
} from "@/features/evaluation/domain/entities/evaluation-with-grades-schema";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const assignEvaluationToClasse = mutation({
  args: {
    classeId: v.string(),
    evaluationId: v.string(),
  },
  handler: async (ctx, args) => {
    const evaluationBase = await ctx.db
      .query("EvaluationBase")
      .filter((q) => q.eq(q.field("_id"), args.evaluationId))
      .first();

    if (!evaluationBase) {
      throw new Error("Evaluation base not found");
    }
    const students = await ctx.db
      .query("Students")
      .filter((q) => q.eq(q.field("classId"), args.classeId))
      .collect();

    if (!students) {
      throw new Error("Students not found");
    }
    // Create default grades for each student
    const grades: StudentGradeType[] = students.map((student) => ({
      studentId: student._id,
      feedback: "",
      grades: evaluationBase.criterias.map((criteria) => ({
        criteriaId: criteria.id,
        gradeType: criteria.gradeType,
        grade: "N/G",
      })),
    }));
    // Create the evaluation with grades
    const resultId = await ctx.db.insert("EvaluationsWithGrades", {
      publishDate: Date.now(),
      evaluationDate: Date.now(),
      classeId: args.classeId,
      evaluationBaseId: args.evaluationId,
      grades,
    });

    if (!resultId) {
      throw new Error("Failed to create evaluation with grades");
    }

    return resultId;
  },
});

export const updateGrade = mutation({
  args: {
    evaluationId: v.string(),
    studentId: v.string(),
    grades: v.array(
      v.object({
        criteriaId: v.string(),
        grade: v.union(v.number(), v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const evaluation = await ctx.db
      .query("EvaluationsWithGrades")
      .filter((q) => q.eq(q.field("_id"), args.evaluationId))
      .first();

    if (!evaluation) {
      throw new Error("Evaluation not found");
    }

    const studentGrade = evaluation.grades.find(
      (grade) => grade.studentId === args.studentId
    );

    if (!studentGrade) {
      throw new Error("Student not found");
    }

    studentGrade.grades = studentGrade.grades.map((grade) => {
      const updatedGrade = args.grades.find(
        (g) => g.criteriaId === grade.criteriaId
      );

      if (updatedGrade) {
        return {
          ...grade,
          grade: updatedGrade.grade,
        };
      }

      return grade;
    });

    evaluation.grades = evaluation.grades.map((grade) => {
      if (grade.studentId === args.studentId) {
        return studentGrade;
      }

      return grade;
    });

    await ctx.db.patch(evaluation._id, evaluation);

    return evaluation;
  },
});

export const getEvaluationWithGrade = query({
  args: {
    evaluationId: v.string(),
  },

  handler: async (ctx, args) => {
    const evaluation = await ctx.db
      .query("EvaluationsWithGrades")
      .filter((q) => q.eq(q.field("_id"), args.evaluationId))
      .first();

    if (!evaluation) {
      throw new Error("Evaluation not found");
    }

    return evaluation;
  },
});

export const getEvaluationsWithGrades = query({
  args: {
    classeId: v.string(),
  },

  handler: async (ctx, args) => {
    const evaluations = await ctx.db
      .query("EvaluationsWithGrades")
      .filter((q) => q.eq(q.field("classeId"), args.classeId))
      .collect();

    return evaluations;
  },
});
