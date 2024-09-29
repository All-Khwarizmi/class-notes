import { v } from 'convex/values';

export const contentType = v.union(
  v.literal('Diagram'),
  v.literal('Embed'),
  v.literal('Markup')
);
