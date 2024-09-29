import ErrorDialog from '@/core/components/common/ErrorDialog';
import Layout from '@/core/components/layout/ExperimentalLayout';
import { notesUsecases } from '@/features/notes/application/usecases/note-usecases';
import { NoteSchema } from '@/features/notes/domain/notes-schemas';
import NoteEditorView from '@/features/notes/presentation/views/NoteEditorView';
import { isLeft } from 'fp-ts/lib/Either';
import React from 'react';

async function NoteServerLayer({ slug }: { slug: string }) {
  if (!slug) {
    return <Layout.NotFound />;
  }

  const eitherNote = await notesUsecases.getNote({ id: slug });

  if (isLeft(eitherNote)) {
    return (
      <ErrorDialog
        message={`Échec de la récupération de la note avec l'ID : ${slug}`}
        code={eitherNote.left.code}
        description={eitherNote.left.message}
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
        message={`Échec de l'analyse de la note avec l'ID : ${slug}`}
        description="La structure de la note est invalide."
      />
    );
  }

  return <NoteEditorView note={validatedNote.data} />;
}

export default NoteServerLayer;
