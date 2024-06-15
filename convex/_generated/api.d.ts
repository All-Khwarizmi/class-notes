/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.10.0.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as category from "../category.js";
import type * as classes from "../classes.js";
import type * as competences from "../competences.js";
import type * as complement from "../complement.js";
import type * as cours from "../cours.js";
import type * as criteria from "../criteria.js";
import type * as evaluation_base from "../evaluation_base.js";
import type * as evaluation_with_grades from "../evaluation_with_grades.js";
import type * as fields_grade_type from "../fields/grade_type.js";
import type * as notes from "../notes.js";
import type * as sequence from "../sequence.js";
import type * as students from "../students.js";
import type * as tables_evaluation_base from "../tables/evaluation_base.js";
import type * as tables_evaluations_with_grades from "../tables/evaluations_with_grades.js";
import type * as template from "../template.js";
import type * as users from "../users.js";
import type * as visibility from "../visibility.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  category: typeof category;
  classes: typeof classes;
  competences: typeof competences;
  complement: typeof complement;
  cours: typeof cours;
  criteria: typeof criteria;
  evaluation_base: typeof evaluation_base;
  evaluation_with_grades: typeof evaluation_with_grades;
  "fields/grade_type": typeof fields_grade_type;
  notes: typeof notes;
  sequence: typeof sequence;
  students: typeof students;
  "tables/evaluation_base": typeof tables_evaluation_base;
  "tables/evaluations_with_grades": typeof tables_evaluations_with_grades;
  template: typeof template;
  users: typeof users;
  visibility: typeof visibility;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
