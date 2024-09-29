import NotesServerLayer from '@/app/profile/notes/[slug]/NotesServerLayer';
import LoadingSkeleton from '@/core/components/common/LoadingSkeleton';
import LayoutWithProps from '@/core/components/layout/LayoutWithProps';
import React, { Suspense } from 'react';

async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <NotesServerLayer slug={params.slug} type="cours" />
    </Suspense>
  );
}

export default Page;
