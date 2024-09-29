import SpacesLayout from '@/core/components/layout/SpacesLayout';
import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return <SpacesLayout>{children}</SpacesLayout>;
}

export default Layout;
