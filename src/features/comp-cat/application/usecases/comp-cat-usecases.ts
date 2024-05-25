import { Either, isLeft, left, right } from "fp-ts/lib/Either";
import {
  Category,
  Competence,
  categorySchema,
  competenceSchema,
} from "../../domain/entities/schemas";
import CompCatRepository, {
  compCatRepository,
} from "../repositories/comp-cat-repository";
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
    category: Omit<Category, "_id">;
  }) {
    return this._repository.addCategory({ userId, category });
  }

  async getCompetences({ userId }: { userId: string }) {
    const eitherCompetences = await this._repository.getCompetences({
      userId,
    });

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
    category,
    competence,
  }: {
    userId: string;
    category: string;
    competence: any;
  }) {
    return this._repository.addCompetence({ userId, category, competence });
  }

  async getCategoriesAndCompetences({
    userId,
  }: {
    userId: string;
  }): Promise<
    Either<
      Failure<string>,
      { categories: Category[]; competences: Competence[] }
    >
  > {
    const batch = await Promise.allSettled([
      this.getCategories({ userId }),
      this.getCompetences({ userId }),
    ]);

    const failures = batch.some((result) => {
      if (result.status === "rejected") {
        return true;
      }
      if (isLeft(result.value)) {
        return true;
      }
    });

    if (failures) {
      return left(
        Failure.invalidValue({
          invalidValue: userId,
          message: "Error getting categories and competences: error in batch",
        })
      );
    }

    const categories: Category[] = [];
    const competences: Competence[] = [];

    if (batch[0].status === "rejected") {
      return left(
        Failure.invalidValue({
          invalidValue: userId,
          message: "Error getting categories",
        })
      );
    }
    if (isLeft(batch[0].value)) {
      return left(batch[0].value.left);
    }
    if (batch[1].status === "rejected") {
      return left(
        Failure.invalidValue({
          invalidValue: userId,
          message: "Error getting competences",
        })
      );
    }
    if (isLeft(batch[1].value)) {
      return left(batch[1].value.left);
    }

    for (const category of batch[0].value.right) {
      const categoryValidation = categorySchema.safeParse(category);
      if (categoryValidation.success) {
        categories.push(categoryValidation.data);
      }
    }

    for (const competence of batch[1].value.right) {
      const competenceValidation = competenceSchema.safeParse(competence);
      if (competenceValidation.success) {
        competences.push(competenceValidation.data);
      }
    }

    return right({ categories, competences });
  }
}

export const compCatUsecases = new CompCatUsecases({
  repository: compCatRepository,
});
