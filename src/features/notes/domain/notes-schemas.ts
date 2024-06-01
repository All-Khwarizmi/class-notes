import { z } from "zod";

export const NoteSchema = z.object({
  name: z.string(),
  description: z.string(),
  parentId: z.string(),
  fullPath: z.string(),
  pathDictionary: z.object({
    id: z.string(),
    name: z.string(),
  }),
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
});

export type Note = z.infer<typeof NoteSchema>;
