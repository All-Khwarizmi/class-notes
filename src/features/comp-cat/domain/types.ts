import { Category, Competence } from "./entities/schemas";

export type GetCompetenceOptions = {
  competenceId: string;
};

export type UpdateCompCatOptions = {
  id: string;
  name: string;
  description: string;
  type: "Competences" | "Category";
};

export type DeleteCompCatOptions = {
  id: string;
  type: "Competences" | "Category";
};

export type CreateCompetenceOptions = Omit<Competence, "_id">;
export type CreateCategoryOptions = Omit<Category, "_id">;
