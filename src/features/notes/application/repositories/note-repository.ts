import IDatabase from "@/core/data/idatabase";
import { Note } from "../../domain/notes-schemas";
import { convexDatabase } from "@/core/data/convex/convex-impl";

export default class NoteRepository {
  private readonly _db: IDatabase;

  constructor(db: IDatabase) {
    this._db = db;
  }

  async createNote({ note }: { note: Omit<Note, "id"> }) {
    return this._db.createNote({
      note,
    });
  }

  async getNotes({ parentId }: { parentId: string }) {
    return this._db.getNotes({ parentId });
  }

  async getNote({ id }: { id: string }) {
    return this._db.getNote({ id });
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
    return this._db.updateNote({
      note,
    });
  }
}

export const noteRepository = new NoteRepository(convexDatabase);