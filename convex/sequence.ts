import { v } from 'convex/values';

import { Id } from './_generated/dataModel';
import { mutation, query } from './_generated/server';
import { contentType } from './fields/content_type';

export const createSequence = mutation({
  args: {
    name: v.string(),
    body: v.string(),
    competencesIds: v.array(v.string()),
    description: v.string(),
    userId: v.string(),
    category: v.string(),
    imageUrl: v.string(),
    contentType: v.optional(contentType),
    publish: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query('Users')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .first();

    if (existingUser) {
      const categoryId = await ctx.db.insert('Sequences', {
        imageUrl: args.imageUrl,
        name: args.name,
        body: args.body,
        coursIds: [],
        competencesIds: args.competencesIds as Id<'Competences'>[],
        description: args.description,
        createdBy: existingUser!._id,
        createdAt: Date.now(),
        category: args.category,
        publish: args.publish,
        contentType: args.contentType,
      });

      if (!categoryId) {
        throw new Error('Could not create sequence');
      }

      // Add the sequence to the visibility table
      const visibilityTable = await ctx.db
        .query('VisibilityTable')
        .filter((q) => q.eq(q.field('userId'), existingUser!._id))
        .first();

      if (visibilityTable) {
        const newTable = {
          ...visibilityTable,
          sequences: [
            ...visibilityTable.sequences,
            {
              id: categoryId,
              publish: args.publish ?? false,
              classe: true,
              classeId: '',
              name: args.name,
              description: args.description,
            },
          ],
        };
        await ctx.db.patch(visibilityTable._id, newTable);
      }

      return categoryId;
    }
  },
});

export const addCoursToSequence = mutation({
  args: {
    sequenceId: v.string(),
    coursIds: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const sequence = await ctx.db
      .query('Sequences')
      .filter((q) => q.eq(q.field('_id'), args.sequenceId))
      .first();

    if (sequence) {
      const allCours = await ctx.db
        .query('Cours')
        .filter((q) => q.eq(q.field('createdBy'), sequence.createdBy))
        .collect();

      const coursIds: Id<'Cours'>[] = [];
      for (const cours of allCours) {
        if (args.coursIds.includes(cours.name)) {
          coursIds.push(cours._id);
        }
      }

      await ctx.db.patch(sequence._id, {
        coursIds: [...sequence.coursIds, ...coursIds],
      });
    }
  },
});

export const getAllSequences = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('Users')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .first();

    if (user) {
      const sequences = await ctx.db
        .query('Sequences')
        .filter((q) => q.eq(q.field('createdBy'), user!._id))
        .collect();
      return sequences;
    }
  },
});

export const getSingleSequence = query({
  args: {
    userId: v.string(),
    sequenceId: v.string(),
  },
  handler: async (ctx, args) => {
    const sequence = await ctx.db
      .query('Sequences')
      .filter((q) => q.eq(q.field('_id'), args.sequenceId))
      .first();
    return sequence;
  },
});

export const updateSequence = mutation({
  args: {
    sequenceId: v.string(),
    name: v.string(),
    body: v.string(),
    competencesIds: v.array(v.string()),
    description: v.string(),
    category: v.string(),
    imageUrl: v.string(),
    type: v.optional(v.literal('sequence')),
    publish: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    if (args.type === 'sequence') {
      const classeSequence = await ctx.db
        .query('ClasseSequence')
        .filter((q) => q.eq(q.field('_id'), args.sequenceId))
        .first();

      if (classeSequence) {
        const userComptences = await ctx.db
          .query('Competences')
          .filter((q) => q.eq(q.field('createdBy'), classeSequence.createdBy))
          .collect();

        // Check the publish status
        // if (args.publish !== undefined) {
        //   const visibilityTable = await ctx.db
        //     .query("VisibilityTable")
        //     .filter((q) => q.eq(q.field("userId"), classeSequence.createdBy))
        //     .first();

        //   if (visibilityTable) {
        //     const classeSequenceExist = visibilityTable.sequences.find(
        //       (sequence) => sequence.id === classeSequence._id
        //     );
        //     if (!classeSequenceExist) {
        //       visibilityTable.sequences.push({
        //         id: classeSequence._id,
        //         publish: args.publish,
        //         classe: true,
        //         classeId: classeSequence.classeId,
        //       });
        //       // Update the classe sequence
        //     } else {
        //       const sequenceIdx = visibilityTable.sequences.findIndex(
        //         (sequence) => sequence.id === classeSequence._id
        //       );
        //       visibilityTable.sequences[sequenceIdx].publish = args.publish;
        //     }
        //     await ctx.db.patch(classeSequence._id, {
        //       name: args.name,
        //       body: args.body,
        //       competencesIds: userComptences
        //         .filter((c) => args.competencesIds.includes(c._id))
        //         .map((c) => c._id),
        //       description: args.description,
        //       category: args.category,
        //       imageUrl: args.imageUrl,
        //       publish: args.publish,
        //     });
        //     await ctx.db.patch(visibilityTable._id, {
        //       sequences: visibilityTable.sequences,
        //     });
        //   }
        // }

        await ctx.db.patch(classeSequence._id, {
          name: args.name,
          body: args.body,
          competencesIds: userComptences
            .filter((c) => args.competencesIds.includes(c._id))
            .map((c) => c._id),
          description: args.description,
          category: args.category,
          imageUrl: args.imageUrl,
          publish: args.publish,
        });
      }
      return;
    } else {
      const existingSequence = await ctx.db
        .query('Sequences')
        .filter((q) => q.eq(q.field('_id'), args.sequenceId))
        .first();

      if (existingSequence) {
        const userComptences = await ctx.db
          .query('Competences')
          .filter((q) => q.eq(q.field('createdBy'), existingSequence.createdBy))
          .collect();
        const updateSequence = {
          name: args.name,
          body: args.body,
          competencesIds: userComptences
            .filter((c) => args.competencesIds.includes(c._id))
            .map((c) => c._id),
          description: args.description,
          category: args.category,
          imageUrl: args.imageUrl,
          publish: args.publish,
        };

        await ctx.db.patch(existingSequence._id, updateSequence);
        return;
      }
    }
  },
});

export const addBodyToSequence = mutation({
  args: {
    userId: v.string(),
    sequenceId: v.string(),
    body: v.string(),
    type: v.optional(v.literal('sequence')),
  },
  handler: async (ctx, args) => {
    if (args.type === 'sequence') {
      const classeSequence = await ctx.db
        .query('ClasseSequence')
        .filter((q) => q.eq(q.field('_id'), args.sequenceId))
        .first();

      if (classeSequence) {
        await ctx.db.patch(classeSequence._id, {
          body: args.body,
        });
      }
    } else {
      const existingSequence = await ctx.db
        .query('Sequences')
        .filter((q) => q.eq(q.field('_id'), args.sequenceId))
        .first();

      if (existingSequence) {
        await ctx.db.patch(existingSequence._id, {
          body: args.body,
        });
      }
    }
  },
});

export const getAllCoursInSequence = query({
  args: {
    userId: v.string(),
    sequenceId: v.string(),
    type: v.optional(v.literal('sequence')),
  },
  handler: async (ctx, args) => {
    if (args.type === 'sequence') {
      const classeSequence = await ctx.db
        .query('ClasseSequence')
        .filter((q) => q.eq(q.field('_id'), args.sequenceId))
        .first();

      if (classeSequence) {
        const cours = await ctx.db
          .query('Cours')
          .withIndex('by_sequenceId')
          .filter((q) => q.eq(q.field('sequenceId'), args.sequenceId))
          .collect();
        return cours;
      }
    }

    const cours = await ctx.db
      .query('Cours')
      .withIndex('by_sequenceId')
      .filter((q) => q.eq(q.field('sequenceId'), args.sequenceId))
      .collect();
    return cours;
  },
});

export const deleteSequence = mutation({
  args: {
    sequenceId: v.string(),
    type: v.union(v.literal('sequence'), v.literal('template')),
  },
  handler: async (ctx, args) => {
    console.log(`
      Deleting sequence ${args.sequenceId}
      Type: ${args.type}
    `);
    if (args.type === 'sequence') {
      const classeSequence = await ctx.db
        .query('ClasseSequence')
        .filter((q) => q.eq(q.field('_id'), args.sequenceId))
        .first();

      if (classeSequence) {
        await ctx.db.delete(classeSequence._id);
      }
    } else {
      const existingSequence = await ctx.db
        .query('Sequences')
        .filter((q) => q.eq(q.field('_id'), args.sequenceId))
        .first();

      if (existingSequence) {
        await ctx.db.delete(existingSequence._id);
      }
    }
  },
});
