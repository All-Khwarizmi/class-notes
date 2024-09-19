import { v } from "convex/values";

// Définition des types de contenu possibles
const contentType = v.union(
  v.literal("sequence"),
  v.literal("course"),
  v.literal("complement"),
  v.literal("exercise"),
  v.literal("lesson"),
  v.literal("quiz")
);

// Définition des statuts possibles
export const historicStatusType = v.union(
  v.literal("pending"),
  v.literal("processing"),
  v.literal("completed"),
  v.literal("error")
);

// Métadonnées génériques du parent
const parentMetadata = v.object({
  type: contentType,
  name: v.string(),
  description: v.optional(v.string()),
  // Ajoutez d'autres champs génériques si nécessaire
});

// Définition de l'entité Historic
export const historic = v.object({
  id: v.string(),
  contentType: contentType,
  parentResourceId: v.string(),
  parentMetadata: parentMetadata,
  status: historicStatusType,
  createdAt: v.number(),
  updatedAt: v.number(),
  summary: v.optional(v.string()),
  error: v.optional(v.string()),
  visibility: v.boolean(),
  generatedBy: v.union(v.literal("AI"), v.literal("human")),
  metadata: v.optional(v.any()), // Pour stocker des informations supplémentaires spécifiques au type de contenu
});

// Exemple d'utilisation pour créer un nouvel historique
export const createHistoric = v.object({
  contentType: contentType,
  parentResourceId: v.string(),
  parentMetadata: parentMetadata,
  generatedBy: v.union(v.literal("AI"), v.literal("human")),
  visibility: v.boolean(),
  metadata: v.optional(v.any()),
});
