import { z, ZodLiteral } from "zod";

// Define the specific new grade types
export const SpecialGradeTypes = z.union([
  z.literal("N/G"), // Not Graded
  z.literal("M"), // Missing
  z.literal("N/D"), // Not Done
  z.literal("N/A"), // Not Applicable
  z.literal("Error"), // Error
]);

export type SpecialGradeType = z.infer<typeof SpecialGradeTypes>;
type NormalTypes = number | string;

// Define the union of the new grade types
type GradeTypeUnion =
  | { shouldReturn: true; returnValue: SpecialGradeType }
  | { shouldReturn: false; returnValue: NormalTypes };
// Define the type for the return object


// Helper function to check if the grade is one of the special types
function checkSpecialGradeType(grade: unknown): GradeTypeUnion {
  const result = SpecialGradeTypes.safeParse(grade);

  if (result.success) {
    return {
      shouldReturn: true,
      returnValue: result.data,
    };
  } else {
    const result = z.union([z.number(), z.string()]).safeParse(grade);
    if (result.success) {
      return {
        shouldReturn: false,
        returnValue: result.data,
      };
    } else {
      return {
        shouldReturn: true,
        returnValue: "N/A",
      };
    }
  }
}

export default checkSpecialGradeType;