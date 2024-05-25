"use clent";
import { Button } from "@/core/components/ui/button";
import { useCurrentEditor } from "@tiptap/react";
import useUpdateCoursBody from "../../application/usecases/services/useUpdateCoursBody";
import { Cours } from "../../domain/entities/cours-schemas";

export default function EditorChild({
    cours,
    userId
}:
{
    cours: Cours
    userId: string
}) {
    const {
        setUpdateCoursBodyOptions
    } = useUpdateCoursBody();
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <>
      <Button
      className="mt-2"
      onClick={() => {

        setUpdateCoursBodyOptions({
            userId,
            coursId: cours._id,
            body: editor.getHTML()
        });
    }}
       >Save</Button>
      
    </>
  );
}
