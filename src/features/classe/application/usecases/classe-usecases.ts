import ClasseRepository, {
  classeRepository,
} from "../repository/classe-repository-refactor";

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

  async getClasses({ id }: { id: string }) {
    return await this._repository.getClasses({ id });
  }
}

export const classeUsecases = new ClasseUseCases(classeRepository);
