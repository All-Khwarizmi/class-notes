import Failure from "@/core/failures/failures";
import ClassRepository, { IdCustom } from "@/usecases/class/class-repository";
import { Either, right } from "fp-ts/lib/Either";
import { api } from "../../../convex/_generated/api";
import { useMutation,  } from "convex/react";
import ClassEntity from "@/domain/class/class-entity";
import { Id } from "../../../convex/_generated/dataModel";
import { left } from "fp-ts/lib/Either";
import { ClassType } from "@/domain/class/class-schema";

export default class ClassRepositoryImpl extends ClassRepository {
  async useCreateClass(props: ClassType): Promise<Either<Failure, IdCustom>> {
    try {
      const addClass = useMutation(api.classes.createClass);
      const id = await addClass(props);
      if (id) {
        let isCustomId = id as unknown;

        return right(isCustomId as IdCustom);
      }
      return left(
        Failure.invalidValue({
          invalidValue: id,
          message: "Error while creating class: invalid value",
        })
      );
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: error,
          message: "Error while creating class",
        })
      );
    }
  }
  updateClass(props: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  deleteClass(props: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getClass(classId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  useGetClasses(): Either<Failure, ClassEntity[]> {
    throw new Error("Method not implemented.");
  }
}

export class ClassEntityDto {
  static toDomain(props: ClassInfra): Either<Failure, ClassEntity> {
    if (!props) {
      return left(
        Failure.invalidValue({
          invalidValue: props,
          message: "No class found",
        })
      );
    }
    const classEntity = ClassEntity.create({
      id: props._id,
      name: props.name,
      description: props.description,
      imageUrl: props.imageUrl,
    });
    if (classEntity.values._tag === "Left") {
      return left(
        Failure.invalidValue({
          invalidValue: classEntity.values.left,
          message: "Invalid value",
        })
      );
    }
    return right(classEntity);
  }
}

type ClassInfra =
  | {
      _id: Id<"Classes">;
      _creationTime: number;
      description?: string | undefined;
      imageUrl?: string | undefined;
      students?: any[] | undefined;
      name: string;
      userId: string;
    }
  | undefined;
