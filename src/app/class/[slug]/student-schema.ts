import { z } from "zod";

export const studentSchema = z.object({
  name: z.string(),
  classId: z.string(),
});

export type Student = z.infer<typeof studentSchema>;
