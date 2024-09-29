'use client';

import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditorProvider,
  RichTextField,
  MenuButtonColorPicker,
  RichTextEditor,
} from 'mui-tiptap';

export default function EditorProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello <b>world</b>!</p>',
  });
  if (!editor) {
    return null;
  }
  return (
    <RichTextEditorProvider editor={editor}>
      <RichTextField
        controls={
          <MenuControlsContainer>
            <MenuSelectHeading />
            <MenuDivider />
            <MenuButtonBold />
            <MenuButtonItalic />
            <MenuButtonColorPicker
              tooltipLabel="A"
              onChange={(color) => {
                editor.commands.setColor(color);
              }}
              swatchColors={[
                '#000000',
                '#333333',
                '#666666',
                '#999999',

                '#ffcc33',
              ]}
              value="#ffcc00"
            />
            {/* Add more controls of your choosing here */}
          </MenuControlsContainer>
        }
      />
      {children}
    </RichTextEditorProvider>
  );
}
