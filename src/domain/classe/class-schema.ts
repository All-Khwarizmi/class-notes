import { z } from "zod";

const classSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(2, { message: "Le nom doit faire au moins 2 caractères" }),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  students: z.array(z.string()).optional(),
});
export default classSchema;

export type ClassType = z.infer<typeof classSchema>;
