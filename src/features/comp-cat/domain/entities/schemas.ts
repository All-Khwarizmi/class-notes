import { z } from "zod";

export const categorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  createdBy: z.string(),
});

export const competenceSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  createdBy: z.string(),
});

export type Category = z.infer<typeof categorySchema>;
export type Competence = z.infer<typeof competenceSchema>;

export type CompetenceByCategory = {
  category: string;
  competences: Competence[];
};

// A function that takes a list of competences and returns a list of CompetenceByCategory
export function groupCompetencesByCategory(
  competences: Competence[]
): CompetenceByCategory[] {
  const categories = competences.reduce((acc, competence) => {
    if (!acc[competence.category]) {
      acc[competence.category] = [];
    }
    acc[competence.category].push(competence);
    return acc;
  }, {} as Record<string, Competence[]>);

  return Object.entries(categories).map(([category, competences]) => ({
    category,
    competences,
  }));
}
