import React from "react";
import EditorProviderWrapper from "./EditorProvider";

function Editor(props: {
  content: string;
  children: React.ReactNode;
  slotafter?: React.ReactNode;
}) {
  return (
    <EditorProviderWrapper content={props.content}>
      {props.slotafter}
      {props.children}
    </EditorProviderWrapper>
  );
}

export default Editor;
