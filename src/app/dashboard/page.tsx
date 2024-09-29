import LoadingSkeleton from '@/core/components/common/LoadingSkeleton';
import { Suspense } from 'react';

import DashboardServerLayer from './DashboardServerLayer';

export default function Page() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <DashboardServerLayer />
    </Suspense>
  );
}
