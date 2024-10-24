import { NavItem } from '@/lib/types';
import { PropsWithChildren, createContext, useContext } from 'react';
import React from 'react';

export type SpacesLayoutContextType = PropsWithChildren & {
  readonly children?: React.ReactNode;

  isEmpty?: boolean;
  notFound?: boolean;
  nothingToShow?: boolean;
  spacesNavItems?: NavItem[];
  // eslint-disable-next-line no-unused-vars
  setSpacesNavItems?: (navItems: NavItem[]) => void;
};

const SpacesLayoutContext = createContext<SpacesLayoutContextType | null>(null);
export const useSpacesLayoutContext = () => {
  const context = useContext(SpacesLayoutContext);
  if (!context) {
    throw new Error(
      'useSpacesLayoutContext must be used within a <SpacesLayoutProvider></SpacesLayoutProvider>'
    );
  }
  return context;
};

export default SpacesLayoutContext;
