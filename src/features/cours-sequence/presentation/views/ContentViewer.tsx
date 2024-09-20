"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import { EXTENSIONS } from "@/core/components/constants/editor-extenstions";
import { NavItem } from "@/lib/types";
import { useSpacesLayoutContext } from "@/core/components/layout/SpacesLayoutCtx";
import { useEffect } from "react";

function ContentViewer({
  content,
  navItems,
}: {
  content: string;
  navItems: NavItem[];
}) {
  const { setSpacesNavItems } = useSpacesLayoutContext();
  useEffect(() => {
    if (setSpacesNavItems) {
      setSpacesNavItems(navItems);
    }
  }, [navItems, setSpacesNavItems]);

  const editor = useEditor({
    editable: false,
    content:
      content !== ""
        ? content
        : `
<div style="text-align: center; padding: 20px; font-family: Arial, sans-serif;">
  <h2>Welcome to Our Content Platform</h2>
  <p>No content available yet. Check back soon for updates!</p>
  <ul style="list-style: none; padding: 0;">
    <li>📚 Articles</li>
    <li>💡 Tips</li>
    <li>🎨 Interactive content</li>
  </ul>
</div>
`,
    extensions: EXTENSIONS,
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
}

export default ContentViewer;
