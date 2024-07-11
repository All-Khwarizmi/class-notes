import ErrorDialog from "@/core/components/common/ErrorDialog";
import Layout from "@/core/components/layout/ExperimentalLayout";
import { notesUsecases } from "@/features/notes/application/usecases/note-usecases";
import { NoteSchema } from "@/features/notes/domain/notes-schemas";
import NoteEditorView from "@/features/notes/presentation/views/NoteEditorView";
import { isLeft } from "fp-ts/lib/Either";
import React from "react";

async function NoteServerLayer(props: { slug: string }) {
  if (!props.slug) {
    return <Layout.NotFound />;
  }

  const eitherNote = await notesUsecases.getNote({
    id: props.slug,
  });

  if (isLeft(eitherNote)) {
    return (
      <ErrorDialog
        message={`
        Failed to fetch note with id: ${props.slug}

        ${eitherNote.left.message}
        Code: ${eitherNote.left.code}
        `}
      />
    );
  }
  const parsedNote = {
    ...eitherNote.right,
    id: eitherNote.right._id,
    createdAt: eitherNote.right._creationTime,
  };
  const validatedNote = NoteSchema.safeParse(parsedNote);

  if (!validatedNote.success) {
    return (
      <ErrorDialog
        message={`
        Failed to parse note with id: ${props.slug}
        `}
        description="Failed to parse note."
      />
    );
  }

  return <NoteEditorView note={validatedNote.data} />;
}

export default NoteServerLayer;
