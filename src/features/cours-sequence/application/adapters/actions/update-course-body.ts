'use server';

import { coursUsecases } from '../../usecases/cours-usecases';

export default async function updateCourseBody(options: {
  userId: string;
  coursId: string;
  body: string;
}) {
  return coursUsecases.updateCourseBody(options);
}
