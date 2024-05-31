import Editor from "@/core/components/common/editor/Editor";
import React from "react";
import { Complement } from "../../domain/complement-schemas";

function ComplementView(props: { slug: string; complement: Complement }) {
  return (
    <Editor content={props.complement.body}>
      <div>Complement id : {props.slug}</div>
    </Editor>
  );
}

export default ComplementView;
