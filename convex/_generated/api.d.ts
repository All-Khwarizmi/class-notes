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
import type * as classes from "../classes.js";
import type * as criteria from "../criteria.js";
import type * as criteria_dynamic_fields_link from "../criteria_dynamic_fields_link.js";
import type * as dynamic_fields from "../dynamic_fields.js";
import type * as evaluation_criteria from "../evaluation_criteria.js";
import type * as evaluation_template from "../evaluation_template.js";
import type * as evaluation_with_grades from "../evaluation_with_grades.js";
import type * as students from "../students.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  classes: typeof classes;
  criteria: typeof criteria;
  criteria_dynamic_fields_link: typeof criteria_dynamic_fields_link;
  dynamic_fields: typeof dynamic_fields;
  evaluation_criteria: typeof evaluation_criteria;
  evaluation_template: typeof evaluation_template;
  evaluation_with_grades: typeof evaluation_with_grades;
  students: typeof students;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
