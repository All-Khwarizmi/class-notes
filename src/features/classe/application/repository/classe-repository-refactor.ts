import { getAppDataBase } from '@/core/data/get-app-db';
import IDatabase from '@/core/data/idatabase';
import VisibilityRepository, {
  visibilityRepository,
} from '@/features/visibility/application/repositories/visibility-repository';
import {
  GetVisibilityOptions,
  UpdateVisibilityOptions,
} from '@/features/visibility/domain/types';
import { isLeft } from 'fp-ts/lib/Either';

import {
  CreateClasseOptions,
  DeleteClasseOptions,
} from '../../domain/classe-types';

export default class ClasseRepository {
  private readonly _db: IDatabase;
  private readonly _visibilityRepository: VisibilityRepository;

  constructor(
    db: IDatabase,

    { visibilityRepository }: { visibilityRepository: VisibilityRepository }
  ) {
    this._db = db;
    this._visibilityRepository = visibilityRepository;
  }

  async createClasse(options: CreateClasseOptions) {
    const operationResult = await this._db.createClass(options);
    if (isLeft(operationResult)) {
      return operationResult;
    }
    const id = operationResult.right;

    await this._visibilityRepository.addClasseToVisibility({
      userId: options.userId,
      entity: {
        id,
        name: options.name,
        description: options.description ?? '',
        publish: false,
      },
    });

    return operationResult;
  }

  async deleteClasse({ id }: { id: string }) {
    return await this._db.deleteClass({ id });
  }

  async getClasse({ id }: { id: string }) {
    return await this._db.getClass({ id });
  }

  async getClasses({ id }: { id: string }) {
    return await this._db.getClasses({ id });
  }

  // async updateClasseVisibility({
  //   id,
  //   visibility,
  // }: {
  //   id: string;
  //   visibility: boolean;
  // }) {
  //   return this._db.updateClassVisibility({ id, visibility });
  // }

  async getVisibility({ userId }: GetVisibilityOptions) {
    return this._db.getVisibility({ id: userId });
  }

  async updateVisibility(options: UpdateVisibilityOptions) {
    return this._db.updateVisibility(options);
  }

  async deleteClasseSequencesFromClasseId(options: DeleteClasseOptions) {
    return this._db.deleteClassesSequenceFromClasse(options);
  }

  async deleteEvualuationsWithGradesFromClasseId(options: DeleteClasseOptions) {
    return this._db.deleteEvaluationsWithGradesFromClasse(options);
  }

  async deleteStudentsFromClasseId(options: DeleteClasseOptions) {
    return this._db.deleteStudentsFromClasseId(options);
  }
}

export const classeRepository = new ClasseRepository(getAppDataBase(), {
  visibilityRepository,
});
