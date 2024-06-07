import { Either, isLeft, left, right } from "fp-ts/lib/Either";
import ClasseRepository, {
  classeRepository,
} from "../repository/classe-repository-refactor";
import { ClassType } from "../../domain/class-schema";
import ClassEntity from "../../domain/class-entity";
import Failure from "@/core/failures/failures";

export default class ClasseUseCases {
  private readonly _repository: ClasseRepository;

  constructor(repository: ClasseRepository) {
    this._repository = repository;
  }

  async createClasse({
    userId,
    name,
    description,
    imageUrl,
  }: {
    userId: string;
    name: string;
    description: string;
    imageUrl: string;
  }) {
    return await this._repository.createClasse({
      userId,
      name,
      description,
      imageUrl,
    });
  }

  async deleteClasse({ id }: { id: string }) {
    return await this._repository.deleteClasse({ id });
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
              message: "Invalid value",
              code: "DOM201",
            })
          );
        }
      }
    }

    return right(validClasses);
  }

  async updateClasseVisibility({
    id,
    visibility,
  }: {
    id: string;
    visibility: boolean;
  }) {
    return this._repository.updateClasseVisibility({ id, visibility });
  }
}

export const classeUsecases = new ClasseUseCases(classeRepository);
