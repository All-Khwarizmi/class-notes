import { cn } from "@/lib/utils";
import { PropTypes } from "@mui/material";
import { Ban, Cross, Plus } from "lucide-react";
import Link from "next/link";
import React, { ButtonHTMLAttributes } from "react";

function AfterMenuButton(props: {
  children?: React.ReactNode;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
  addButton?: boolean;
  path?: string;
}) {
  if (props.addButton && props.path) {
    return (
      <button
        {...props.props}
        className={cn(
          "bg-transparent rounded-md p-1 px-2 flex items-center ml-2 hover:bg-slate-400 border border-slate-400 hover:border-slate-400",
          props.props?.className
        )}
      >
        <Link href={props.path}>
          <Plus size={12} />
        </Link>
      </button>
    );
  }
  if (props.addButton && !props.path) {
    return (
      <button
        disabled
        {...props.props}
        className={cn(
          "bg-slate-400 rounded-md p-1 px-2 flex items-center",
          props.props?.className
        )}
      >
        <Ban size={12} />
      </button>
    );
  }
  return (
    <button
      {...props.props}
      className={cn("bg-slate-400 rounded-md p-1 px-2", props.props?.className)}
    >
      {props.children}
    </button>
  );
}

export default AfterMenuButton;
