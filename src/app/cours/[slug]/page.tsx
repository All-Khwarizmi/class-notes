import NotFound from '@/app/not-found';
import LoadingSkeleton from '@/core/components/common/LoadingSkeleton';
import { Suspense } from 'react';

import CourseLayout from './CourseLayout';

export default async function Page({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    return <NotFound />;
  }
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <CourseLayout slug={params.slug} />
    </Suspense>
  );
}
