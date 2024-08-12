import { z } from "zod";
import { ChineseEducationSubjectsSchema } from "./chna";
import { FrenchEducationSubjectsSchema } from "./french";
import { GermanEducationSubjectsSchema } from "./german";
import { IndianEducationSubjectsSchema } from "./india";
import { SpanishEducationSubjectsSchema } from "./spain";
import { UKEducationSubjectsSchema } from "./uk";
import { AmericanEducationSubjectsSchema } from "./usa";

// Union de tous les schémas des systèmes éducatifs
export const GlobalEducationSubjectsSchema = z.union([
  FrenchEducationSubjectsSchema,
  AmericanEducationSubjectsSchema,
  GermanEducationSubjectsSchema,
  IndianEducationSubjectsSchema,
  ChineseEducationSubjectsSchema,
  UKEducationSubjectsSchema,
  SpanishEducationSubjectsSchema,
]);

export type GlobalEducationSubjectsType = z.infer<
  typeof GlobalEducationSubjectsSchema
>;
