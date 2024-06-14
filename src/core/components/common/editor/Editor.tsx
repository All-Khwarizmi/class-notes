import React from "react";
import EditorProviderWrapper from "./EditorProvider";

function Editor(props: {
  content: string;
  children?: React.ReactNode;
  slotafter?: React.ReactNode;
  onUpdate?: (content: string) => void;
}) {
  return (
    <EditorProviderWrapper
      onUpdate={props.onUpdate}
      content={
        props.content !== ""
          ? props.content
          : `
  <p style="text-align: center"></p><p style="text-align: center"><img src="https://assets-global.website-files.com/645a9acecda2e0594fac6126/6580a563d237ee85c9237ccb_gradient-noise-purple-azure.png" alt="Placeholder Image" width="327" height="auto style="></p><p><br></p><p></p><h2 style="text-align: center">🔥🔥 Welcome to Your Editor</h2><p style="text-align: center"></p><h4>To get started, try the following:</h4><ul><li><p><strong>Bold</strong> your text by selecting it and pressing <code>Ctrl+B</code>.</p></li><li><p><em>Italicize</em> your text by selecting it and pressing <code>Ctrl+I</code>.</p></li><li><p>Add links to enrich your content.</p></li></ul><blockquote><h4>This is a blockquote. Use it to highlight important information or quotes.</h4></blockquote><h4>Start typing to explore more features!</h4>
          `
      }
    >
      {props.slotafter}
      {props.children}
    </EditorProviderWrapper>
  );
}

export default Editor;
