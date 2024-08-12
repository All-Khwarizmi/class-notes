import { z } from "zod";
import { GlobalEducationSubjectsSchema } from "./education-systems/global";
// Définition de l'enum pour les pays
const CountrySchema = z.enum([
  "USA",
  "France",
  "Spain",
  "Germany",
  "UK",
]);

export type CountryType = z.infer<typeof CountrySchema>;

// Extraire les valeurs pour utilisation dans un composant select
export const countryOptions = CountrySchema.options.map(option => ({ value: option, label: option }));


export const userSchema = z.object({
  _id: z.string(),
  schoolSubject: GlobalEducationSubjectsSchema.default("Arts"),
  country: CountrySchema.default("USA"),
  educationSystem: CountrySchema.default("USA"),
  name: z.string().optional(),
  onboarding: z.boolean().optional(),
  image: z.string().optional(),
  hostname: z.string().optional(),
  userId: z.string(),
  email: z.string().optional(),
  subscriptionId: z.string().optional(),
  endsOn: z.number().optional(),
  credits: z.number().optional(),
});

export type UserType = z.infer<typeof userSchema>;
