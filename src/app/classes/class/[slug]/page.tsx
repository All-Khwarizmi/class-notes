import LoadingSkeleton from '@/core/components/common/LoadingSkeleton';
import { Suspense } from 'react';

import ClasseLayout from './ClasseLayout';
import ClasseServerLayer from './ClasseServerLayer';

export default function ClassPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ClasseLayout slug={params.slug} />
    </Suspense>
  );
}
