import { createContext, useContext } from "react";
import type { LayoutWithPropsProps } from "./LayoutWithProps";

const LayoutContext = createContext<LayoutWithPropsProps | null>(null);

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutContext must be used within a LayoutProvider");
  }
  return context;
};

export default LayoutContext;
