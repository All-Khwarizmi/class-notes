import { PropsWithChildren, createContext, useContext } from "react";
import { ErrorDialogProps } from "./LayoutWithProps";
import { NavItem } from "@/lib/types";
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
  readonly isLandingPage?: boolean;
  setIsLandingPage?: (isLandingPage: boolean) => void;
  spacesNavItems?: NavItem[];
  setSpacesNavItems?: (navItems: NavItem[]) => void;
  isSpaces?: boolean;
  setIsSpaces?: (isSpaces: boolean) => void;
};
const LayoutContext = createContext<LayoutWithPropsProps | null>(null);

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutContext must be used within a LayoutProvider");
  }
  return context;
};

export default LayoutContext;
