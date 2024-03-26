import Failure from "@/core/failures/failures";
import { Either } from "fp-ts/lib/Either";
import { ClassType } from "@/domain/class/class-schema";
import ClassEntity from "@/domain/class/class-entity";

export default abstract class ClassRepository {
  abstract useCreateClass(
    props: ClassType
  ): Promise<Either<Failure, ClassType>>;
  abstract updateClass(props: ClassType): Promise<Either<Failure, ClassType>>;
  abstract deleteClass(props: ClassType): Promise<Either<Failure, ClassType>>;
  abstract getClass(classId: string): Promise<Either<Failure, ClassType>>;
  abstract useGetClasses(): Either<Failure, ClassEntity[]>;
}
