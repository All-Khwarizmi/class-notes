import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getVisibility = query({
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
        }
      } else if (args.type === "sequence") {
        const sequence = visibility.sequences.find((s) => s.id === args.typeId);
        if (sequence) {
          sequence.publish = args.publish;
          newVisibility.sequences = visibility.sequences.map((s) =>
            s.id === args.typeId ? sequence : s
          );
        }
      } else if (args.type === "cours") {
        const cours = visibility.cours.find((c) => c.id === args.typeId);
        if (cours) {
          cours.publish = args.publish;
          newVisibility.cours = visibility.cours.map((c) =>
            c.id === args.typeId ? cours : c
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
