"use server";

import { coursUsecases } from "../../usecases/cours-usecases";

export default function deleteCourse(options: { coursId: string }) {
  return coursUsecases.deleteCourse(options);
}
