import NotFound from '@/app/not-found';
import LoadingSkeleton from '@/core/components/common/LoadingSkeleton';
import { Suspense } from 'react';

import SequenceEditServerLayer from './SequenceEditServerLayer';

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  if (!params.slug) {
    return <NotFound />;
  }

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SequenceEditServerLayer slug={params.slug} searchParams={searchParams} />
    </Suspense>
  );
}
