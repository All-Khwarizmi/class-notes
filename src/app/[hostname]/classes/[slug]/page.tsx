import NotFound from '@/app/not-found';
import LoadingSkeleton from '@/core/components/common/LoadingSkeleton';
import React, { Suspense } from 'react';

import SpacesClasseServerLayer from './SpacesClasseServerLayer';

async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  if (!params.slug) {
    return <NotFound />;
  }
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SpacesClasseServerLayer slug={params.slug} searchParams={searchParams} />
    </Suspense>
  );
}

export default Page;
