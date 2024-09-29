'use server';

import { notesUsecases } from '../../usecases/note-usecases';

export default async function deleteNote(options: { noteId: string }) {
  return notesUsecases.deleteNote({
    id: options.noteId,
  });
}
