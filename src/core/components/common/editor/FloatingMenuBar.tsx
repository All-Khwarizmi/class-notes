import MenuButton from '@/core/components/common/editor/MenuButton';
import MenuTextAlign from '@/core/components/common/editor/MenuTextAlign';
import { cn } from '@/lib/utils';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Code,
  Indent,
  IndentDecrease,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Undo,
  Video,
} from 'lucide-react';
import React from 'react';

import { HeadingMenuBar } from './HeadingMenuBar';
import MenuImage from './MenuImage';
import MenuTextColor from './MenuTextColor';

function FloatingMenuBar({ editor }: { editor: Editor }) {
  return (
    <div
      className={cn(
        'flex w-full gap-1  bg-secondary flex-wrap p-2 justify-center border rounded-tr-lg rounded-tl-lg'
      )}
    >
      <MenuButton
        editor={editor}
        onClick={() => editor.chain().focus().toggleBold().run()}
        nodeName="bold"
      >
        <Bold size={12} />
      </MenuButton>

      <HeadingMenuBar editor={editor} />

      <MenuTextColor editor={editor} />

      <MenuImage editor={editor} />

      <MenuTextAlign editor={editor} />

      <MenuButton
        editor={editor}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        nodeName="italic"
      >
        <Italic size={14} />
      </MenuButton>
      <MenuButton
        editor={editor}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        nodeName="bulletList"
      >
        <List size={14} />
      </MenuButton>

      <MenuButton
        editor={editor}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        nodeName="orderedList"
      >
        <ListOrdered size={14} />
      </MenuButton>

      <MenuButton
        editor={editor}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        nodeName="blockquote"
      >
        <Quote size={14} />
      </MenuButton>

      <MenuButton
        editor={editor}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        nodeName="strike"
      >
        <Strikethrough size={14} />
      </MenuButton>

      <MenuButton
        editor={editor}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        nodeName="code"
      >
        <Code size={14} />
      </MenuButton>

      <MenuButton
        editor={editor}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        nodeName="undo"
      >
        <Undo size={14} />
      </MenuButton>

      <MenuButton
        editor={editor}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        nodeName="redo"
      >
        <Redo size={14} />
      </MenuButton>
      {/* A butto to handle the identation */}
      <MenuButton
        editor={editor}
        onClick={() => editor.chain().focus().increaseIndent().run()}
        disabled={!editor.can().chain().focus().increaseIndent().run()}
        nodeName="indent"
      >
        <Indent size={14} />
      </MenuButton>
      <MenuButton
        editor={editor}
        onClick={() => editor.chain().focus().decreaseIndent().run()}
        disabled={!editor.can().chain().focus().decreaseIndent().run()}
        nodeName="indent"
      >
        <IndentDecrease size={14} />
      </MenuButton>
      <MenuButton
        editor={editor}
        onClick={() => {
          const videoUrl = prompt('Enter the video URL');
          if (!videoUrl) {
            return;
          }
          editor.commands.setYoutubeVideo({
            src: videoUrl,
            width: 480,
          });
        }}
        nodeName="youtube"
      >
        <Video size={14} />
      </MenuButton>
      <MenuButton
        editor={editor}
        onClick={() => {
          const url = prompt('Enter the URL');
          if (!url) {
            return;
          }
          editor.chain().focus().setLink({ href: url }).run();
        }}
        nodeName="link"
      >
        <Link size={14} />
      </MenuButton>
    </div>
  );
}

export default FloatingMenuBar;
