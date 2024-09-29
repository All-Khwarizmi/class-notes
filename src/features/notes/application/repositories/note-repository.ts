import { convexDatabase } from '@/core/data/convex/convex-impl';
import { getAppDataBase } from '@/core/data/get-app-db';
import IDatabase from '@/core/data/idatabase';

import { Note } from '../../domain/notes-schemas';

export default class NoteRepository {
  private readonly _db: IDatabase;

  constructor(db: IDatabase) {
    this._db = db;
  }

  async createNote({
    note,
  }: {
    note: Pick<
      Note,
      | 'name'
      | 'description'
      | 'content'
      | 'fullPath'
      | 'pathDictionary'
      | 'folders'
      | 'createdBy'
      | 'keywords'
      | 'type'
      | 'parentId'
      | 'contentType'
    >;
  }) {
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
      | 'id'
      | 'name'
      | 'description'
      | 'content'
      | 'fullPath'
      | 'pathDictionary'
      | 'folders'
      | 'createdBy'
      | 'keywords'
    >;
  }) {
    return this._db.updateNote({
      note,
    });
  }

  async deleteNote({ id }: { id: string }) {
    return this._db.deleteNote({
      id,
    });
  }
}

export const noteRepository = new NoteRepository(getAppDataBase());
