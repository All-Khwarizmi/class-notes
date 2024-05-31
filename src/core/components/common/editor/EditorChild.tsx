"use clent";
import { Button } from "@/core/components/ui/button";
import { useCurrentEditor } from "@tiptap/react";
import useUpdateCoursBody from "../../../../features/cours-sequence/application/usecases/services/useUpdateCoursBody";
import { Cours } from "../../../../features/cours-sequence/domain/entities/cours-schemas";

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
