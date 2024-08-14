import {
  mutation,
  query,
  internalQuery,
  internalMutation,
} from "./_generated/server";
import { v } from "convex/values";

export const isVisibilityTable = internalQuery({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const visibility = await ctx.db
      .query("VisibilityTable")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    return !!visibility;
  },
});

export const createVisibilityTable = internalMutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const visibility = {
      userId: args.userId,
      classe: [],
      sequences: [],
      cours: [],
      complement: [],
    };
    await ctx.db.insert("VisibilityTable", visibility);
    return visibility;
  },
});

export const getVisibility = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const visibility = await ctx.db
      .query("VisibilityTable")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    if (!visibility) {
      // Fetch all classes and add them to the visibility table
      const classes = await ctx.db
        .query("Classes")
        .filter((q) => q.eq(q.field("userId"), args.userId))
        .collect();
      const visibility = {
        userId: args.userId,
        classe: classes.map((c) => ({
          id: c._id,
          publish: false,
          name: c.name,
          description: c.description ?? "",
        })),

        sequences: [],
        cours: [],
        complement: [],
      };
      await ctx.db.insert("VisibilityTable", visibility);
      return visibility;
    }
    return visibility;
  },
});

// A function to check if a given entity exist in the visibility table
export const isEntityInVisibilityTable = query({
  args: {
    userId: v.string(),
    type: v.union(
      v.literal("classe"),
      v.literal("sequence"),
      v.literal("cours"),
      v.literal("complement")
    ),
    typeId: v.string(),
  },
  handler: async (ctx, args) => {
    const visibility = await ctx.db
      .query("VisibilityTable")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    if (visibility) {
      if (args.type === "classe") {
        return !!visibility.classe.find((c) => c.id === args.typeId);
      } else if (args.type === "sequence") {
        return !!visibility.sequences.find((s) => s.id === args.typeId);
      } else if (args.type === "cours") {
        return !!visibility.cours.find((c) => c.id === args.typeId);
      } else if (args.type === "complement") {
        return !!visibility.complement.find((c) => c.id === args.typeId);
      }
    }
    return false;
  },
});

export const addClasseToVisibilityTable = mutation({
  args: {
    userId: v.string(),

    entity: v.object({
      id: v.string(),
      publish: v.boolean(),
      name: v.string(),
      description: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const visibility = await ctx.db
      .query("VisibilityTable")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    console.log(visibility);
    if (visibility) {
      const newVisibility = { ...visibility };
      newVisibility.classe.push({
        id: args.entity.id,
        publish: args.entity.publish,
        name: args.entity.name,
        description: args.entity.description,
      });

      await ctx.db.patch(visibility._id, newVisibility);
    }
  },
});

export const addSequenceToVisibilityTable = mutation({
  args: {
    userId: v.string(),

    entity: v.object({
      id: v.string(),
      publish: v.boolean(),
      name: v.string(),
      description: v.string(),
      classe: v.boolean(),
      classeId: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    console.log(args);
    const visibility = await ctx.db
      .query("VisibilityTable")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    console.log(visibility);
    if (visibility) {
      const newVisibility = { ...visibility };
      newVisibility.sequences.push({
        id: args.entity.id,
        publish: args.entity.publish,
        name: args.entity.name,
        description: args.entity.description,
        classeId: args.entity.classeId,

        classe: args.entity.classe,
      });
      const classe = await ctx.db
        .query("Classes")
        .filter((q) => q.eq(q.field("_id"), args.entity.classeId))
        .first();

      if (!classe) {
        throw new Error("Classe not found");
      }

      const courses = await ctx.db
        .query("Cours")
        .filter((q) => q.eq(q.field("sequenceId"), args.entity.id))
        .collect();

      console.log(
        `${courses.length} courses found for sequence ${args.entity.id}`
      );
      for (const course of courses) {
        newVisibility.cours.push({
          id: course._id,
          publish: args.entity.publish,
          name: course.name,
          description: course.description,
          classeId: args.entity.classeId,
          sequenceId: args.entity.id,
          classe: args.entity.classe,
          sequence: args.entity.publish,
        });

        const complements = await ctx.db
          .query("Complement")
          .filter((q) => q.eq(q.field("coursId"), course._id))
          .collect();

        for (const complement of complements) {
          newVisibility.complement.push({
            id: complement._id,
            publish: args.entity.publish,
            name: complement.name,
            description: complement.description ?? "",
            classeId: args.entity.classeId,
            sequenceId: args.entity.id,
            coursId: course._id,
            classe: args.entity.classe,
            sequence: args.entity.publish,
            cours: args.entity.publish,
          });
        }
      }
      console.log({ newVisibility });
      await ctx.db.patch(visibility._id, newVisibility);
    }
  },
});

export const addCoursToVisibilityTable = mutation({
  args: {
    userId: v.string(),

    entity: v.object({
      id: v.string(),
      publish: v.boolean(),
      name: v.string(),
      description: v.string(),
      classe: v.boolean(),
      classeId: v.string(),
      sequence: v.boolean(),
      sequenceId: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const visibility = await ctx.db
      .query("VisibilityTable")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    if (visibility) {
      const newVisibility = { ...visibility };
      newVisibility.cours.push({
        id: args.entity.id,
        publish: args.entity.publish,
        name: args.entity.name,
        description: args.entity.description,
        classeId: args.entity.classeId,
        sequenceId: args.entity.sequenceId,
        classe: args.entity.classe,
        sequence: args.entity.sequence,
      });
    }
  },
});

export const addComplementToVisibilityTable = mutation({
  args: {
    userId: v.string(),

    entity: v.object({
      id: v.string(),
      publish: v.boolean(),
      name: v.string(),
      description: v.string(),
      classe: v.boolean(),
      classeId: v.string(),
      sequence: v.boolean(),
      sequenceId: v.string(),
      cours: v.boolean(),
      coursId: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const visibility = await ctx.db
      .query("VisibilityTable")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    if (visibility) {
      const newVisibility = { ...visibility };
      newVisibility.complement.push({
        id: args.entity.id,
        publish: args.entity.publish,
        name: args.entity.name,
        description: args.entity.description,
        classeId: args.entity.classeId,
        sequenceId: args.entity.sequenceId,
        coursId: args.entity.coursId,
        classe: args.entity.classe,
        sequence: args.entity.sequence,
        cours: args.entity.cours,
      });
    }
  },
});

export const updateVisibility = mutation({
  args: {
    userId: v.string(),
    type: v.union(
      v.literal("classe"),
      v.literal("sequence"),
      v.literal("cours"),
      v.literal("complement")
    ),
    typeId: v.string(),
    publish: v.boolean(),
  },
  handler: async (ctx, args) => {
    const visibility = await ctx.db
      .query("VisibilityTable")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    if (visibility) {
      const newVisibility = { ...visibility };
      if (args.type === "classe") {
        const classe = visibility.classe.find((c) => c.id === args.typeId);

        if (classe) {
          classe.publish = args.publish;
          newVisibility.classe = visibility.classe.map((c) =>
            c.id === args.typeId ? classe : c
          );
          newVisibility.sequences = visibility.sequences.map((s) =>
            s.classeId === args.typeId
              ? {
                  ...s,
                  classe: classe.publish,
                }
              : s
          );
          newVisibility.cours = visibility.cours.map((c) =>
            c.classeId === args.typeId
              ? {
                  ...c,
                  classe: classe.publish,
                }
              : c
          );
          newVisibility.complement = visibility.complement.map((c) =>
            c.classeId === args.typeId
              ? {
                  ...c,
                  classe: classe.publish,
                }
              : c
          );
        }
      } else if (args.type === "sequence") {
        const sequence = visibility.sequences.find((s) => s.id === args.typeId);
        if (sequence) {
          sequence.publish = args.publish;
          newVisibility.sequences = visibility.sequences.map((s) =>
            s.id === args.typeId ? sequence : s
          );
          newVisibility.cours = visibility.cours.map((c) =>
            c.sequenceId === args.typeId
              ? {
                  ...c,
                  sequence: sequence.publish,
                }
              : c
          );
          newVisibility.complement = visibility.complement.map((c) =>
            c.sequenceId === args.typeId
              ? {
                  ...c,
                  sequence: sequence.publish,
                }
              : c
          );
        }
      } else if (args.type === "cours") {
        const cours = visibility.cours.find((c) => c.id === args.typeId);
        if (cours) {
          cours.publish = args.publish;
          newVisibility.cours = visibility.cours.map((c) =>
            c.id === args.typeId ? cours : c
          );
          newVisibility.complement = visibility.complement.map((c) =>
            c.coursId === args.typeId
              ? {
                  ...c,
                  cours: cours.publish,
                }
              : c
          );
        }
      } else if (args.type === "complement") {
        const complement = visibility.complement.find(
          (c) => c.id === args.typeId
        );
        if (complement) {
          complement.publish = args.publish;
          newVisibility.complement = visibility.complement.map((c) =>
            c.id === args.typeId ? complement : c
          );
        }
      }

      await ctx.db.patch(visibility._id, newVisibility);
    }
  },
});

export const deleteEntityFromVisibilityTable = mutation({
  args: {
    userId: v.string(),
    type: v.union(
      v.literal("classe"),
      v.literal("sequence"),
      v.literal("cours"),
      v.literal("complement")
    ),
    typeId: v.string(),
  },
  handler: async (ctx, args) => {
    const visibility = await ctx.db
      .query("VisibilityTable")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    if (visibility) {
      const newVisibility = { ...visibility };
      if (args.type === "classe") {
        newVisibility.classe = visibility.classe.filter(
          (c) => c.id !== args.typeId
        );
        newVisibility.sequences = visibility.sequences.filter(
          (s) => s.classeId !== args.typeId
        );
        newVisibility.cours = visibility.cours.filter(
          (c) => c.classeId !== args.typeId
        );
        newVisibility.complement = visibility.complement.filter(
          (c) => c.classeId !== args.typeId
        );
      } else if (args.type === "sequence") {
        newVisibility.sequences = visibility.sequences.filter(
          (s) => s.id !== args.typeId
        );
        newVisibility.cours = visibility.cours.filter(
          (c) => c.sequenceId !== args.typeId
        );
        newVisibility.complement = visibility.complement.filter(
          (c) => c.sequenceId !== args.typeId
        );
      } else if (args.type === "cours") {
        newVisibility.cours = visibility.cours.filter(
          (c) => c.id !== args.typeId
        );
        newVisibility.complement = visibility.complement.filter(
          (c) => c.coursId !== args.typeId
        );
      } else if (args.type === "complement") {
        newVisibility.complement = visibility.complement.filter(
          (c) => c.id !== args.typeId
        );
      }

      await ctx.db.patch(visibility._id, newVisibility);
    }
  },
});
