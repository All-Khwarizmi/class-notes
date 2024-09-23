"use client";

import React, { useCallback, useState } from "react";
import { debounce } from "lodash";
import { Note } from "../../domain/notes-schemas";
import useUpdateNote from "../../application/adapters/services/useUpdateNote";
import FloatingEditor from "@/core/components/common/editor/FloatingEditor";
import { EDITOR_DEBOUNCE_TIME } from "@/core/components/constants/editor-constants";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { toastWrapper } from "@/core/utils/toast-wrapper";

function NoteEditorView({ note }: { note: Note }) {
  const [title, setTitle] = useState(note.name);
  const [content, setContent] = useState(note.content);
  const { mutate: updateNote, isSuccess } = useUpdateNote();

  const debounceSaveNote = useCallback(
    debounce(
      (content: string) => {
        updateNote({
          ...note,
          name: title,
          content,
        });
      },
      EDITOR_DEBOUNCE_TIME,
      { leading: false, trailing: true }
    ),
    [note, title, updateNote]
  );

  const handleSave = () => {
    if (note.content === content && note.name === title) {
      toastWrapper.info("La note n'a pas changé");
      return;
    }
    updateNote({
      ...note,
      name: title,
      content,
    });
    setContent(note.content);
    if (isSuccess) {
      toast.success("Note sauvegardée avec succès");
    }
  };

  return (
    <Card className="w-full h-[90vh]  max-w-4xl mx-auto overflow-y-hidden mt-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Éditeur de note</CardTitle>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Sauvegarder
        </Button>
      </CardHeader>
      <CardContent className="overflow-y-auto">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="note-title"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Titre de la note
            </label>
            <Input
              id="note-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="note-content"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Contenu de la note
            </label>
            <div className="mt-1  border rounded-md" id="note-content">
              <FloatingEditor
                content={note.content}
                debounceUpdateFn={debounceSaveNote}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default NoteEditorView;
