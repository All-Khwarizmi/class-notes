"use server";

import { coursUsecases } from "../../usecases/cours-usecases";

export default function updateCourseBody(options: {
  userId: string;
  coursId: string;
  body: string;
}) {
  return coursUsecases.updateCourseBody(options);
}
