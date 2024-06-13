import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createSequence = mutation({
  args: {
    name: v.string(),
    body: v.string(),
    competencesIds: v.array(v.string()),
    description: v.string(),
    userId: v.string(),
    category: v.string(),
    imageUrl: v.string(),
    publish: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (existingUser) {
      // get all competences
      const competences = await ctx.db
        .query("Competences")
        .filter((q) => q.eq(q.field("createdBy"), existingUser!._id))
        .collect();

      const categoryId = await ctx.db.insert("Sequences", {
        imageUrl: args.imageUrl,
        name: args.name,
        body: args.body,
        coursIds: [],
        competencesIds: competences.map((c) => c._id),
        description: args.description,
        createdBy: existingUser!._id,
        createdAt: Date.now(),
        category: args.category,
        publish: args.publish,
      });

      // Add the sequence to the visibility table
      const visibilityTable = await ctx.db
        .query("VisibilityTable")
        .filter((q) => q.eq(q.field("userId"), existingUser!._id))
        .first();

      if (visibilityTable) {
        const newTable = {
          ...visibilityTable,
          sequences: [
            ...visibilityTable.sequences,
            {
              id: categoryId,
              publish: args.publish ?? false,
              classe: true,
              classeId: "",
            },
          ],
        };
        await ctx.db.patch(visibilityTable._id, newTable);
      }

      return categoryId;
    }
  },
});

export const addCoursToSequence = mutation({
  args: {
    sequenceId: v.string(),
    coursIds: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const sequence = await ctx.db
      .query("Sequences")
      .filter((q) => q.eq(q.field("_id"), args.sequenceId))
      .first();

    if (sequence) {
      const allCours = await ctx.db
        .query("Cours")
        .filter((q) => q.eq(q.field("createdBy"), sequence.createdBy))
        .collect();

      const coursIds: Id<"Cours">[] = [];
      for (const cours of allCours) {
        if (args.coursIds.includes(cours.name)) {
          coursIds.push(cours._id);
        }
      }

      await ctx.db.patch(sequence._id, {
        coursIds: [...sequence.coursIds, ...coursIds],
      });
    }
  },
});

export const getAllSequences = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (user) {
      const sequences = await ctx.db
        .query("Sequences")
        .filter((q) => q.eq(q.field("createdBy"), user!._id))
        .collect();
      return sequences;
    }
  },
});

export const getSingleSequence = query({
  args: {
    userId: v.string(),
    sequenceId: v.string(),
  },
  handler: async (ctx, args) => {
    const sequence = await ctx.db
      .query("Sequences")
      .filter((q) => q.eq(q.field("_id"), args.sequenceId))
      .first();
    return sequence;
  },
});

export const updateSequence = mutation({
  args: {
    sequenceId: v.string(),
    name: v.string(),
    body: v.string(),
    competencesIds: v.array(v.string()),
    description: v.string(),
    category: v.string(),
    imageUrl: v.string(),
    type: v.optional(v.literal("sequence")),
    publish: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    console.log("hi from convex update sequence", { args });
    if (args.type === "sequence") {
      const classeSequence = await ctx.db
        .query("ClasseSequence")
        .filter((q) => q.eq(q.field("_id"), args.sequenceId))
        .first();

      if (classeSequence) {
        const userComptences = await ctx.db
          .query("Competences")
          .filter((q) => q.eq(q.field("createdBy"), classeSequence.createdBy))
          .collect();

        // Check the publish status
        if (args.publish !== undefined) {
          const visibilityTable = await ctx.db
            .query("VisibilityTable")
            .filter((q) => q.eq(q.field("userId"), classeSequence.createdBy))
            .first();

          if (visibilityTable) {
            const classeExist = visibilityTable.classe.find(
              (classe) => classe.id === classeSequence._id
            );
            if (!classeExist) {
              visibilityTable.classe.push({
                id: classeSequence._id,
                publish: args.publish,
              });
            } else {
              const classeIndex = visibilityTable.classe.findIndex(
                (classe) => classe.id === classeSequence._id
              );
              visibilityTable.classe[classeIndex].publish = args.publish;
            }
            await ctx.db.patch(visibilityTable._id, {
              classe: visibilityTable.classe,
            });
          }
        }

        await ctx.db.patch(classeSequence._id, {
          name: args.name,
          body: args.body,
          competencesIds: userComptences
            .filter((c) => args.competencesIds.includes(c._id))
            .map((c) => c._id),
          description: args.description,
          category: args.category,
          imageUrl: args.imageUrl,
          publish: args.publish,
        });
      }
    } else {
      const existingSequence = await ctx.db
        .query("Sequences")
        .filter((q) => q.eq(q.field("_id"), args.sequenceId))
        .first();

      if (existingSequence) {
        const userComptences = await ctx.db
          .query("Competences")
          .filter((q) => q.eq(q.field("createdBy"), existingSequence.createdBy))
          .collect();

        await ctx.db.patch(existingSequence._id, {
          name: args.name,
          body: args.body,
          competencesIds: userComptences
            .filter((c) => args.competencesIds.includes(c._id))
            .map((c) => c._id),
          description: args.description,
          category: args.category,
          imageUrl: args.imageUrl,
        });
      }
    }
  },
});

export const addBodyToSequence = mutation({
  args: {
    userId: v.string(),
    sequenceId: v.string(),
    body: v.string(),
    type: v.optional(v.literal("sequence")),
  },
  handler: async (ctx, args) => {
    console.log("type in convex add sequence body", args.type);

    if (args.type === "sequence") {
      const classeSequence = await ctx.db
        .query("ClasseSequence")
        .filter((q) => q.eq(q.field("_id"), args.sequenceId))
        .first();

      if (classeSequence) {
        await ctx.db.patch(classeSequence._id, {
          body: args.body,
        });
      }
    } else {
      const existingSequence = await ctx.db
        .query("Sequences")
        .filter((q) => q.eq(q.field("_id"), args.sequenceId))
        .first();

      if (existingSequence) {
        await ctx.db.patch(existingSequence._id, {
          body: args.body,
        });
      }
    }
  },
});

export const getAllCoursInSequence = query({
  args: {
    userId: v.string(),
    sequenceId: v.string(),
    type: v.optional(v.literal("sequence")),
  },
  handler: async (ctx, args) => {
    if (args.type === "sequence") {
      const classeSequence = await ctx.db
        .query("ClasseSequence")
        .filter((q) => q.eq(q.field("_id"), args.sequenceId))
        .first();

      if (classeSequence) {
        const cours = await ctx.db
          .query("Cours")
          .withIndex("by_sequenceId")
          .filter((q) => q.eq(q.field("sequenceId"), args.sequenceId))
          .collect();
        return cours;
      }
    }

    const cours = await ctx.db
      .query("Cours")
      .withIndex("by_sequenceId")
      .filter((q) => q.eq(q.field("sequenceId"), args.sequenceId))
      .collect();
    return cours;
  },
});
