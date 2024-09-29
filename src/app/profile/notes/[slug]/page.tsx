import LoadingSkeleton from '@/core/components/common/LoadingSkeleton';
import React, { Suspense } from 'react';

import NotesServerLayer from './NotesServerLayer';

async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <NotesServerLayer slug={params.slug} type="profile" />
    </Suspense>
  );
}

export default Page;
