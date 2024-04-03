import { z } from "zod";

export const onboardingSchema = z.object({
  materia: z.string(),
  name: z.string().min(2).max(30),
});

export type OnboardingType = z.infer<typeof onboardingSchema>;
