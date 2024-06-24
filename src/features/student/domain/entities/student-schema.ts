import { z } from "zod";

export const StudentSchema = z.object({
  id: z.string(),
  name: z.string(),
  classId: z.string(),
  imageUrl: z.optional(z.string()),

});

export type Student = z.infer<typeof StudentSchema>;
