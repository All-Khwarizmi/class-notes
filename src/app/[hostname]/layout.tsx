import SpacesLayoutServerLayer from '@/core/components/layout/SpacesLayoutServerLayer';
import React from 'react';

export const dynamic = 'force-dynamic';

function Layout({ children }: { children: React.ReactNode }) {
  return <SpacesLayoutServerLayer>{children}</SpacesLayoutServerLayer>;
}

export default Layout;
