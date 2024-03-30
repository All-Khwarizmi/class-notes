import { z } from "zod";

export enum GradeTypeEnum {
  Numeric = "numeric",
  Letter = "letter",
  PassFail = "pass/fail",
  Ungraded = "ungraded",
}

export const GradeSchema = z.union([
  z.literal("ungraded"),
  z.literal("numeric"),
  z.literal("letter"),
  z.literal("pass/fail"),
]);

export type GradeType = z.infer<typeof GradeSchema>;
