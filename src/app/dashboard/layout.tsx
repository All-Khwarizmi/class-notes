import LayoutServerLayer from '@/core/components/layout/LayoutServerLayer';
import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutServerLayer>{children}</LayoutServerLayer>;
}

export default Layout;
