import { id } from "fp-ts/lib/Refinement";
import { z } from "zod";

export const StudentSchema = z.object({
  id: z.string(),
  name: z.string(),
  classId: z.string(),
});

export type Student = z.infer<typeof StudentSchema>;
