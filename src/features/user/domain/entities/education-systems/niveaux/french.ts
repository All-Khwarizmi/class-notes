import { z } from "zod";

export const FrenchEducationLevels = z.enum([
  "MaternellePetite",
  "MaternelleMoyenne",
  "MaternelleGrande",
  "CP",
  "CE1",
  "CE2",
  "CM1",
  "CM2",
  "Sixieme",
  "Cinquieme",
  "Quatrieme",
  "Troisieme",
  "Seconde",
  "Premiere",
  "Terminale",
  "Licence1",
  "Licence2",
  "Licence3",
  "Master1",
  "Master2",
  "Doctorat",
]);

export type FrenchEducationLevelsType = z.infer<typeof FrenchEducationLevels>;

const FrenchEducationLevelsMapping = {
  MaternellePetite: "Petite Section",
  MaternelleMoyenne: "Moyenne Section",
  MaternelleGrande: "Grande Section",
  CP: "Cours Préparatoire",
  CE1: "Cours Élémentaire 1",
  CE2: "Cours Élémentaire 2",
  CM1: "Cours Moyen 1",
  CM2: "Cours Moyen 2",
  Sixieme: "Sixième",
  Cinquieme: "Cinquième",
  Quatrieme: "Quatrième",
  Troisieme: "Troisième",
  Seconde: "Seconde",
  Premiere: "Première",
  Terminale: "Terminale",
  Licence1: "Licence 1",
  Licence2: "Licence 2",
  Licence3: "Licence 3",
  Master1: "Master 1",
  Master2: "Master 2",
  Doctorat: "Doctorat",
};
export function getHumanReadableFrenchGrade(
  gradeLevel: FrenchEducationLevelsType
): string {
  const readableName = FrenchEducationLevelsMapping[gradeLevel];
  if (!readableName) {
    throw new Error("Grade level not found in the French education system.");
  }

  return readableName;
}
