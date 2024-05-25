import { Cours } from "../../domain/entities/cours-schemas";
import CoursRepository, {
  coursRepository,
} from "../repositories/cours-repository";

export default class CoursUsecases {
  private readonly _repository: CoursRepository;

  constructor({ repository }: { repository: CoursRepository }) {
    this._repository = repository;
  }

  async getAllCours({ userId }: { userId: string }) {
    return this._repository.getAllCours({ userId });
  }

  async getSingleCours({
    userId,
    coursId,
  }: {
    userId: string;
    coursId: string;
  }) {
    return this._repository.getSingleCours({ userId, coursId });
  }

  async addCours({
    userId,
    cours,
  }: {
    userId: string;
    cours: Omit<Cours, "_id" | "createdAt">;
  }) {
    return this._repository.addCours({ userId, cours });
  }
}

export const coursUsecases = new CoursUsecases({ repository: coursRepository });
