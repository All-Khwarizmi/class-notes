import { z } from "zod";

export const NoteSchema = z.object({
  id: z.string(),
  createdAt: z.number(),
  name: z.string(),
  description: z.string(),
  parentId: z.string(),
  fullPath: z.string(),
  pathDictionary: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
  folders: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      contentType: z.union([
        z.literal("Diagram"),
        z.literal("Flowchart"),
        z.literal("Markup"),
      ]),
      createdAt: z.number(),
    })
  ),
  createdBy: z.string(),
  keywords: z.array(z.string()),
  content: z.string(),
  type: z.union([z.literal("Folder"), z.literal("Item")]),
  contentType: z.union([
    z.literal("Diagram"),
    z.literal("Flowchart"),
    z.literal("Markup"),
  ]),
});

export type Note = z.infer<typeof NoteSchema>;
