import { Either } from "fp-ts/lib/Either";
import { DocumentData } from "./database-types";
import Failure from "../failures/failures";
import { UserType } from "@/features/user/domain/entities/user-schema";
import {
  Category,
  Competence,
} from "@/features/comp-cat/domain/entities/schemas";
import { Cours } from "@/features/cours/domain/entities/cours-schemas";

export default abstract class IDatabase {
  abstract getUser({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, DocumentData>>;

  abstract saveUser({
    userId,
    user,
  }: {
    userId: string;
    user: UserType;
  }): Promise<Either<Failure<string>, void>>;

  abstract getCategories({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, DocumentData[]>>;

  abstract addCategory({
    userId,
    category,
  }: {
    userId: string;
    category: Omit<Category, "_id">;
  }): Promise<Either<Failure<string>, void>>;

  abstract getCompetences({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, DocumentData[]>>;

  abstract addCompetence({
    userId,
    category,
    competence,
  }: {
    userId: string;
    category: string;
    competence: Competence;
  }): Promise<Either<Failure<string>, void>>;

  abstract getAllCours({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, DocumentData[]>>;

  abstract getSingleCours({
    userId,
    coursId,
  }: {
    userId: string;
    coursId: string;
  }): Promise<Either<Failure<string>, DocumentData>>;

  abstract addCours({
    userId,
    cours,
  }: {
    userId: string;
    cours: Omit<Cours, "_id" | "createdAt">;
  }): Promise<Either<Failure<string>, string>>;

  abstract updateCours({
    userId,
    cours,
  }: {
    userId: string;
    cours: Partial<Omit<Cours, "_id" | "createdAt">>;
  }): Promise<Either<Failure<string>, void>>;

  abstract updateCoursBody({
    userId,
    coursId,
    body,
  }: {
    userId: string;
    coursId: string;
    body: string;
  }): Promise<Either<Failure<string>, void>>;
}
