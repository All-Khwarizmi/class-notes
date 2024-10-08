import { v } from 'convex/values';

import { Id } from './_generated/dataModel';
import { mutation, query } from './_generated/server';

export const createStudent = mutation({
  args: {
    name: v.string(),
    classId: v.string(),
  },
  handler: async (ctx, args) => {
    const classeId = args.classId as Id<'Classes'>;
    const id = await ctx.db.insert('Students', {
      name: args.name,
      classId: classeId,
      observations: [],
      evaluationsResults: [],
    });

    // get all the evaluations for the class
    const evaluations = await ctx.db
      .query('EvaluationsWithGrades')
      .filter((q) => q.eq(q.field('classeId'), args.classId))
      .collect();

    // For any given evaluation, get the evaluation base
    const evaluationsBase = [];
    for (const evaluation of evaluations) {
      const evaluationBase = await ctx.db
        .query('EvaluationBase')
        .filter((q) => q.eq(q.field('_id'), evaluation.evaluationBaseId))
        .first();
      evaluationsBase.push(evaluationBase);
    }
    if (evaluationsBase.length !== evaluations.length) {
      throw new Error('Evaluation base not found');
    }

    // Map over each evaluation with grades and check if we have the corresponding evaluation base and the student to the grades array
    for (const evaluation of evaluations) {
      const evaluationBase = evaluationsBase.find(
        (evaluationBase) => evaluationBase?._id === evaluation.evaluationBaseId
      );
      if (!evaluationBase) {
        throw new Error('Evaluation base not found');
      }
      const studentGrade = {
        studentId: id,
        feedback: '',
        grades: evaluationBase.criterias.map((criteria) => ({
          criteriaId: criteria.id,
          gradeType: criteria.gradeType,
          grade: 'N/G',
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
      .query('Students')
      .filter((q) => q.eq(q.field('classId'), args.classId))
      .collect();
  },
});

export const deleteStudent = mutation({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const student = await ctx.db
      .query('Students')
      .filter((q) => q.eq(q.field('_id'), args.id))
      .first();
    if (!student) {
      throw new Error('Student not found');
    }

    // get all the evaluations for the class
    const evaluations = await ctx.db
      .query('EvaluationsWithGrades')
      .filter((q) => q.eq(q.field('classeId'), student.classId))
      .collect();

    // Map over each evaluation with grades and check if we have the corresponding evaluation base and the student to the grades array
    for (const evaluation of evaluations) {
      await ctx.db.patch(evaluation._id, {
        grades: evaluation.grades.filter(
          (grade) => grade.studentId !== args.id
        ),
      });
    }

    await ctx.db.delete(student._id);
  },
});

export const updateStudent = mutation({
  args: {
    id: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const student = await ctx.db
      .query('Students')
      .filter((q) => q.eq(q.field('_id'), args.id))
      .first();
    if (!student) {
      throw new Error('Student not found');
    }

    if (args.name) {
      await ctx.db.patch(student._id, {
        name: args.name,
        imageUrl: args.imageUrl,
      });
    }
  },
});
