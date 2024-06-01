import { a } from "vitest/dist/suite-a18diDsI.js";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createNote = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    parentId: v.string(),
    fullPath: v.string(),
    pathDictionary: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
      })
    ),
    folders: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        contentType: v.union(
          v.literal("Diagram"),
          v.literal("Flowchart"),
          v.literal("Markup")
        ),
        createdAt: v.number(),
      })
    ),
    createdBy: v.string(),
    keywords: v.array(v.string()),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const categoryId = await ctx.db.insert("Notes", {
      name: args.name,
      description: args.description,
      createdBy: args.createdBy,
      content: args.content,
      parentId: args.parentId,
      fullPath: args.fullPath,
      pathDictionary: args.pathDictionary,
      folders: args.folders,
      keywords: args.keywords,
    });
    return categoryId;
  },
});

export const getNotes = query({
  args: {
    parentId: v.string(),
  },
  handler: async (ctx, args) => {
    const notes = await ctx.db
      .query("Notes")
      .filter((q) => q.eq(q.field("parentId"), args.parentId))
      .collect();
    return notes;
  },
});

export const getNote = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const note = await ctx.db
      .query("Notes")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();
    return note;
  },
});

export const updateNote = mutation({
    args: {
        id: v.string(),
        name: v.optional(v.string()),
        description: v.optional(v.string()),
        content: v.optional(v.string()),
        fullPath: v.optional(v.string()),
        pathDictionary: v.optional(
            v.array(
                v.object({
                    id: v.string(),
                    name: v.string(),
                })
            )
        ),
        folders: v.optional(
            v.array(
                v.object({
                    id: v.string(),
                    name: v.string(),
                    contentType: v.union(
                        v.literal("Diagram"),
                        v.literal("Flowchart"),
                        v.literal("Markup")
                    ),
                    createdAt: v.number(),
                })
            )
        ),
        keywords: v.optional(v.array(v.string())),
    },
    handler: async (ctx, args) => {
        const note = await ctx.db
            .query("Notes")
            .filter((q) => q.eq(q.field("_id"), args.id))
            .first();
        if (note) {
            await ctx.db.patch(note?._id, {
                name: args.name,
                description: args.description,
                content: args.content,
                fullPath: args.fullPath,
                pathDictionary: args.pathDictionary,
                folders: args.folders,
                keywords: args.keywords,
            });
            return true;
        } else {
            return false;
        }
    },
});