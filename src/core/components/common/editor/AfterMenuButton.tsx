import { cn } from "@/lib/utils";
import { PropTypes } from "@mui/material";
import React, { ButtonHTMLAttributes } from "react";

function AfterMenuButton(props: {
  children: React.ReactNode;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}) {
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
