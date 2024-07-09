import { PropsWithChildren, createContext, useContext } from "react";
import { ErrorDialogProps } from "./LayoutWithProps";
import { NavItem } from "@/lib/types";
export type LayoutWithPropsProps = PropsWithChildren & {
  readonly children?: React.ReactNode;
  readonly navItems?: NavItem[];
  readonly isEmpty?: boolean;
  readonly notFound?: boolean;
  readonly nothingToShow?: boolean;
  readonly isError?: ErrorDialogProps;
  readonly isLoading?: boolean;
  readonly experimentalItems?: boolean;
  readonly userId: string;
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
