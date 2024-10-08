'use server';

import Failure from '@/core/failures/failures';
import {
  Student,
  StudentSchema,
} from '@/features/student/domain/entities/student-schema';
import { fetchQuery } from 'convex/nextjs';
import { Either, left, right } from 'fp-ts/lib/Either';

import { api } from '../../../../../../convex/_generated/api';

export default async function getStudents(options: {
  classeId: string;
}): Promise<Either<Failure<string>, Student[]>> {
  try {
    const rawData = await fetchQuery(api.students.getStudents, {
      classId: options.classeId,
    });

    const validatedStudents: Student[] = [];
    for await (const student of rawData) {
      const validatedStudent = StudentSchema.safeParse({
        ...student,
        id: student._id,
      });
      if (validatedStudent.success === false) {
        return left(
          Failure.invalidValue({
            message: 'Invalid student data',
            invalidValue: student,
            code: 'APP203',
          })
        );
      }
      validatedStudents.push(validatedStudent.data);
    }

    return right(validatedStudents);
  } catch (error) {
    return left(
      Failure.invalidValue({
        message: 'An unexpected error occurred',
        invalidValue: error,
        code: 'APP201',
      })
    );
  }
}
