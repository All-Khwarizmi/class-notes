import NotFound from '@/app/not-found';
import LoadingSkeleton from '@/core/components/common/LoadingSkeleton';
import { Suspense } from 'react';

import CoursAddServerLayer from './CoursAddServerLayer';

export default async function Page({ params }: { params: { slug: string } }) {
  if (!params.slug) {
    return <NotFound />;
  }

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <CoursAddServerLayer slug={params.slug} />
    </Suspense>
  );
}
