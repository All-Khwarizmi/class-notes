import { Complement } from "../../domain/complement-schemas";
import ComplementRepository, {
  complementRepository,
} from "../repositories/complement-repository";

export default class ComplementUsecases {
  private readonly _repository: ComplementRepository;

  constructor({ repository }: { repository: ComplementRepository }) {
    this._repository = repository;
  }

  async addCoursComplement({
    userId,
    complement,
  }: {
    userId: string;
    complement: Pick<
      Complement,
      "name" | "description" | "type" | "publish" | "coursId" | "body"
    >;
  }) {
    return this._repository.addComplement({
      userId,
      complement,
    });
  }

  async getAllCoursComplement({ coursId }: { coursId: string }) {
    return this._repository.getAllComplement({ coursId });
  }

  async getCoursComplement({ id }: { id: string }) {
    return this._repository.getComplement({ id });
  }

  async updateCoursComplement({
    coursComplement,
  }: {
    coursComplement: Complement;
  }) {
    return this._repository.updateComplement({ coursComplement });
  }
}

export const complementUsecases = new ComplementUsecases({
  repository: complementRepository,
});
