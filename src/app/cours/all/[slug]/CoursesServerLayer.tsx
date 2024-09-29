import ErrorDialog from '@/core/components/common/ErrorDialog';
import checkAuthAndRedirect from '@/data-access/auth/check-and-redirect';
import { coursUsecases } from '@/features/cours-sequence/application/usecases/cours-usecases';
import CoursesTable from '@/features/cours-sequence/presentation/components/CoursesTable';
import { isLeft } from 'fp-ts/lib/Either';
import React from 'react';

async function CoursesServerLayer({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key in string]: string };
}) {
  const { slug } = params;
  const { type } = searchParams;
  if (!slug || !type || (type !== 'template' && type !== 'sequence')) {
    return (
      <ErrorDialog
        code="PRE301"
        message="Invalid params"
        description="Invalid params"
      />
    );
  }
  const { userId } = await checkAuthAndRedirect();
  //! TODO: @DATA-ACCESS

  const eitherCourses = await coursUsecases.getAllCoursFromSequence({
    sequenceId: slug,
    userId,
    type,
  });
  if (isLeft(eitherCourses)) {
    return (
      <ErrorDialog
        message={`
        An error occurred while fetching courses. 
        `}
        code={eitherCourses.left.code}
        description={
          process.env.NODE_ENV === 'development'
            ? eitherCourses.left.message
            : 'An error occurred while fetching courses.'
        }
      />
    );
  }
  return (
    <CoursesTable
      courses={eitherCourses.right}
      sequenceId={slug}
      userId={userId}
    />
  );
}

export default CoursesServerLayer;
