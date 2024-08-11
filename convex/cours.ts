import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createCours = mutation({
  args: {
    name: v.string(),
    body: v.string(),
    lessons: v.array(v.string()),
    imageUrl: v.string(),
    sequenceId: v.string(),
    competences: v.array(v.string()),
    description: v.string(),
    userId: v.string(),
    category: v.string(),
    publish: v.boolean(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (!existingUser) {
      throw new Error("User not found");
    }

    const existingSequence = await ctx.db
      .query("Sequences")
      .filter((q) => q.eq(q.field("_id"), args.sequenceId))
      .first();

    if (!existingSequence) {
      // Use the Classe Sequence table to get the sequence
      const existingClasseSequence = await ctx.db
        .query("ClasseSequence")
        .filter((q) => q.eq(q.field("_id"), args.sequenceId))
        .first();

      if (!existingClasseSequence) {
        throw new Error("Sequence not found");
      }

      // get all competences

      const competences = await ctx.db
        .query("Competences")
        .filter((q) => q.eq(q.field("createdBy"), existingUser!._id))
        .collect();

      const categoryId = await ctx.db.insert("Cours", {
        imageUrl: args.imageUrl,
        sequenceId: existingClasseSequence.originalSequenceId,
        name: args.name,
        body: args.body,
        lessons: args.lessons,
        competences: competences.map((c) => c._id),
        description: args.description,
        createdBy: existingUser!._id,
        createdAt: Date.now(),
        category: args.category,
      });

      if (!categoryId) {
        throw new Error("Could not create cours");
      }

      // Add the cours to the sequence
      await ctx.db.patch(existingClasseSequence._id, {
        coursIds: [...existingClasseSequence.coursIds, categoryId],
      });

      // Add the cours to the visibility table
      const visibilityTable = await ctx.db
        .query("VisibilityTable")
        .filter((q) => q.eq(q.field("userId"), existingUser!._id))
        .first();

      if (visibilityTable) {
        const newTable = {
          ...visibilityTable,
          cours: [
            ...visibilityTable.cours,
            {
              id: categoryId,
              publish: false,
              classe: true,
              classeId: existingClasseSequence._id,
              sequenceId: existingClasseSequence.originalSequenceId,
              sequence: existingClasseSequence.publish ?? false,
            },
          ],
        };
        await ctx.db.patch(visibilityTable._id, newTable);
      }

      return categoryId;
    }

    // get all competences
    const competences = await ctx.db
      .query("Competences")
      .filter((q) => q.eq(q.field("createdBy"), existingUser!._id))
      .collect();

    const categoryId = await ctx.db.insert("Cours", {
      imageUrl: args.imageUrl,
      sequenceId: existingSequence!._id,
      name: args.name,
      body: args.body,
      lessons: args.lessons,
      competences: competences.map((c) => c._id),
      description: args.description,
      createdBy: existingUser!._id,
      createdAt: Date.now(),
      category: args.category,
    });

    if (!categoryId) {
      throw new Error("Could not create cours");
    }

    // Add the cours to the sequence
    await ctx.db.patch(existingSequence._id, {
      coursIds: [...existingSequence.coursIds, categoryId],
    });

    // Add the cours to the visibility table
    const visibilityTable = await ctx.db
      .query("VisibilityTable")
      .filter((q) => q.eq(q.field("userId"), existingUser!._id))
      .first();

    if (visibilityTable) {
      const newTable = {
        ...visibilityTable,
        cours: [
          ...visibilityTable.cours,
          {
            id: categoryId,
            publish: false,
            classe: true,
            classeId: "",
            sequenceId: existingSequence._id,
            sequence: existingSequence.publish ?? false,
          },
        ],
      };
      await ctx.db.patch(visibilityTable._id, newTable);
    }

    return categoryId;
  },
});

export const getAllCours = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (user) {
      const cours = await ctx.db
        .query("Cours")
        .filter((q) => q.eq(q.field("createdBy"), user!._id))
        .collect();
      return cours;
    }
  },
});

export const getSingleCours = query({
  args: {
    userId: v.string(),
    coursId: v.string(),
  },
  handler: async (ctx, args) => {
    const cours = await ctx.db
      .query("Cours")
      .filter((q) => q.eq(q.field("_id"), args.coursId))
      .first();
    return cours;
  },
});

export const updateCours = mutation({
  args: {
    coursId: v.string(),
    name: v.string(),
    body: v.string(),
    lessons: v.array(v.string()),
    competences: v.array(v.string()),
    description: v.string(),
    category: v.string(),
    imageUrl: v.string(),
    publish: v.boolean(),
  },
  handler: async (ctx, args) => {
    const existingCours = await ctx.db
      .query("Cours")
      .filter((q) => q.eq(q.field("_id"), args.coursId))
      .first();

    if (!existingCours) {
      throw new Error("Cours not found");
    }

    const userComptences = await ctx.db
      .query("Competences")
      .filter((q) => q.eq(q.field("createdBy"), existingCours.createdBy))
      .collect();

    const visibilityTable = await ctx.db
      .query("VisibilityTable")
      .withIndex("by_userId")
      .filter((q) => q.eq(q.field("userId"), existingCours.createdBy))
      .first();

    if (!visibilityTable) {
      throw new Error("Visibility table not found");
    }

    const vivibilityCours = visibilityTable.cours.find(
      (c) => c.id === existingCours._id
    );
    if (!vivibilityCours) {
      throw new Error("Cours not found in visibility table");
    }

    // update the cours in the visibility table
    const newTable = {
      ...visibilityTable,
      cours: visibilityTable.cours.map((c) =>
        c.id === existingCours._id
          ? {
              ...c,
              publish: args.publish,
            }
          : c
      ),
    };
    await ctx.db.patch(visibilityTable._id, newTable);

    await ctx.db.patch(existingCours._id, {
      name: args.name,
      body: args.body,
      lessons: args.lessons,
      competences: userComptences
        .filter((c) => args.competences.includes(c._id))
        .map((c) => c._id),
      description: args.description,
      category: args.category,
      imageUrl: args.imageUrl,
      publish: args.publish,
    });
  },
});

export const updateCoursBody = mutation({
  args: {
    userId: v.string(),
    coursId: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const user = await ctx.db
        .query("Users")
        .filter((q) => q.eq(q.field("userId"), args.userId))
        .first();

      if (user) {
        const existingCours = await ctx.db
          .query("Cours")
          .filter((q) => q.eq(q.field("_id"), args.coursId))
          .first();

        if (existingCours) {
          await ctx.db.patch(existingCours._id, {
            body: args.body,
          });
        }
      }
    } catch (error) {
      return error;
    }
  },
});

export const deleteCours = mutation({
  args: {
    coursId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
     
      const cours = await ctx.db
        .query("Cours")
        .filter((q) => q.eq(q.field("_id"), args.coursId))
        .first();

      if (!cours) {
        throw new Error("Cours not found");
      }

      await ctx.db.delete(cours._id);
    } catch (error) {
      return error;
    }
  },
});
