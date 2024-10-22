import { NavItem } from '@/lib/types';
import { PropsWithChildren, createContext, useContext } from 'react';
import React from 'react';

export interface ErrorDialogProps {
  message: string;
  path?: string;
  code?: string;
  description?: string;
}

export type LayoutWithPropsProps = PropsWithChildren & {
  readonly children?: React.ReactNode;
  readonly navItems: NavItem[];
  readonly isEmpty?: boolean;
  readonly notFound?: boolean;
  readonly nothingToShow?: boolean;
  readonly isError?: ErrorDialogProps;
  readonly isLoading?: boolean;
  readonly experimentalItems?: boolean;
  readonly userId: string;
  readonly hostname: string;
  readonly isLandingPage?: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsLandingPage?: (isLandingPage: boolean) => void;
  spacesNavItems?: NavItem[];
  // eslint-disable-next-line no-unused-vars
  setSpacesNavItems?: (navItems: NavItem[]) => void;
  isSpaces?: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsSpaces?: (isSpaces: boolean) => void;
};
const LayoutContext = createContext<LayoutWithPropsProps | null>(null);

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayoutContext must be used within a LayoutProvider');
  }
  return context;
};

export default LayoutContext;
