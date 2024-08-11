"use server";

import { Note } from "@/features/notes/domain/notes-schemas";
import { notesUsecases } from "../../usecases/note-usecases";

export default async function saveNote(options: { note: Note }) {
  return notesUsecases.updateNote(options);
}
