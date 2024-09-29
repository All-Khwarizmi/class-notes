import LoadingSkeleton from '@/core/components/common/LoadingSkeleton';
import React, { Suspense } from 'react';

import EvaluationServerLayer from './EvaluationServerLayer';

function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <EvaluationServerLayer evaluationId={params.slug} />
    </Suspense>
  );
}

export default Page;
