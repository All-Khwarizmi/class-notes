import Failure from '@/core/failures/failures';
import { UpdateVisibilityOptions } from '@/features/visibility/domain/types';
import { Either, isLeft, left, right } from 'fp-ts/lib/Either';

import ClassEntity from '../../domain/class-entity';
import { ClassType } from '../../domain/class-schema';
import { CreateClasseOptions } from '../../domain/classe-types';
import {
  VisibilitySchema,
  VisibilityType,
} from '../../domain/visibility-schema';
import ClasseRepository, {
  classeRepository,
} from '../repository/classe-repository-refactor';

export default class ClasseUseCases {
  private readonly _repository: ClasseRepository;

  constructor(repository: ClasseRepository) {
    this._repository = repository;
  }

  async createClasse(options: CreateClasseOptions) {
    return await this._repository.createClasse(options);
  }

  async deleteClasse({ id }: { id: string }) {
    const batchOperations = [
      this._repository.deleteClasseSequencesFromClasseId({ classeId: id }),
      this._repository.deleteEvualuationsWithGradesFromClasseId({
        classeId: id,
      }),
      this._repository.deleteStudentsFromClasseId({ classeId: id }),
      this._repository.deleteClasse({ id }),
    ];
    const operationsResults = await Promise.allSettled(batchOperations);
    const failures = operationsResults.filter(
      (result) => result.status === 'rejected'
    );
    if (failures.length > 0) {
      return left(
        Failure.invalidValue({
          message: 'Could not delete classe',
          code: 'APP204',
          invalidValue: failures,
        })
      );
    }
    return right(undefined);
  }

  async getClasse({ id }: { id: string }) {
    return await this._repository.getClasse({ id });
  }

  async getClasses({
    id,
  }: {
    id: string;
  }): Promise<Either<Failure<string>, ClassType[]>> {
    const eitherClasses = await this._repository.getClasses({ id });
    if (isLeft(eitherClasses)) {
      return eitherClasses;
    }
    const parsedClasses = eitherClasses.right.map((c) => {
      return {
        id: c._id,
        name: c.name,
        description: c.description,
        imageUrl: c.imageUrl,
        students: c.students,
        publish: c.publish,
        educationLevel: c.educationLevel,
        educationSystem: c.educationSystem,
      };
    });

    const validClasses: ClassType[] = [];

    for (const c of parsedClasses) {
      const classEntity = ClassEntity.create(c);
      if (classEntity.isValid()) {
        validClasses.push(classEntity.getOrCrash());
      } else {
        if (isLeft(classEntity.values)) {
          return classEntity.values;
        } else {
          return left(
            Failure.invalidValue({
              invalidValue: c,
              message: 'Invalid value',
              code: 'DOM201',
            })
          );
        }
      }
    }

    return right(validClasses);
  }

  // async updateClasseVisibility({
  //   id,
  //   visibility,
  // }: {
  //   id: string;
  //   visibility: boolean;
  // }) {
  //   return this._repository.updateClasseVisibility({ id, visibility });
  // }

  async getVisibility({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, VisibilityType>> {
    const eitherVibilityTable = await this._repository.getVisibility({
      userId,
    });
    if (isLeft(eitherVibilityTable)) {
      return eitherVibilityTable;
    }

    const visibility = VisibilitySchema.safeParse(eitherVibilityTable.right);

    if (visibility.success) {
      return right(visibility.data);
    } else {
      return left(
        Failure.invalidValue({
          invalidValue: eitherVibilityTable.right,
          message: 'Invalid value',
          code: 'DOM201',
        })
      );
    }
  }

  async updateVisibility(options: UpdateVisibilityOptions) {
    return this._repository.updateVisibility(options);
  }
}

export const classeUsecases = new ClasseUseCases(classeRepository);
