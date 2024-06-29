import { z } from "zod";

export const userSchema = z.object({
  _id: z.string(),
  schoolSubject: z.string().optional(),
  name: z.string().optional(),
  onboarding: z.boolean().optional(),
  image: z.string().optional(),
  hostname: z.string().optional(),
  userId: z.string(),
});

export type UserType = z.infer<typeof userSchema>;
