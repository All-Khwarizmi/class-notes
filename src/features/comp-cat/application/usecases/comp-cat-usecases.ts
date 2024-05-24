import { Either, isLeft, left, right } from "fp-ts/lib/Either";
import { Category, categorySchema } from "../../domain/entities/schemas";
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
}
