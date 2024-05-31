import { CoursComplement } from "../../domain/cours-complement-schemas";
import CoursComplementRepository from "../repositories/cours-complement-repository";

export default class CoursComplementUsecases {
  private readonly _repository: CoursComplementRepository;

  constructor({ repository }: { repository: CoursComplementRepository }) {
    this._repository = repository;
  }

    async addCoursComplement({
        userId,
        coursComplement,
    }: {
        userId: string;
        coursComplement: Omit<CoursComplement, "_id" | "createdAt">;
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
        coursComplement: CoursComplement;
    }) {
        return this._repository.updateCoursComplement({ coursComplement });
    }
}
