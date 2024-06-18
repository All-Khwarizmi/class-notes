import React from "react";
import Header from "@/core/components/layout/Header";
import { NavItem } from "@/lib/types";
import Sidebar from "./Sidebar";
import { not } from "fp-ts/lib/Predicate";
import NotFound from "@/app/not-found";
import NothingToShow from "../common/editor/NothingToShow";
import ErrorDialog from "../common/ErrorDialog";

export interface ErrorDialogProps {
  message: string;
  path?: string;
  code?: string;
  description?: string;
}

export interface LayoutWithPropsProps {
  readonly children?: React.ReactNode;
  readonly navItems?: NavItem[];
  readonly isEmpty?: boolean;
  readonly notFound?: boolean;
  readonly nothingToShow?: boolean;
  readonly isError?: ErrorDialogProps;
}

function LayoutWithProps({
  children,
  navItems,
  isEmpty = false,
  notFound = false,
  nothingToShow = false,
  isError,
}: LayoutWithPropsProps) {
  return (
    <>
      <Header navItems={isEmpty === true ? [] : navItems} />
      <section className="flex h-full w-full border-collapse overflow-hidden">
        <Sidebar navItems={isEmpty === true ? [] : navItems} />
        <section className="h-full flex-1  pt-4 px-4 overflow-x-hidden">
          {notFound === true ? (
            <NotFound />
          ) : nothingToShow === true ? (
            <NothingToShow />
          ) : isError ? (
            <ErrorDialog {...isError} />
          ) : (
            children
          )}
        </section>
      </section>
    </>
  );
}

export default LayoutWithProps;
