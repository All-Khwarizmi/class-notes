import { Either, isLeft, left, right } from "fp-ts/lib/Either";
import { Category, Competence, categorySchema, competenceSchema } from "../../domain/entities/schemas";
import CompCatRepository from "../repositories/comp-cat-repository";
import Failure from "@/core/failures/failures";

export default class CompCatUsecases {
  private readonly _repository: CompCatRepository;
  constructor(options: { repository: CompCatRepository }) {
    this._repository = options.repository;
  }

  async getCategories({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, Category[]>> {
    const eitherCategories = await this._repository.getCategories({ userId });

    if (isLeft(eitherCategories)) {
      return eitherCategories;
    }

    const categories: Category[] = [];
    const errorMessages: string[] = [];
    for (const category of eitherCategories.right) {
      const categoryValidation = categorySchema.safeParse(category);
      if (categoryValidation.success) {
        categories.push(categoryValidation.data);
      } else {
        errorMessages.push(categoryValidation.error.message);
      }
    }

    if (errorMessages.length > 0) {
      return left(
        Failure.invalidValue({
          invalidValue: errorMessages.join("\n"),
          message: "Invalid category",
        })
      );
    }

    return right(categories);
  }

  async addCategory({
    userId,
    category,
  }: {
    userId: string;
    category: Category;
  }) {
    return this._repository.addCategory({ userId, category });
  }

  async getCompetences({
    userId,
    categoryId,
  }: {
    userId: string;
    categoryId: string;
  }) {
    const eitherCompetences = await this._repository.getCompetences({ userId, categoryId });

    if (isLeft(eitherCompetences)) {
      return eitherCompetences;
    }
    const competences: Competence[] = [];   
    const errorMessages: string[] = [];
    for (const competence of eitherCompetences.right) {
      const competenceValidation = competenceSchema.safeParse(competence);
      if (competenceValidation.success) {
        competences.push(competenceValidation.data);
      } else {
        errorMessages.push(competenceValidation.error.message);
      }
    }

    if (errorMessages.length > 0) {
      return left(
        Failure.invalidValue({
          invalidValue: errorMessages.join("\n"),
          message: "Invalid competence",
        })
      );
    }

    return right(competences);
  }

  async addCompetence({
    userId,
    categoryId,
    competence,
  }: {
    userId: string;
    categoryId: string;
    competence: any;
  }) {
    return this._repository.addCompetence({ userId, categoryId, competence });
  }
}
