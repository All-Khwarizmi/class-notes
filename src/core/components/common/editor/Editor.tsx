import React from "react";
import EditorProviderWrapper from "./EditorProvider";

function Editor(props: {
  content: string;
  children?: React.ReactNode;
  slotafter?: React.ReactNode;
}) {
  return (
    <EditorProviderWrapper
      content={
        props.content !== ""
          ? props.content
          : `
<div class="placeholder-content">
<p style="text-align: center"><span class="react-renderer node-image ProseMirror-selectednode" contenteditable="false" draggable="true"><div as="div" draggable="true" data-drag-handle="true" data-node-view-wrapper="" style="white-space: normal; overflow: hidden; position: relative; display: inline-block; line-height: 0px;"><div style="overflow: hidden; position: relative; display: inline-block; line-height: 0px;"><img src="https://assets-global.website-files.com/645a9acecda2e0594fac6126/6580a563d237ee85c9237ccb_gradient-noise-purple-azure.png" alt="Placeholder Image" width="327" height="auto style="cursor: default;"></div></div></span><img class="ProseMirror-separator" alt=""><br class="ProseMirror-trailingBreak"></p>
<h2 style="text-align: center">🔥🔥 Welcome to Your Editor</h2>
  <p>To get started, try the following:</p>
  <ul>
    <li><strong>Bold</strong> your text by selecting it and pressing <code>Ctrl+B</code>.</li>
    <li><em>Italicize</em> your text by selecting it and pressing <code>Ctrl+I</code>.</li>
    <li>Add <a href="#">links</a> to enrich your content.</li>
  </ul>
  <blockquote>
    <p>This is a blockquote. Use it to highlight important information or quotes.</p>
  </blockquote>
  <p>Start typing to explore more features!</p>
</div>
          `
      }
    >
      {props.slotafter}
      {props.children}
    </EditorProviderWrapper>
  );
}

export default Editor;
