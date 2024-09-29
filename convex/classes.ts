import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

export const createClass = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    educationLevel: v.string(),
    educationSystem: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query('Users')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .first();

    if (existingUser) {
      const id = await ctx.db.insert('Classes', {
        userId: existingUser!._id,
        name: args.name,
        description: args.description,
        imageUrl: args.imageUrl,
        observations: [],
        evaluationsTemplatesId: [],
        educationSystem: args.educationSystem,
        educationLevel: args.educationLevel,
      });

      return { id, error: false };
    }
    return { id: null, error: true };
  },
});

export const deleteClass = mutation({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const classe = await ctx.db
      .query('Classes')
      .filter((q) => q.eq(q.field('_id'), args.id))
      .first();
    if (classe) {
      ctx.db.delete(classe._id);
      return { error: false, success: true };
    }
    return { error: true, success: false };
  },
});

export const getClasses = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('Users')
      .filter((q) => q.eq(q.field('userId'), args.id))
      .first();
    if (user) {
      const classes = await ctx.db
        .query('Classes')
        .filter((q) => q.eq(q.field('userId'), user._id))
        .collect();
      if (classes) {
        return classes;
      }
      return [];
    }
    return [];
  },
});

export const getClass = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query('Classes')
      .filter((q) => q.eq(q.field('_id'), args.id))
      .first();
  },
});

export const addSequenceClass = mutation({
  args: {
    classId: v.string(),
    sequenceId: v.string(),
  },
  handler: async (ctx, args) => {
    const sequence = await ctx.db
      .query('Sequences')
      .filter((q) => q.eq(q.field('_id'), args.sequenceId))
      .first();

    const classe = await ctx.db
      .query('Classes')
      .filter((q) => q.eq(q.field('_id'), args.classId))
      .first();

    if (sequence && classe) {
      // Get the cours and create new ones to add to the new sequence
      const result = await ctx.db.insert('ClasseSequence', {
        originalSequenceId: sequence._id,
        name: sequence.name,
        body: sequence.body,
        imageUrl: sequence.imageUrl,
        coursIds: sequence.coursIds,
        competencesIds: sequence.competencesIds,
        description: sequence.description,
        createdBy: sequence.createdBy,
        createdAt: sequence.createdAt,
        category: sequence.category,
        publish: sequence.publish ?? false,
        classeId: args.classId,
      });
      console.log(
        `
  Creating sequence ${sequence.name} for class ${classe.name}
  `
      );
      for (const coursId of sequence.coursIds) {
        console.log(`
  Creating cours ${coursId} for class ${classe.name}
  `);
        const cours = await ctx.db
          .query('Cours')
          .filter((q) => q.eq(q.field('_id'), coursId))
          .first();
        if (!cours) {
          console.log(`
  Cours ${coursId} not found
  `);
          return result;
        }
        console.log(`
  Creating cours ${cours.name} for class ${classe.name}
  `);
        const newCours = await ctx.db.insert('Cours', {
          name: cours.name,
          body: cours.body,
          imageUrl: cours.imageUrl,
          sequenceId: result,
          createdBy: cours.createdBy,
          createdAt: cours.createdAt,
          category: cours.category,
          publish: cours.publish,
          description: cours.description,
          lessons: cours.lessons,
          competences: cours.competences,
        });
        console.log(`
  Cours ${cours.name} created
  `);

        // Get the cours complement and create new ones to add to the new cours
        const coursComplements = await ctx.db
          .query('Complement')
          .filter((q) => q.eq(q.field('coursId'), cours._id))
          .collect();
        if (!coursComplements) {
          console.log(`
  No complements found for cours ${cours.name}
  `);
          return result;
        }
        for (const coursComplement of coursComplements) {
          console.log(`
  Creating complement ${coursComplement.name} for cours ${cours.name}
  `);
          await ctx.db.insert('Complement', {
            sequenceId: coursComplement.sequenceId,
            name: coursComplement.name,
            body: coursComplement.body,
            description: coursComplement.description,
            createdBy: coursComplement.createdBy,
            publish: coursComplement.publish,
            publishDate:
              coursComplement.publish === true ? Date.now() : undefined,
            coursId: newCours,
            type: coursComplement.type,
            contentType: coursComplement.contentType,
          });
          console.log(`
  Complement ${coursComplement.name} created
  `);
        }
        return result;
      }
      return result;
    } else {
      throw new Error('Sequence or class not found');
    }
  },
});

export const getClassSequences = query({
  args: {
    classId: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query('ClasseSequence')
      .filter((q) => q.eq(q.field('classeId'), args.classId))
      .collect();
  },
});

export const deleteSequenceClass = mutation({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const sequence = await ctx.db
      .query('ClasseSequence')
      .filter((q) => q.eq(q.field('_id'), args.id))
      .first();
    if (sequence) {
      ctx.db.delete(sequence._id);
      return { error: false, success: true };
    }
    return { error: true, success: false };
  },
});

export const getClassSequence = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query('ClasseSequence')
      .filter((q) => q.eq(q.field('_id'), args.id))
      .first();
    if (result) {
      return result;
    }
  },
});

// export const updateClassVisibility = mutation({
//   args: {
//     id: v.string(),
//     visibility: v.boolean(),
//   },
//   handler: async (ctx, args) => {
//     const classe = await ctx.db
//       .query("Classes")
//       .filter((q) => q.eq(q.field("_id"), args.id))
//       .first();
//     if (classe) {
//       // Update visibility table
//       const visibility = await ctx.db
//         .query("VisibilityTable")
//         .filter((q) => q.eq(q.field("userId"), classe.userId))
//         .first();

//       if (visibility) {
//         const classeIndex = visibility.classe.findIndex(
//           (classe) => classe.id === args.id
//         );
//         if (classeIndex !== -1) {
//           visibility.classe[classeIndex].publish = args.visibility;
//           await ctx.db.patch(visibility._id, { classe: visibility.classe });
//         } else {
//           visibility.classe.push({
//             id: args.id,
//             publish: args.visibility,
//           });
//           await ctx.db.patch(visibility._id, { classe: visibility.classe });
//         }
//       }

//       return { error: false, success: true };
//     }
//     return { error: true, success: false };
//   },
// });

export const deleteClasseSequencesFromClasseId = mutation({
  args: {
    classeId: v.string(),
  },
  handler: async (ctx, args) => {
    const sequences = await ctx.db
      .query('ClasseSequence')
      .filter((q) => q.eq(q.field('classeId'), args.classeId))
      .collect();
    if (sequences) {
      for (const sequence of sequences) {
        ctx.db.delete(sequence._id);
      }
      return { error: false, success: true };
    }
    return { error: true, success: false };
  },
});

export const deleteEvualuationsWithGradesFromClasseId = mutation({
  args: {
    classeId: v.string(),
  },
  handler: async (ctx, args) => {
    const evaluations = await ctx.db
      .query('EvaluationsWithGrades')
      .filter((q) => q.eq(q.field('classeId'), args.classeId))
      .collect();
    if (evaluations) {
      for (const evaluation of evaluations) {
        ctx.db.delete(evaluation._id);
      }
      return { error: false, success: true };
    }
    return { error: true, success: false };
  },
});

export const deleteStudentsFromClasseId = mutation({
  args: {
    classeId: v.string(),
  },
  handler: async (ctx, args) => {
    const students = await ctx.db
      .query('Students')
      .filter((q) => q.eq(q.field('classId'), args.classeId))
      .collect();
    if (students) {
      for (const student of students) {
        ctx.db.delete(student._id);
      }
      return { error: false, success: true };
    }
    return { error: true, success: false };
  },
});
