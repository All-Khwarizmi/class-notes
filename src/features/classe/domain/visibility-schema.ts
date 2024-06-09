import { z } from "zod";



export const VisibilitySchema = z.object({
  userId: z.string(),
  classe: z.array(
    z.object({
      id: z.string(),
      publish: z.boolean(),
    })
  ),
  sequences: z.array(
    z.object({
      id: z.string(),
      publish: z.boolean(),
      classe: z.boolean(),
      classeId: z.string(),
    })
  ),
  cours: z.array(
    z.object({
      id: z.string(),
      publish: z.boolean(),
      sequence: z.boolean(),
      sequenceId: z.string(),
      classe: z.boolean(),
      classeId: z.string(),
    })
  ),
  complement: z.array(
    z.object({
      id: z.string(),
      publish: z.boolean(),
      sequence: z.boolean(),
      sequenceId: z.string(),
      cours: z.boolean(),
      coursId: z.string(),
      classe: z.boolean(),
      classeId: z.string(),
    })
  ),
});
export type VisibilityType = z.infer<typeof VisibilitySchema>;
