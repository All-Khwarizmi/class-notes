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
    coursComplement,
  }: {
    userId: string;
    coursComplement: Omit<Complement, "_id" | "createdAt">;
  }) {
    return this._repository.addCoursComplement({ userId, coursComplement });
  }

  async getAllCoursComplement({ coursId }: { coursId: string }) {
    return this._repository.getAllCoursComplement({ coursId });
  }

  async getCoursComplement({ id }: { id: string }) {
    return this._repository.getCoursComplement({ id });
  }

  async updateCoursComplement({
    coursComplement,
  }: {
    coursComplement: Complement;
  }) {
    return this._repository.updateCoursComplement({ coursComplement });
  }
}

export const complementUsecases = new ComplementUsecases({
  repository: complementRepository,
});
