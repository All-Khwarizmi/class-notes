import { vi } from "vitest";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createClass = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (existingUser) {
      const id = await ctx.db.insert("Classes", {
        userId: existingUser!._id,
        name: args.name,
        description: args.description,
        imageUrl: args.imageUrl,
        observations: [],
        evaluationsTemplatesId: [],
      });
      return { id, error: false };
    }
    return { id: false, error: true };
  },
});

export const deleteClass = mutation({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const classe = await ctx.db
      .query("Classes")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();
    if (classe) {
      ctx.db.delete(classe._id);
      return { error: false, success: true };
    }
    return { error: true, success: false };
  },
});

export const getClasses = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.id))
      .first();
    if (user) {
      const classes = await ctx.db
        .query("Classes")
        .filter((q) => q.eq(q.field("userId"), user._id))
        .collect();
      if (classes) {
        return classes;
      }
      return [];
    }
    return [];
  },
});

export const getClass = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query("Classes")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();
  },
});

export const addSequenceClass = mutation({
  args: {
    classId: v.string(),
    sequenceId: v.string(),
  },
  handler: async (ctx, args) => {
    const sequence = await ctx.db
      .query("Sequences")
      .filter((q) => q.eq(q.field("_id"), args.sequenceId))
      .first();

    if (sequence) {
      // Get the cours and create new ones to add to the new sequence

      const result = await ctx.db.insert("ClasseSequence", {
        originalSequenceId: sequence._id,
        name: sequence.name,
        body: sequence.body,
        imageUrl: sequence.imageUrl,
        coursIds: sequence.coursIds,
        competencesIds: sequence.competencesIds,
        description: sequence.description,
        createdBy: sequence.createdBy,
        createdAt: sequence.createdAt,
        category: sequence.category,
        publish: sequence.publish ?? false,

        classeId: args.classId,
      });

      for (const coursId of sequence.coursIds) {
        const cours = await ctx.db
          .query("Cours")
          .filter((q) => q.eq(q.field("_id"), coursId))
          .first();
        if (cours) {
          const newCours = await ctx.db.insert("Cours", {
            name: cours.name,
            body: cours.body,
            imageUrl: cours.imageUrl,
            sequenceId: result,
            createdBy: cours.createdBy,
            createdAt: cours.createdAt,
            category: cours.category,
            publish: cours.publish,
            description: cours.description,
            lessons: cours.lessons,
            competences: cours.competences,
          });

          // Get the cours complement and create new ones to add to the new cours
          const coursComplements = await ctx.db
            .query("Complement")
            .filter((q) => q.eq(q.field("coursId"), cours._id))
            .collect();
          for (const coursComplement of coursComplements) {
            await ctx.db.insert("Complement", {
              sequenceId: coursComplement.sequenceId,
              name: coursComplement.name,
              body: coursComplement.body,
              description: coursComplement.description,
              createdBy: coursComplement.createdBy,
              publish: coursComplement.publish,
              publishDate:
                coursComplement.publish === true ? Date.now() : undefined,
              coursId: newCours,
              type: coursComplement.type,
              contentType: coursComplement.contentType,
            });
          }
        }
      }
      if (result) {
        return { error: false, id: result };
      }
      return { error: true, id: "" };
    }
    return { error: true, id: "" };
  },
});

export const getClassSequences = query({
  args: {
    classId: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query("ClasseSequence")
      .filter((q) => q.eq(q.field("classeId"), args.classId))
      .collect();
  },
});

export const deleteSequenceClass = mutation({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const sequence = await ctx.db
      .query("ClasseSequence")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();
    if (sequence) {
      ctx.db.delete(sequence._id);
      return { error: false, success: true };
    }
    return { error: true, success: false };
  },
});

export const getClassSequence = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("ClasseSequence")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();
    if (result) {
      return result;
    }
  },
});

export const updateClassVisibility = mutation({
  args: {
    id: v.string(),
    visibility: v.boolean(),
  },
  handler: async (ctx, args) => {
    const classe = await ctx.db
      .query("Classes")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();
    if (classe) {
      await ctx.db.patch(classe._id, {
        publish: args.visibility,
      });
      // Update visibility table
      const visibility = await ctx.db
        .query("VisibilityTable")
        .filter((q) => q.eq(q.field("userId"), classe.userId))
        .first();

      if (visibility) {
        const classeVisibilityIndex = visibility.table.findIndex(
          (v) => v.id === classe._id
        );
        if (classeVisibilityIndex !== -1) {
          visibility.table[classeVisibilityIndex].publish = args.visibility;
        } else {
          visibility.table.push({
            id: classe._id,
            publish: args.visibility,
          });
        }

        await ctx.db.patch(visibility._id, {
          table: visibility.table,
        });
      } else {
        await ctx.db.insert("VisibilityTable", {
          userId: classe.userId,
          table: [
            {
              id: classe._id,
              publish: args.visibility,
            },
          ],
        });
      }
      return { error: false, success: true };
    }
    return { error: true, success: false };
  },
});
