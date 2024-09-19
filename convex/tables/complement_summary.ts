import { v } from "convex/values";
import { contentType } from "../fields/content_type";
import { historicStatusType } from "../fields/historic";

// Définition du type de contenu pour les compléments
const complementContentType = contentType;

// Définition du type de complément
const complementType = v.union(
  v.literal("Lesson"),
  v.literal("Exercise"),
  v.literal("Additional")
);

// Définition des statuts possibles


// Métadonnées spécifiques au complément
export const complementMetadata = v.object({
  name: v.string(),
  description: v.optional(v.string()),
  coursId: v.optional(v.string()),
  sequenceId: v.optional(v.string()),
  createdBy: v.optional(v.string()),
  publishDate: v.optional(v.float64()),
  contentType: complementContentType,
  type: complementType,
});

// Définition de l'entité Historic pour les résumés de compléments
export const complementSummary = v.object({
  complementId: v.string(),
  complementMetadata: complementMetadata,
  status: historicStatusType,
  createdAt: v.number(),
  updatedAt: v.number(),
  summary: v.optional(v.string()),
  error: v.optional(v.string()),
  visibility: v.boolean(),
  generatedBy: v.union(v.literal("AI"), v.literal("human")),
});

// Exemple d'utilisation pour créer un nouvel historique de résumé de complément
export const createComplementSummary = v.object({
  complementId: v.string(),
  complementMetadata: complementMetadata,
  generatedBy: v.union(v.literal("AI"), v.literal("human")),
  visibility: v.boolean(),
});
