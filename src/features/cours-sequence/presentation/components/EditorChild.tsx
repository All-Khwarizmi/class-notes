"use clent";
import { Button } from "@/core/components/ui/button";
import { useCurrentEditor } from "@tiptap/react";
import useUpdateCoursBody from "../../application/usecases/services/useUpdateCoursBody";
import { Cours } from "../../domain/entities/cours-schemas";

export default function EditorChild({
 
  children,
}: {
  children: React.ReactNode;
  
}) {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return <>{children}</>;
}
