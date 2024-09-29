'use client';

import { EXTENSIONS } from '@/core/components/constants/editor-extenstions';
import { EditorProvider, useEditor } from '@tiptap/react';
import { debounce } from 'lodash';

import { MenuBar } from './MenuBar';

export default function EditorProviderWrapper({
  children,
  content,
  onUpdate,
}: {
  content: string;
  children: React.ReactNode;
  onUpdate?: (content: string) => void;
}) {
  const debouncedUpdate = debounce((content: string) => {
    onUpdate!(content);
  }, 3000);
  return (
    <EditorProvider
      onUpdate={(editor) => {
        const content = editor.editor.getHTML();
        if (onUpdate) {
          debouncedUpdate(content);
          return;
        }
      }}
      autofocus
      content={
        content !== ''
          ? content
          : '<p style="text-align: center"></p><p style="text-align: center"><img src="https://assets-global.website-files.com/645a9acecda2e0594fac6126/6580a563d237ee85c9237ccb_gradient-noise-purple-azure.png" alt="Placeholder Image" width="327" height="auto style="></p><p><br></p><p></p><h2 style="text-align: center">🔥🔥 Welcome to Your Editor</h2><p style="text-align: center"></p><h4>To get started, try the following:</h4><ul><li><p><strong>Bold</strong> your text by selecting it and pressing <code>Ctrl+B</code>.</p></li><li><p><em>Italicize</em> your text by selecting it and pressing <code>Ctrl+I</code>.</p></li><li><p>Add links to enrich your content.</p></li></ul><blockquote><h4>This is a blockquote. Use it to highlight important information or quotes.</h4></blockquote><h4>Start typing to explore more features!</h4>'
      }
      slotBefore={<MenuBar />}
      extensions={EXTENSIONS}
    >
      {children}
    </EditorProvider>
  );
}
