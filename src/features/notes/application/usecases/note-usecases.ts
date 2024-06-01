import { Note } from "../../domain/notes-schemas";
import NoteRepository, {
  noteRepository,
} from "../repositories/note-repository";

export default class NotesUsecases {
  private readonly _repository: NoteRepository;

  constructor(repository: NoteRepository) {
    this._repository = repository;
  }

  async getNotes({ parentId }: { parentId: string }) {
    return this._repository.getNotes({ parentId });
  }

  async getNote({ id }: { id: string }) {
    return this._repository.getNote({ id });
  }

  async createNote({ note }: { note: Omit<Note, "id"> }) {
    return this._repository.createNote({
      note,
    });
  }

  async updateNote({
    note,
  }: {
    note: Pick<
      Note,
      | "id"
      | "name"
      | "description"
      | "content"
      | "fullPath"
      | "pathDictionary"
      | "folders"
      | "createdBy"
      | "keywords"
    >;
  }) {
    return this._repository.updateNote({
      note,
    });
  }
}

export const notesUsecases = new NotesUsecases(noteRepository);
