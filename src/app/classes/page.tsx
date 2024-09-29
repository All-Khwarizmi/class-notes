import LoadingSkeleton from '@/core/components/common/LoadingSkeleton';
import { Suspense } from 'react';

import ClassesServerLayer from './ClassesServerLayer';

export default async function Home() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ClassesServerLayer slug="slug" />
    </Suspense>
  );
}
