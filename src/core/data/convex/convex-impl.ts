import IDatabase from "../idatabase";
import Failure from "@/core/failures/failures";
import { Either, left, right } from "fp-ts/lib/Either";
import { DocumentData } from "../database-types";
import { api } from "../../../../convex/_generated/api";
import { fetchQuery, fetchMutation } from "convex/nextjs";
import { UserType } from "@/features/user/domain/entities/user-schema";
import { Category } from "@/features/comp-cat/domain/entities/schemas";

export interface ConvexDatabaseOptions {
  db: typeof api;
}
export default class ConvexDatabase extends IDatabase {
  private readonly _db: typeof api;

  constructor(options: ConvexDatabaseOptions) {
    super();
    this._db = options.db;
  }

  async getUser({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, DocumentData>> {
    const doc = await fetchQuery(this._db.users.getUserQuery, {
      userId,
    });
    if (!doc) {
      return left(
        Failure.invalidValue({
          invalidValue: userId,
          message: `
          User not found with id: ${userId}`,
        })
      );
    }
    return right(doc);
  }
  async saveUser({
    userId,
    user,
  }: {
    userId: string;
    user: UserType;
  }): Promise<Either<Failure<string>, void>> {
    try {
      console.log({
        userId,
        user,
      });
      const result = await fetchMutation(this._db.users.saveUserMutation, {
        userId,
        name: user.name,
        schoolSubject: user.schoolSubject,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: user,
            message: "Error saving user",
          })
        );
      }
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: user,
          message: "Error saving user",
        })
      );
    }
  }

  async addCategory({
    userId,
    category,
  }: {
    userId: string;
    category: Omit<Category, "id">;
  }): Promise<Either<Failure<string>, void>> {
    try {
      const result = await fetchMutation(this._db.category.createCategory, {
        userId,
        name: category.name,
        description: category.description,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: category,
            message: "Error adding category",
          })
        );
      }
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: category,
          message: "Error adding category",
        })
      );
    }
  }

  async getCategories({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, DocumentData[]>> {
    const docs = await fetchQuery(this._db.category.getCategories, {
      userId,
    });
    if (!docs) {
      return left(
        Failure.invalidValue({
          invalidValue: userId,
          message: `
          Categories not found with userId: ${userId}`,
        })
      );
    }
    return right(docs);
  }
}

export const convexDatabase = new ConvexDatabase({ db: api });
