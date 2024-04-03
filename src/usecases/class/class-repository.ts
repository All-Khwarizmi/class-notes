import Failure from "@/core/failures/failures";
import { Either } from "fp-ts/lib/Either";
import { ClassType } from "@/domain/classe/class-schema";
import ClassEntity from "@/domain/classe/class-entity";
import { Id } from "../../../convex/_generated/dataModel";

//! TODO: create a mapper
export type IdCustom = Id<"Classes">;

export default abstract class ClassRepository {
  abstract useCreateClass(props: ClassType): Promise<Either<Failure, IdCustom>>;
  abstract updateClass(props: ClassType): Promise<Either<Failure, ClassType>>;
  abstract deleteClass(props: ClassType): Promise<Either<Failure, ClassType>>;
  abstract getClass(classId: string): Promise<Either<Failure, ClassType>>;
  abstract useGetClasses(): Either<Failure, ClassEntity[]>;
}
