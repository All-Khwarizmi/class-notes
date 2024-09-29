import Failure from '@/core/failures/failures';
import { Either, isLeft, left, right } from 'fp-ts/lib/Either';

import { Note, NoteSchema } from '../../domain/notes-schemas';
import NoteRepository, {
  noteRepository,
} from '../repositories/note-repository';

export default class NotesUsecases {
  private readonly _repository: NoteRepository;

  constructor(repository: NoteRepository) {
    this._repository = repository;
  }

  async getNotes({
    parentId,
  }: {
    parentId: string;
  }): Promise<Either<Failure<string>, Note[]>> {
    const eitherNotes = await this._repository.getNotes({ parentId });
    if (isLeft(eitherNotes)) {
      console.log('eitherNotes', eitherNotes);
      return eitherNotes;
    }
    const validatedNotes: Note[] = [];
    for (const note of eitherNotes.right) {
      const parsedNote = {
        ...note,
        id: note._id,
        createdAt: note._creationTime,
      };
      const validatesNotes = NoteSchema.safeParse(parsedNote);
      if (!validatesNotes.success) {
        return left(
          Failure.invalidValue({
            invalidValue: parsedNote,
            message: 'Invalid notes',
            code: 'APP203',
          })
        );
      }
      validatedNotes.push(validatesNotes.data);
    }

    return right(validatedNotes);
  }

  async getNote({ id }: { id: string }) {
    return this._repository.getNote({ id });
  }

  async createNote({ note }: { note: Omit<Note, 'id'> }) {
    return this._repository.createNote({
      note,
    });
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
      | 'type'
      | 'contentType'
    >;
  }) {
    return this._repository.updateNote({
      note,
    });
  }

  async deleteNote({
    id,
  }: {
    id: string;
  }): Promise<Either<Failure<string>, void>> {
    return this._repository.deleteNote({
      id,
    });
  }
}

export const notesUsecases = new NotesUsecases(noteRepository);
