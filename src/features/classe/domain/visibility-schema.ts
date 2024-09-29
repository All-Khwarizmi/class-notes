import { z } from 'zod';

const VisibilitCourseSchema = z.object({
  id: z.string(),
  publish: z.boolean(),
  sequence: z.boolean(),
  sequenceId: z.string(),
  classe: z.boolean(),
  classeId: z.string(),
  name: z.string(),
  description: z.string(),
});
const VisibilityClasseSchema = z.object({
  id: z.string(),
  publish: z.boolean(),
  name: z.string(),
  description: z.string(),
});
const VisibilitySequenceSchema = z.object({
  id: z.string(),
  publish: z.boolean(),
  classe: z.boolean(),
  classeId: z.string(),
  name: z.string(),
  description: z.string(),
});
const VisibilityComplementSchema = z.object({
  id: z.string(),
  publish: z.boolean(),
  sequence: z.boolean(),
  sequenceId: z.string(),
  cours: z.boolean(),
  coursId: z.string(),
  classe: z.boolean(),
  classeId: z.string(),
  name: z.string(),
  description: z.string(),
});
export const VisibilitySchema = z.object({
  _id: z.string(),
  userId: z.string(),
  classe: z.array(VisibilityClasseSchema),
  sequences: z.array(VisibilitySequenceSchema),
  cours: z.array(VisibilitCourseSchema),
  complement: z.array(VisibilityComplementSchema),
});
export type VisibilityType = z.infer<typeof VisibilitySchema>;

export const FlatVisibilitySchema = z.object({
  id: z.string(),
  classes: z.array(
    VisibilityClasseSchema.extend({
      sequences: z.array(
        VisibilitySequenceSchema.extend({
          courses: z.array(
            VisibilitCourseSchema.extend({
              complements: z.array(VisibilityComplementSchema),
            })
          ),
        })
      ),
    })
  ),
});
export type FlatVisibilityType = z.infer<typeof FlatVisibilitySchema>;

export function flatVisibilityType(vt: VisibilityType): FlatVisibilityType {
  const flatVisibility: FlatVisibilityType = {
    id: vt._id,
    classes: [],
  };
  for (const classe of vt.classe) {
    const sequences = vt.sequences.filter((s) => s.classeId === classe.id);
    const flatClasse: FlatVisibilityType = {
      id: vt._id,
      classes: [
        {
          ...classe,
          sequences: sequences.map((s) => {
            const courses = vt.cours.filter((c) => c.sequenceId === s.id);
            return {
              ...s,
              courses: courses.map((c) => {
                const complements = vt.complement.filter(
                  (cm) => cm.coursId === c.id
                );
                return { ...c, complements };
              }),
            };
          }),
        },
      ],
    };
    flatVisibility.classes.push(...flatClasse.classes);
  }

  return flatVisibility;
}

// A Function from the flat version to the structured version
export function structuredVisibilityType(
  userId: string,
  vt: FlatVisibilityType
): Omit<VisibilityType, '_id'> {
  const visibility: Omit<VisibilityType, '_id'> = {
    userId,
    classe: [],
    sequences: [],
    cours: [],
    complement: [],
  };
  for (const classe of vt.classes) {
    visibility.classe.push({
      id: classe.id,
      publish: classe.publish,
      name: classe.name,
      description: classe.description,
    });
    for (const sequence of classe.sequences) {
      visibility.sequences.push({
        id: sequence.id,
        publish: sequence.publish,
        classe: sequence.classe,
        classeId: sequence.classeId,
        name: sequence.name,
        description: sequence.description,
      });
      for (const course of sequence.courses) {
        visibility.cours.push({
          id: course.id,
          publish: course.publish,
          sequence: course.sequence,
          sequenceId: course.sequenceId,
          classe: course.classe,
          classeId: course.classeId,
          name: course.name,
          description: course.description,
        });
        for (const complement of course.complements) {
          visibility.complement.push({
            id: complement.id,
            publish: complement.publish,
            sequence: complement.sequence,
            sequenceId: complement.sequenceId,
            cours: complement.cours,
            coursId: complement.coursId,
            classe: complement.classe,
            classeId: complement.classeId,
            name: complement.name,
            description: complement.description,
          });
        }
      }
    }
  }
  return visibility;
}

// A Function to toggle the visibility of an entity. We work with the flat version.The behavior is the following:
// When an entity is toggled off all its descendants are also toggled off.
// When an entity is toggled we leave the descendants as they are. This is to allow for a more granular control.
export function toggleVisibility(
  visibility: FlatVisibilityType,
  args: {
    type: 'classe' | 'sequence' | 'cours' | 'complement';
    typeId: string;
    publish: boolean;
  }
): FlatVisibilityType {
  const newVisibility = structuredClone(visibility);
  if (args.type === 'classe') {
    const classe = newVisibility.classes.find((c) => c.id === args.typeId);
    if (classe) {
      classe.publish = args.publish;
      newVisibility.classes = visibility.classes.map((c) =>
        c.id === args.typeId ? classe : c
      );
      if (!args.publish) {
        newVisibility.classes.forEach((c) => {
          c.sequences = c.sequences.map((s) =>
            s.classeId === args.typeId
              ? {
                  ...s,
                  classe: classe.publish,
                  publish: classe.publish,
                }
              : s
          );

          c.sequences.forEach((s) => {
            s.courses = s.courses.map((c) =>
              c.classeId === args.typeId
                ? {
                    ...c,
                    classe: classe.publish,
                    publish: classe.publish,
                    sequence: classe.publish,
                  }
                : c
            );
            s.courses.forEach((c) => {
              c.complements = c.complements.map((c) =>
                c.classeId === args.typeId
                  ? {
                      ...c,
                      classe: classe.publish,
                      publish: classe.publish,
                      sequence: classe.publish,
                      cours: classe.publish,
                    }
                  : c
              );
            });
            s.courses.forEach((c) => {
              c.complements = c.complements.map((c) =>
                c.classeId === args.typeId
                  ? {
                      ...c,
                      classe: classe.publish,
                      publish: classe.publish,
                      sequence: classe.publish,
                      cours: classe.publish,
                    }
                  : c
              );
            });
          });
        });
      } else {
        // We only update the visibility of the classe in the sequences, courses and complements
        newVisibility.classes.forEach((c) => {
          c.sequences = c.sequences.map((s) =>
            s.classeId === args.typeId
              ? {
                  ...s,
                  classe: classe.publish,
                }
              : s
          );
          c.sequences.forEach((s) => {
            s.courses = s.courses.map((c) =>
              c.classeId === args.typeId
                ? {
                    ...c,
                    classe: classe.publish,
                  }
                : c
            );
            s.courses.forEach((c) => {
              c.complements = c.complements.map((c) =>
                c.classeId === args.typeId
                  ? {
                      ...c,
                      classe: classe.publish,
                    }
                  : c
              );
            });
          });
        });
      }
    }
  } else if (args.type === 'sequence') {
    // Get the classe that contains the sequence
    const classe = newVisibility.classes.find((c) =>
      c.sequences.some((s) => s.id === args.typeId)
    );
    // Check if the classe exist and it's visible
    if (classe && classe.publish) {
      // Get the sequence
      const sequence = classe.sequences.find((s) => s.id === args.typeId);
      // Check if the sequence exist
      if (sequence) {
        // Set the visibility of the sequence
        sequence.publish = args.publish;
        // Update the visibility of the sequence in the classe object
        newVisibility.classes = visibility.classes.map((c) => ({
          ...c,
          sequences: c.sequences.map((s) =>
            s.id === args.typeId ? sequence : s
          ),
        }));
        // Update the visibility of the sequence in the courses if the sequence is toggled off
        if (!args.publish) {
          newVisibility.classes.forEach((c) => {
            c.sequences.forEach((s) => {
              s.courses = s.courses.map((c) =>
                c.sequenceId === args.typeId
                  ? {
                      ...c,
                      sequence: sequence.publish,
                      publish: sequence.publish,
                    }
                  : c
              );

              s.courses.forEach((c) => {
                c.complements = c.complements.map((c) =>
                  c.sequenceId === args.typeId
                    ? {
                        ...c,
                        sequence: sequence.publish,
                        publish: sequence.publish,
                        cours: sequence.publish,
                      }
                    : c
                );
              });
            });
          });
        } else {
          // We only update the visibility of the sequence in the courses and complements
          newVisibility.classes.forEach((c) => {
            c.sequences.forEach((s) => {
              s.courses = s.courses.map((c) =>
                c.sequenceId === args.typeId
                  ? {
                      ...c,
                      sequence: sequence.publish,
                    }
                  : c
              );
              s.courses.forEach((c) => {
                c.complements = c.complements.map((c) =>
                  c.sequenceId === args.typeId
                    ? {
                        ...c,
                        sequence: sequence.publish,
                      }
                    : c
                );
              });
            });
          });
        }
      }
    }
  } else if (args.type === 'cours') {
    // Get the classe that contains the course
    const classe = newVisibility.classes.find((c) =>
      c.sequences.some((s) => s.courses.some((c) => c.id === args.typeId))
    );
    // Check if the classe exist and it's visible
    if (classe && classe.publish) {
      // Get the sequence that contains the course
      const sequence = classe.sequences.find((s) =>
        s.courses.some((c) => c.id === args.typeId)
      );
      // Check if the sequence exist and it's visible
      if (sequence && sequence.publish) {
        // Get the course
        const course = classe.sequences
          .flatMap((s) => s.courses)
          .find((c) => c.id === args.typeId);
        // Check if the course exist
        if (course) {
          // Set the visibility of the course
          course.publish = args.publish;
          // Update the visibility of the course in the classe object
          newVisibility.classes = visibility.classes.map((c) => ({
            ...c,
            sequences: c.sequences.map((s) => ({
              ...s,
              courses: s.courses.map((c) =>
                c.id === args.typeId ? course : c
              ),
            })),
          }));
          // Update the visibility of the course in the complements if the course is toggled off
          if (!args.publish) {
            newVisibility.classes.forEach((c) => {
              c.sequences.forEach((s) => {
                s.courses.forEach((c) => {
                  c.complements = c.complements.map((c) =>
                    c.coursId === args.typeId
                      ? {
                          ...c,
                          cours: course.publish,
                          publish: course.publish,
                        }
                      : c
                  );
                });
              });
            });
          } else {
            // We only update the visibility of the course in the complements
            newVisibility.classes.forEach((c) => {
              c.sequences.forEach((s) => {
                s.courses.forEach((c) => {
                  c.complements = c.complements.map((c) =>
                    c.coursId === args.typeId
                      ? {
                          ...c,
                          cours: course.publish,
                        }
                      : c
                  );
                });
              });
            });
          }
        }
      }
    }
  } else if (args.type === 'complement') {
    // Get the classe that contains the complement
    const classe = newVisibility.classes.find((c) =>
      c.sequences.some((s) =>
        s.courses.some((c) => c.complements.some((cm) => cm.id === args.typeId))
      )
    );
    // Check if the classe exist and it's visible
    if (classe && classe.publish) {
      // Get the sequence that contains the complement
      const sequence = classe.sequences.find((s) =>
        s.courses.some((c) => c.complements.some((cm) => cm.id === args.typeId))
      );
      // Check if the sequence exist and it's visible
      if (sequence && sequence.publish) {
        // Get the course that contains the complement
        const course = sequence.courses.find((c) =>
          c.complements.some((cm) => cm.id === args.typeId)
        );
        // Check if the course exist and it's visible
        if (course && course.publish) {
          // Get the complement
          const complement = course.complements.find(
            (cm) => cm.id === args.typeId
          );
          // Check if the complement exist
          if (complement) {
            // Set the visibility of the complement
            complement.publish = args.publish;
            // Update the visibility of the complement in the classe object
            newVisibility.classes = visibility.classes.map((c) => ({
              ...c,
              sequences: c.sequences.map((s) => ({
                ...s,
                courses: s.courses.map((c) => ({
                  ...c,
                  complements: c.complements.map((cm) =>
                    cm.id === args.typeId ? complement : cm
                  ),
                })),
              })),
            }));
          }
        }
      }
    }
  }
  return newVisibility;
}
// export function toggleVisibility(
//   visibility: FlatVisibilityType,
//   updateVisibility: (
//     userId: string,
//     type: "classe" | "sequence" | "cours" | "complement",
//     typeId: string,
//     publish: boolean
//   ) => void,
//   args: {
//     type: "classe" | "sequence" | "cours" | "complement";
//     typeId: string;
//     publish: boolean;
//   }
// ): FlatVisibilityType {
//   const newVisibility = structuredClone(visibility);
//   if (args.type === "classe") {
//     const classe = newVisibility.classes.find((c) => c.id === args.typeId);
//     if (classe) {
//       classe.publish = args.publish;
//       newVisibility.classes = visibility.classes.map((c) =>
//         c.id === args.typeId ? classe : c
//       );

//       if (!args.publish) {
//         newVisibility.classes.forEach((c) => {
//           c.sequences = c.sequences.map((s) =>
//             s.classeId === args.typeId
//               ? {
//                   ...s,
//                   classe: classe.publish,
//                   publish: classe.publish,
//                 }
//               : s
//           );
//           c.sequences.forEach((s) => {
//             s.courses = s.courses.map((c) =>
//               c.classeId === args.typeId
//                 ? {
//                     ...c,
//                     classe: classe.publish,
//                     publish: classe.publish,
//                     sequence: classe.publish,
//                   }
//                 : c
//             );
//             s.courses.forEach((c) => {
//               c.complements = c.complements.map((c) =>
//                 c.classeId === args.typeId
//                   ? {
//                       ...c,
//                       classe: classe.publish,
//                       publish: classe.publish,
//                       sequence: classe.publish,
//                       cours: classe.publish,
//                     }
//                   : c
//               );
//             });
//           });
//         });
//       }
//     }
//   } else if (args.type === "sequence") {
//     // Get the classe that contains the sequence
//     console.log(" // Get the classe that contains the sequence");
//     const classe = newVisibility.classes.find((c) =>
//       c.sequences.some((s) => s.id === args.typeId)
//     );
//     // Check if the classe exist and it's visible
//     console.log("// Check if the classe exist and it's visible");

//     if (classe && classe.publish) {
//       // Get the sequence
//       console.log("// Get the sequence");
//       const sequence = classe.sequences.find((s) => s.id === args.typeId);
//       // Check if the sequence exist
//       console.log("// Check if the sequence exist");
//       if (sequence) {
//         // Set the visibility of the sequence
//         console.log("// Set the visibility of the sequence");
//         sequence.publish = args.publish;
//         // Update the visibility of the sequence in the classe object
//         console.log(
//           "// Update the visibility of the sequence in the classe object"
//         );
//         newVisibility.classes = visibility.classes.map((c) => ({
//           ...c,
//           sequences: c.sequences.map((s) =>
//             s.id === args.typeId ? sequence : s
//           ),
//         }));
//         // Update the visibility of the sequence in the courses if the sequence is toggled off
//         console.log("// Update the visibility of the sequence in the courses");
//         if (!args.publish) {
//           newVisibility.classes.forEach((c) => {
//             c.sequences.forEach((s) => {
//               s.courses = s.courses.map((c) =>
//                 c.sequenceId === args.typeId
//                   ? {
//                       ...c,
//                       sequence: sequence.publish,
//                       publish: sequence.publish,
//                     }
//                   : c
//               );
//               s.courses.forEach((c) => {
//                 c.complements = c.complements.map((c) =>
//                   c.sequenceId === args.typeId
//                     ? {
//                         ...c,
//                         sequence: sequence.publish,
//                         publish: sequence.publish,
//                         cours: sequence.publish,
//                       }
//                     : c
//                 );
//               });
//             });
//           });
//         }
//       }
//     }
//   } else if (args.type === "cours") {
//     // Get the classe that contains the course
//     const classe = newVisibility.classes.find((c) =>
//       c.sequences.some((s) => s.courses.some((c) => c.id === args.typeId))
//     );
//     // Check if the classe exist and it's visible
//     if (classe && classe.publish) {
//       // Get the sequence that contains the course
//       const sequence = classe.sequences.find((s) =>
//         s.courses.some((c) => c.id === args.typeId)
//       );
//       // Check if the sequence exist and it's visible
//       if (sequence && sequence.publish) {
//         // Get the course
//         const course = classe.sequences
//           .flatMap((s) => s.courses)
//           .find((c) => c.id === args.typeId);
//         // Check if the course exist
//         if (course) {
//           // Set the visibility of the course
//           course.publish = args.publish;
//           // Update the visibility of the course in the classe object
//           newVisibility.classes = visibility.classes.map((c) => ({
//             ...c,
//             sequences: c.sequences.map((s) => ({
//               ...s,
//               courses: s.courses.map((c) =>
//                 c.id === args.typeId ? course : c
//               ),
//             })),
//           }));
//           // Update the visibility of the course in the complements if the course is toggled off
//           if (!args.publish) {
//             newVisibility.classes.forEach((c) => {
//               c.sequences.forEach((s) => {
//                 s.courses.forEach((c) => {
//                   c.complements = c.complements.map((c) =>
//                     c.coursId === args.typeId
//                       ? {
//                           ...c,
//                           cours: course.publish,
//                           publish: course.publish,
//                         }
//                       : c
//                   );
//                 });
//               });
//             });
//           }
//         }
//       }
//     }
//   } else if (args.type === "complement") {
//     // Get the classe that contains the complement
//     const classe = newVisibility.classes.find((c) =>
//       c.sequences.some((s) =>
//         s.courses.some((c) => c.complements.some((cm) => cm.id === args.typeId))
//       )
//     );
//     // Check if the classe exist and it's visible
//     if (classe && classe.publish) {
//       // Get the sequence that contains the complement
//       const sequence = classe.sequences.find((s) =>
//         s.courses.some((c) => c.complements.some((cm) => cm.id === args.typeId))
//       );
//       // Check if the sequence exist and it's visible
//       if (sequence && sequence.publish) {
//         // Get the course that contains the complement
//         const course = sequence.courses.find((c) =>
//           c.complements.some((cm) => cm.id === args.typeId)
//         );
//         // Check if the course exist and it's visible
//         if (course && course.publish) {
//           // Get the complement
//           const complement = course.complements.find(
//             (cm) => cm.id === args.typeId
//           );
//           // Check if the complement exist
//           if (complement) {
//             // Set the visibility of the complement
//             complement.publish = args.publish;
//             // Update the visibility of the complement in the classe object
//             newVisibility.classes = visibility.classes.map((c) => ({
//               ...c,
//               sequences: c.sequences.map((s) => ({
//                 ...s,
//                 courses: s.courses.map((c) => ({
//                   ...c,
//                   complements: c.complements.map((cm) =>
//                     cm.id === args.typeId ? complement : cm
//                   ),
//                 })),
//               })),
//             }));
//           }
//         }
//       }
//     }
//   }
//   return newVisibility;
// }
