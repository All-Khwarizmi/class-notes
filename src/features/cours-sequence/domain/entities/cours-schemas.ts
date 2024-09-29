import { contentType } from '@/features/complement/domain/complement-schemas';
import { z } from 'zod';

export const CoursSchema = z.object({
  _id: z.string(),
  name: z.string(),
  body: z.string(),
  sequenceId: z.string(),
  imageUrl: z.string(),
  lessons: z.array(z.string()),
  competences: z.array(z.string()),
  description: z.string(),
  createdBy: z.string(),
  createdAt: z.number(),
  category: z.string(),
  publish: z.boolean().optional(),
  contentType: contentType.default('Markup'),
});

export type Cours = z.infer<typeof CoursSchema>;

export const SequenceSchema = z.object({
  _id: z.string(),
  name: z.string(),
  body: z.string(),
  imageUrl: z.string(),
  contentType: contentType.default('Markup'),
  coursIds: z.array(z.string()),
  competencesIds: z.array(z.string()),
  description: z.string(),
  createdBy: z.string(),
  createdAt: z.number(),
  category: z.string(),
  publish: z.boolean().optional(),
});

export type Sequence = z.infer<typeof SequenceSchema>;

export const ClasseSequenceSchema = SequenceSchema.extend({
  originalSequenceId: z.string(),
});

export type ClasseSequence = z.infer<typeof ClasseSequenceSchema>;
