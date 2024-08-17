export type GetCompetenceOptions = {
  competenceId: string;
};

export type UpdateCompCatOptions = {
  id: string;
  name: string;
  description: string;
  type: "Competences" | "Category";
};
