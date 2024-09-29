import LoadingSkeleton from '@/core/components/common/LoadingSkeleton';
import React, { Suspense } from 'react';

import ClasseSequencesServerLayer from './ClasseSequencesServerLayer';

async function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ClasseSequencesServerLayer slug={params.slug} />
    </Suspense>
  );
}

export default Page;
