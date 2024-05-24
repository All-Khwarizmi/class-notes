import { z } from "zod";

export const userSchema = z.object({
  _id: z.string(),
  schoolSubject: z.string(),
  name: z.string(),
  onboarding: z.boolean(),
});

export type UserType = z.infer<typeof userSchema>;
