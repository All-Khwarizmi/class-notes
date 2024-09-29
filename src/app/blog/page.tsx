import LoadingSkeleton from '@/core/components/common/LoadingSkeleton';
import React, { Suspense } from 'react';

import BlogServerLayer from './BlogServerLayer';

function Page() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <BlogServerLayer />
    </Suspense>
  );
}

export default Page;
