import { v } from 'convex/values';

import { mutation, query } from './_generated/server';
import { gradeType } from './fields/grade_type';

export const createEvaluationBase = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    createdBy: v.string(),
    isGraded: v.boolean(),
    gradeType,
    criterias: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        description: v.string(),
        weight: v.number(),
        isGraded: v.boolean(),
        createdBy: v.string(),
        gradeType,
      })
    ),
  },
  handler: async (ctx, args) => {
    const evaluationId = await ctx.db.insert('EvaluationBase', {
      name: args.name,
      description: args.description,
      createdBy: args.createdBy,
      gradeType: args.gradeType,
      createdAt: Date.now(),
      criterias: args.criterias,
      isGraded: args.isGraded,
    });
    if (evaluationId === null) {
      throw new Error('Failed to create evaluation');
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
      isGraded: v.optional(v.boolean()),
      criterias: v.array(
        v.object({
          id: v.string(),
          name: v.string(),
          description: v.string(),
          weight: v.number(),
          isGraded: v.boolean(),
          createdBy: v.string(),
          gradeType,
        })
      ),
      gradeType: v.optional(gradeType),
    }),
  },
  handler: async (ctx, args) => {
    const evaluation = await ctx.db
      .query('EvaluationBase')
      .filter((q) => q.eq(q.field('_id'), args.evaluationId))
      .first();

    if (!evaluation) {
      throw new Error('Evaluation not found');
    }

    await ctx.db.patch(evaluation._id, {
      ...(args.updates.name && { name: args.updates.name }),
      ...(args.updates.description && {
        description: args.updates.description,
      }),
      ...(args.updates.gradeType && { gradeType: args.updates.gradeType }),
      ...(args.updates.isGraded && { isGraded: args.updates.isGraded }),
      ...(args.updates.criterias && { criterias: args.updates.criterias }),
    });
  },
});

export const listEvaluationsBase = query({
  args: {
    createdBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query('EvaluationBase');

    query = query.filter((q) => q.eq(q.field('createdBy'), args.createdBy));

    return query.collect();
  },
});

export const getEvaluationBase = query({
  args: {
    evaluationId: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query('EvaluationBase')
      .filter((q) => q.eq(q.field('_id'), args.evaluationId))
      .first();
  },
});

export const deleteEvaluationBase = mutation({
  args: {
    evaluationId: v.string(),
  },
  handler: async (ctx, args) => {
    const evaluation = await ctx.db
      .query('EvaluationBase')
      .filter((q) => q.eq(q.field('_id'), args.evaluationId))
      .first();

    if (!evaluation) {
      throw new Error('Evaluation not found');
    }

    await ctx.db.delete(evaluation._id);
  },
});

export const isEvaluationAssigned = query({
  args: {
    evaluationId: v.string(),
  },
  handler: async (ctx, args) => {
    const evaluationExist = await ctx.db
      .query('EvaluationsWithGrades')
      .filter((q) => q.eq(q.field('evaluationBaseId'), args.evaluationId))
      .first();
    return !!evaluationExist;
  },
});
