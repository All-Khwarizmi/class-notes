import ErrorDialog from '@/core/components/common/ErrorDialog';
import LoadingSkeleton from '@/core/components/common/LoadingSkeleton';
import LayoutWithProps from '@/core/components/layout/LayoutWithProps';
import React, { Suspense } from 'react';

import SequenceLayout from './SequenceLayout';

async function Page({
  params,
  searchParams,
}: {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  if (
    !params.slug ||
    !searchParams?.type ||
    (searchParams.type !== 'template' && searchParams.type !== 'sequence')
  ) {
    return (
      <ErrorDialog message="Invalid URL. Please check the URL and try again." />
    );
  }
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SequenceLayout
        slug={params.slug}
        type={searchParams?.type as 'template' | 'sequence'}
      />
    </Suspense>
  );
}

export default Page;
