import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getVisibility = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    if (user) {
      const visibility = await ctx.db
        .query("VisibilityTable")
        .filter((q) => q.eq(q.field("userId"), user._id))
        .first();
      if (!visibility) {
        // Fetch all classes and add them to the visibility table
        const classes = await ctx.db
          .query("Classes")
          .filter((q) => q.eq(q.field("userId"), user._id))
          .collect();
        const visibility = {
          userId: user._id,
          classe: classes.map((c) => ({ id: c._id, publish: false })),
          sequences: [],
          cours: [],
          complement: [],
        };
        await ctx.db.insert("VisibilityTable", visibility);
        return visibility;
      }
      return visibility;
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
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    if (!user) return;
    const visibility = await ctx.db
      .query("VisibilityTable")
      .filter((q) => q.eq(q.field("userId"), user._id))
      .first();
    if (visibility) {
      const newVisibility = {
        ...visibility,
      };
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
