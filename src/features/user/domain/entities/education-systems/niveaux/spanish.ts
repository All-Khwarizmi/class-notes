import { z } from "zod";

export const SpanishEducationLevels = z.enum([
  "Infantil1",
  "Infantil2",
  "Infantil3",
  "Primaria1",
  "Primaria2",
  "Primaria3",
  "Primaria4",
  "Primaria5",
  "Primaria6",
  "ESO1",
  "ESO2",
  "ESO3",
  "ESO4",
  "Bachillerato1",
  "Bachillerato2",
  "Grado1",
  "Grado2",
  "Grado3",
  "Grado4",
  "Master1",
  "Master2",
  "Doctorado",
]);

export type SpanishEducationLevelsType = z.infer<typeof SpanishEducationLevels>;

const SpanishEducationLevelsMapping = {
  Infantil1: "Primer Ciclo de Infantil (1 año)",
  Infantil2: "Primer Ciclo de Infantil (2 años)",
  Infantil3: "Primer Ciclo de Infantil (3 años)",
  Primaria1: "Primero de Primaria",
  Primaria2: "Segundo de Primaria",
  Primaria3: "Tercero de Primaria",
  Primaria4: "Cuarto de Primaria",
  Primaria5: "Quinto de Primaria",
  Primaria6: "Sexto de Primaria",
  ESO1: "Primero de la ESO",
  ESO2: "Segundo de la ESO",
  ESO3: "Tercero de la ESO",
  ESO4: "Cuarto de la ESO",
  Bachillerato1: "Primero de Bachillerato",
  Bachillerato2: "Segundo de Bachillerato",
  Grado1: "Primer Año de Grado",
  Grado2: "Segundo Año de Grado",
  Grado3: "Tercer Año de Grado",
  Grado4: "Cuarto Año de Grado",
  Master1: "Primer Año de Máster",
  Master2: "Segundo Año de Máster",
  Doctorado: "Programa de Doctorado",
};

export function getHumanReadableSpanishGrade(
  gradeLevel: SpanishEducationLevelsType
): string {
  const readableName = SpanishEducationLevelsMapping[gradeLevel];
  if (!readableName) {
    throw new Error("Grade level not found in the Spanish education system.");
  }

  return readableName;
}
