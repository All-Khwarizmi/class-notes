"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import { EXTENSIONS } from "@/core/components/constants/editor-extenstions";

function ShowSequence({ content }: { content: string }) {
  const editor = useEditor({
    editable: false,
    content:
      content !== ""
        ? content
        : `
  <p style="text-align: center; padding: 40px; font-family: Arial, sans-serif; background: #ffffff; border-radius: 8px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); max-width: 800px; margin: 0 auto;">
  <img src="https://assets-global.website-files.com/645a9acecda2e0594fac6126/6580a563d237ee85c9237ccb_gradient-noise-purple-azure.png" 
       alt="Placeholder Image" 
       width="327" 
       style="max-width: 100%; margin-bottom: 30px; border-radius: 8px;" />
  <h2 style="color: #333; margin-bottom: 20px;">🌟 Welcome to Our Content Platform 🌟</h2>
  <p style="color: #666; max-width: 600px; margin: 0 auto 30px; font-size: 18px; line-height: 1.6;">
    It looks like there is no content here yet. Stay tuned for upcoming updates and exciting content that will keep you engaged and informed!
  </p>
  <h4 style="color: #555; margin-bottom: 20px;">Here’s a sneak peek of what you can expect:</h4>
  <ul style="text-align: left; max-width: 600px; margin: 0 auto 30px; list-style: none; padding: 0; color: #555;">
    <li style="margin-bottom: 15px; display: flex; align-items: center;">
      <span style="display: inline-block; width: 20px; height: 20px; background: #ff7f50; border-radius: 50%; margin-right: 15px;"></span>
      Engaging articles and stories.
    </li>
    <li style="margin-bottom: 15px; display: flex; align-items: center;">
      <span style="display: inline-block; width: 20px; height: 20px; background: #6495ed; border-radius: 50%; margin-right: 15px;"></span>
      Helpful tips and guides.
    </li>
    <li style="margin-bottom: 15px; display: flex; align-items: center;">
      <span style="display: inline-block; width: 20px; height: 20px; background: #8a2be2; border-radius: 50%; margin-right: 15px;"></span>
      Interactive and engaging content.
    </li>
  </ul>
  <blockquote style="max-width: 600px; margin: 0 auto 30px; padding: 20px; border-left: 5px solid #ccc; background: #f1f1f1; text-align: left; font-style: italic; color: #555;">
    <p style="margin: 0;">"Great things are on the way! Stay tuned and be prepared for an amazing journey."</p>
  </blockquote>
  <p style="color: #777; font-size: 16px;">Thank you for visiting our platform. We can't wait to share our content with you!</p>
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

export default ShowSequence;
